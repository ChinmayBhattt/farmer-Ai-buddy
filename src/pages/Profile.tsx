import React from 'react';

const Profile = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Account Section */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Your account</h2>
            <p className="text-gray-600">Join Plantix Community</p>
          </div>
        </div>
        <button className="w-full mt-4 border-2 border-teal-600 text-teal-600 rounded-lg py-2 font-medium">
          Sign in
        </button>
      </div>

      {/* Share Section */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">🌱</span>
          </div>
          <div>
            <h2 className="font-semibold">Grow smart together!</h2>
            <p className="text-gray-600">Share Plantix and help farmers solve their plant problems.</p>
          </div>
        </div>
        <button className="text-teal-600 font-medium mt-2 text-right w-full">
          Share Plantix
        </button>
      </div>

      {/* Feedback Section */}
      <div className="bg-white p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <div>
            <h2 className="font-semibold">How is your experience with Plantix app?</h2>
            <p className="text-gray-600">We'd love to hear your thoughts and suggestions.</p>
          </div>
        </div>
        <button className="text-teal-600 font-medium mt-2 text-right w-full">
          Give Feedback
        </button>
      </div>

      {/* Stories Section */}
      <div className="bg-white p-4">
        <h2 className="font-semibold mb-4">Stories picked up for you</h2>
        <div className="flex items-center justify-center py-8">
          <button className="text-blue-600">Try again</button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 