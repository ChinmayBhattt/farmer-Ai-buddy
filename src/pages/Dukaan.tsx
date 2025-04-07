import type { FC } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

const Dukaan: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 text-center">
      <div className="max-w-sm">
        <div className="mb-6">
          <MapPinIcon className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">We need your location</h1>
          <p className="text-gray-600">
            To see trusted agrishops in your area, please share your location with us.
          </p>
        </div>
        
        <button className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium">
          Allow location
        </button>
      </div>
    </div>
  );
};

export default Dukaan; 