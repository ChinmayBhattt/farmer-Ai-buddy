import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Your crops',
      icon: HomeIcon,
      path: '/',
    },
    {
      name: 'Community',
      icon: ChatBubbleLeftRightIcon,
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                isActive ? 'text-plantix-primary' : 'text-gray-600'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 