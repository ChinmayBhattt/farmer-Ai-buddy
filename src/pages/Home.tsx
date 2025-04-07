import type { FC } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Weekly Contest 445',
      time: 'Sunday 8:00 AM GMT+5:30',
      startsIn: '5d 8h 20m 20s',
      bgImage: 'url("/event-bg-1.svg")',
      bgGradient: 'linear-gradient(to right bottom, rgb(30, 64, 175), rgb(56, 189, 248))',
      icon: '📅'
    },
    {
      id: 2,
      title: 'Biweekly Contest 154',
      time: 'Saturday 8:00 PM GMT+5:30',
      startsIn: '4d 20h 20m 20s',
      bgImage: 'url("/event-bg-2.svg")',
      bgGradient: 'linear-gradient(to right bottom, rgb(6, 95, 70), rgb(4, 120, 87))',
      icon: '📅'
    }
  ]);

  const navigate = useNavigate();

  const crops = [
    { id: 1, name: 'Nuts', icon: '🥜', color: 'bg-purple-100' },
    { id: 2, name: 'Apple', icon: '🍎', color: 'bg-red-100' },
    { id: 3, name: 'Citrus', icon: '🍋', color: 'bg-yellow-100' },
    { id: 4, name: 'Banana', icon: '🍌', color: 'bg-yellow-50' },
  ];

  const tools = [
    { id: 1, name: 'Fertilizer calculator', icon: '🌱', path: '/calculator', color: 'bg-green-50' },
    { id: 2, name: 'Pests & diseases', icon: '🐛', path: '/pests', color: 'bg-red-50' },
    { id: 3, name: 'Cultivation Tips', icon: '🌿', path: '/tips', color: 'bg-blue-50' },
    { id: 4, name: 'Pests and Disease Alert', icon: '⚠️', path: '/alerts', color: 'bg-orange-50' },
  ];

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const navigationItems = [
    { icon: '🏠', label: 'Your crops', path: '/' },
    { icon: '👥', label: 'Community', path: '/community' },
    { icon: '📅', label: 'Events', path: '/events' },
    { icon: '👤', label: 'You', path: '/profile' }
  ];

  const handlePlusClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-50 pb-24">
      {/* Header with Animated Background */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-white shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          >
            FarmAI
          </motion.h1>
        </div>
        
        {/* Animated Crop Selection */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex space-x-4 overflow-x-auto mb-6 pb-2"
        >
          {crops.map((crop, index) => (
            <motion.div
              key={crop.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <button className={`w-16 h-16 rounded-full ${crop.color} flex items-center justify-center text-2xl shadow-sm hover:shadow-md transition-shadow duration-300`}>
                {crop.icon}
              </button>
            </motion.div>
          ))}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <button className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              +
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Events Panel */}
      <div className="p-6 bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-between items-center"
        >
          <h2 className="text-white text-xl font-semibold">Upcoming Events</h2>
          <Link 
            to="/events"
            className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
          >
            View all →
          </Link>
        </motion.div>
        <div className="flex space-x-4 overflow-x-auto pb-2 -mx-2 px-2">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/events')}
              className="flex-shrink-0 w-[320px] cursor-pointer"
            >
              <div 
                className="rounded-2xl h-[180px] relative overflow-hidden"
                style={{
                  background: event.bgGradient
                }}
              >
                <div className="absolute inset-0 opacity-20"
                     style={{
                       backgroundImage: event.bgImage,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center'
                     }}
                />
                <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg">
                  <span className="text-xl">{event.icon}</span>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <motion.div
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center"
                      >
                        <span className="mr-2">⏳</span>
                        <span>Starts in {event.startsIn}</span>
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-3">{event.title}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-white/90 font-medium">{event.time}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

      {/* Weather Card with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-4"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-medium text-lg"
              >
                Today, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-gray-600"
              >
                Clear • 24°C / 20°C
              </motion.p>
            </div>
            <motion.div 
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-4xl"
            >
              ☀️
            </motion.div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-xl py-3 font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <span className="mr-2">📍</span> Enable Location
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Heal your crop section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-4"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-bold text-xl mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          >
            Heal your crop
          </motion.h2>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              {['🌿', '📋', '💊'].map((icon, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shadow-sm"
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl py-4 font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            Take a picture
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Tools Grid with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${tool.color} p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-2xl">{tool.icon}</span>
                  <h3 className="font-medium mt-2">{tool.name}</h3>
                </div>
                <motion.span
                  whileHover={{ x: 5 }}
                  className="text-gray-400"
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-between items-center px-6 py-3"
      >
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col items-center w-16"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 ${
                window.location.pathname === item.path ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              {item.icon}
            </motion.div>
            <span className={`text-[10px] mt-1 ${
              window.location.pathname === item.path ? 'text-blue-400 font-medium' : 'text-gray-400'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default Home; 