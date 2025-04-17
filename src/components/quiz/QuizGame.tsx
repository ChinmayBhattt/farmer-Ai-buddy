import React, { useState, useEffect } from 'react';
import { Question, sampleQuestions, quizCategories } from './quizData';

interface Props {
  categoryId: string;
  onExit: () => void;
}

interface GameState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: number | null;
  isAnswered: boolean;
  timeLeft: number;
}

const COINS_PER_CORRECT = 10;
const TOTAL_TIME_PER_QUESTION = 20;

const QuizGame: React.FC<Props> = ({ categoryId, onExit }) => {
  const category = quizCategories.find(c => c.id === categoryId);
  
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswered: false,
    timeLeft: TOTAL_TIME_PER_QUESTION,
  });

  // For now, using sample questions. In a real app, you'd fetch questions based on categoryId
  const [questions] = useState<Question[]>(sampleQuestions);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!showSummary && gameState.timeLeft > 0 && !gameState.isAnswered) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.timeLeft, gameState.isAnswered, showSummary]);

  useEffect(() => {
    if (gameState.timeLeft === 0 && !gameState.isAnswered) {
      handleAnswer(-1);
    }
  }, [gameState.timeLeft]);

  const currentQuestion = questions[gameState.currentQuestionIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (gameState.isAnswered) return;

    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      selectedAnswer: selectedIndex,
      isAnswered: true,
    }));

    if (gameState.currentQuestionIndex === questions.length - 1) {
      setTimeout(() => setShowSummary(true), 1500);
    } else {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          selectedAnswer: null,
          isAnswered: false,
          timeLeft: TOTAL_TIME_PER_QUESTION,
        }));
      }, 1500);
    }
  };

  const getStars = (score: number): number => {
    if (score === questions.length) return 3;
    if (score >= questions.length * 0.7) return 2;
    if (score >= questions.length * 0.4) return 1;
    return 0;
  };

  // Add a back button at the top
  const renderBackButton = () => (
    <button
      onClick={onExit}
      className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900"
    >
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Exit Quiz
    </button>
  );

  if (showSummary) {
    const stars = getStars(gameState.score);
    const coins = gameState.score * COINS_PER_CORRECT;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pb-[80px]">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-6">Quiz Complete!</h2>
          
          <div className="text-5xl mb-6">
            {'⭐'.repeat(stars)}
          </div>
          
          <div className="text-xl mb-4">
            You scored <span className="font-bold text-green-600">{gameState.score}</span> out of {questions.length}
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <div className="text-lg font-medium text-yellow-800">
              Rewards Earned:
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪙</span>
                <span className="font-bold">{coins}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="font-bold">{stars}</span>
              </div>
            </div>
          </div>
          
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={onExit}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pb-[80px] relative">
      {renderBackButton()}
      <div className="max-w-3xl mx-auto pt-12">
        {/* Category Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{category?.title || 'Quiz'}</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {gameState.currentQuestionIndex + 1}/{questions.length}</span>
            <span>{gameState.timeLeft}s</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-1000"
              style={{
                width: `${(gameState.currentQuestionIndex / questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={gameState.isAnswered}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    gameState.isAnswered
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : index === gameState.selectedAnswer
                        ? 'bg-red-100 border-red-500'
                        : 'bg-gray-50 border-gray-200'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  } border`}
                >
                  {option}
                </button>
              ))}
            </div>

            {gameState.isAnswered && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-medium">Explanation: </span>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame; 