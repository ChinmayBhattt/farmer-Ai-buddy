import React from 'react';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

const Community = () => {
  const cropFilters = [
    { name: 'Cabbage', icon: '🥬' },
    { name: 'Bean', icon: '🫘' },
    { name: 'Apple', icon: '🍎' },
    { name: 'Banana', icon: '🍌' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Search Header */}
      <div className="p-4 bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Community"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 rounded-full bg-gray-100">
            <BellIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">Filter by</h2>
            <button className="text-blue-600 text-sm">Change</button>
          </div>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {cropFilters.map((filter) => (
              <button
                key={filter.name}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 whitespace-nowrap bg-white"
              >
                <span className="text-xl">{filter.icon}</span>
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-48 h-48 mb-4">
          <img
            src="/placeholder-farmer.png"
            alt="Community unavailable"
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-medium mb-2">Community is currently not available</h3>
        <p className="text-gray-600">Please retry later</p>
      </div>
    </div>
  );
};

export default Community; 