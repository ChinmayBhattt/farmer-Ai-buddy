import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProblemsQuiz: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Environmental Quiz</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Quiz Info Section */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Test Your Knowledge</h3>
            <p className="text-gray-600 mb-6">
              Challenge yourself with environmental quizzes and earn rewards! Learn about climate change, biodiversity, and more.
            </p>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                <span className="text-2xl">⭐</span>
                <div>
                  <span className="font-medium">0</span>
                  <span className="text-sm text-gray-600 ml-1">Stars</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                <span className="text-2xl">🪙</span>
                <div>
                  <span className="font-medium">0</span>
                  <span className="text-sm text-gray-600 ml-1">Coins</span>
                </div>
              </div>
            </div>
            <Link
              to="/quiz-zone"
              className="w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              Start Quiz
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          
          {/* Categories Preview */}
          <div className="flex-1 bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Quiz Categories:</h4>
            <div className="space-y-3">
              {[
                'Climate & Atmosphere',
                'Oceans & Marine Life',
                'Forest & Agriculture',
                'Wildlife & Biodiversity',
                'Pollution & Waste'
              ].map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-3 text-gray-600 bg-white p-3 rounded-lg"
                >
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsQuiz; 