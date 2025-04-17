import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizGame from './QuizGame.tsx';
import { quizCategories } from './quizData';

const QuizZone: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartQuiz = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setGameStarted(true);
  };

  if (gameStarted && selectedCategory) {
    return <QuizGame categoryId={selectedCategory} onExit={() => setGameStarted(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pb-[80px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/global-issues')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Zone</h1>
            <p className="text-gray-600 mt-2">Select a category to start your quiz journey</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium">0 Stars</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-yellow-600">🪙</span>
              <span className="font-medium">0 Coins</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleStartQuiz(category.id)}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.totalQuestions} questions</span>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizZone; 