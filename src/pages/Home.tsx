import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChatBot from '../components/ChatBot';
import GlobalProblems from '../components/GlobalProblems';
import GlobalIssuePodcast from '../components/GlobalIssuePodcast';
import ProblemsQuiz from '../components/quiz/ProblemsQuiz';

const navigationItems = [
  { icon: '🏠', label: 'Your crops', path: '/' },
  { icon: '🧭', label: 'Discover', path: '/community' },
  { icon: '📅', label: 'Events', path: '/events' },
  { icon: '👤', label: 'You', path: '/profile' }
];

const Home: React.FC = () => {
  const [events] = React.useState([
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

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleCloseChatBot = () => setShowChat(false);
    document.addEventListener('closeChatBot', handleCloseChatBot);
    return () => document.removeEventListener('closeChatBot', handleCloseChatBot);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Global Issues Section */}
      <GlobalProblems />

      {/* Events Panel */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <Link 
            to="/events"
            className="text-blue-500 text-sm"
          >
            View all →
          </Link>
        </div>
        <div className="flex space-x-4 overflow-x-auto">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="flex-shrink-0 w-[320px] animate-fadeIn"
              style={{
                animationDelay: `${index * 200}ms`
              }}
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
                    <div className="text-sm text-white/80">
                      <div className="flex items-center">
                        <span className="mr-2">⏳</span>
                        <span>Starts in {event.startsIn}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-3">{event.title}</h3>
                  </div>
                  <div>
                    <p className="text-sm text-white/90 font-medium">{event.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Issue Podcast Section */}
      <GlobalIssuePodcast />

      {/* Environmental Quiz Section */}
      <div className="px-4 mb-8">
        <ProblemsQuiz />
      </div>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-[80px] right-4 sm:right-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <motion.div
          animate={{ 
            scale: showChat ? 1 : [1, 1.2, 1],
            rotate: showChat ? 0 : [0, -10, 10, -10, 0]
          }}
          transition={{ 
            duration: showChat ? 0.2 : 2,
            repeat: showChat ? 0 : Infinity,
            repeatDelay: 3
          }}
          className="relative"
        >
          {showChat ? (
            <span className="text-xl">×</span>
          ) : (
            <>
              <span className="text-xl">💬</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border-2 border-white"></span>
            </>
          )}
        </motion.div>
      </motion.button>

      {/* Chat Bot */}
      {showChat && <ChatBot />}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/60 backdrop-blur-sm flex justify-between items-center px-3 h-[42px] border-t border-gray-100/50">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col items-center w-12"
          >
            <div className={`text-lg ${
              window.location.pathname === item.path ? 'text-blue-500' : 'text-gray-400'
            }`}>
              {item.icon}
            </div>
            <span className={`text-[8px] ${
              window.location.pathname === item.path ? 'text-blue-500 font-medium' : 'text-gray-400'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Home; 