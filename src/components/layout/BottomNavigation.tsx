import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  GlobeAltIcon,
  CalendarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      name: 'Discover',
      icon: GlobeAltIcon,
      path: '/community',
    },
    {
      name: 'Events',
      icon: CalendarIcon,
      path: '/events',
    },
    {
      name: 'You',
      icon: UserIcon,
      path: '/profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 ${
              isActive('/') ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center p-2 ${
                  isActive ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation; 