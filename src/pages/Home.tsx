import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const crops = [
    { id: 1, name: 'Nuts', icon: '🥜' },
    { id: 2, name: 'Apple', icon: '🍎' },
    { id: 3, name: 'Citrus', icon: '🍋' },
    { id: 4, name: 'Banana', icon: '🍌' },
  ];

  const tools = [
    { id: 1, name: 'Fertilizer calculator', icon: '🌱', path: '/calculator' },
    { id: 2, name: 'Pests & diseases', icon: '🐛', path: '/pests' },
    { id: 3, name: 'Cultivation Tips', icon: '🌿', path: '/tips' },
    { id: 4, name: 'Pests and Disease Alert', icon: '⚠️', path: '/alerts' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">FarmAI</h1>
        
        {/* Crop Selection */}
        <div className="flex space-x-4 overflow-x-auto mb-6 pb-2">
          {crops.map((crop) => (
            <div key={crop.id} className="flex-shrink-0">
              <button className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center text-2xl">
                {crop.icon}
              </button>
            </div>
          ))}
          <div className="flex-shrink-0">
            <button className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
              <PlusIcon className="h-8 w-8 text-white" />
            </button>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium">Today, 7 Apr</h2>
              <p className="text-gray-600">Clear • 24°C / 20°C</p>
            </div>
            <div className="text-3xl">☀️</div>
          </div>
          <button className="mt-2 w-full bg-amber-50 text-amber-800 rounded-lg p-2 text-sm flex items-center justify-center">
            <span className="mr-2">📍</span> Location permission required
          </button>
        </div>

        {/* Heal your crop section */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <h2 className="font-bold text-xl mb-4">Heal your crop</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center">
                <span className="text-xl">🌿</span>
              </div>
              <div className="text-gray-400">→</div>
              <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <div className="text-gray-400">→</div>
              <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center">
                <span className="text-xl">💊</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-500 text-white rounded-lg py-3 font-medium">
            Take a picture
          </button>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-2xl">{tool.icon}</span>
                  <h3 className="font-medium mt-2">{tool.name}</h3>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Precision Farming Card */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg">Start precision farming</h2>
              <p className="text-gray-600 text-sm">Add your field to unlock tailored insights</p>
            </div>
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              Add field
            </button>
          </div>
        </div>

        {/* Market Section */}
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Explore market</h2>
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
              Buy
            </button>
          </div>
          <p className="text-gray-600">Various products from different sellers</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 