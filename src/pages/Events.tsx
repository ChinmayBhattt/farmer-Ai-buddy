import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserGroupIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  isVirtual?: boolean;
  image?: string;
  status: 'upcoming' | 'ended';
  endDate?: string;
  participants?: number;
  createdByMe?: boolean;
  description?: string;
}

const Events: FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'my'>('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    return [
      {
        id: 445,
        title: 'Weekly Contest 445',
        date: 'Apr 6, 2025',
        time: '8:00 AM GMT+5:30',
        isVirtual: true,
        image: '/event-bg-1.svg',
        status: 'upcoming',
        participants: 1234,
        createdByMe: false
      },
      {
        id: 444,
        title: 'Weekly Contest 444',
        date: 'Mar 30, 2025',
        time: '8:00 AM GMT+5:30',
        isVirtual: true,
        image: '/event-bg-1.svg',
        status: 'upcoming',
        participants: 987,
        createdByMe: false
      },
      {
        id: 443,
        title: 'Biweekly Contest 153',
        date: 'Mar 29, 2025',
        time: '8:00 PM GMT+5:30',
        isVirtual: true,
        image: '/event-bg-2.svg',
        status: 'upcoming',
        participants: 756,
        createdByMe: false
      }
    ];
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    bannerColor: 'blue'
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleCreateEvent = () => {
    const dateObj = new Date(`${newEvent.date}T${newEvent.time}`);
    const newEventObj: Event = {
      id: Date.now(),
      title: newEvent.title,
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: dateObj.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }) + ' GMT+5:30',
      isVirtual: true,
      image: '/event-bg-1.svg',
      status: 'upcoming',
      participants: 0,
      createdByMe: true,
      description: newEvent.description
    };

    setEvents(prev => [...prev, newEventObj]);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      description: '',
      bannerColor: 'blue'
    });
    
    // Switch to My Events tab after creating
    setActiveTab('my');
  };

  const [rankings] = useState([
    { rank: 1, name: 'Miruu', rating: 3703, attended: 26, avatar: '👾' },
    { rank: 2, name: 'Neal Wu 🇺🇸', rating: 3686, attended: 51, avatar: '👤' },
    { rank: 3, name: 'Yawn_Sean 🌙', rating: 3645, attended: 84, avatar: '👤' },
    { rank: 4, name: '小羊肖恩 🇨🇳', rating: 3611, attended: 107, avatar: '👤' },
    { rank: 5, name: 'Heltion 何遥 🇨🇳', rating: 3599, attended: 146, avatar: '👤' }
  ]);

  const navigationItems = [
    { icon: '🏠', label: 'Your crops', path: '/' },
    { icon: '👥', label: 'Community', path: '/community' },
    { icon: '📅', label: 'Events', path: '/events' },
    { icon: '👤', label: 'You', path: '/profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Events</h1>
          <div className="flex items-center space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Event</span>
            </motion.button>
            <Link 
              to="/community"
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <UserGroupIcon className="w-6 h-6 text-gray-400" />
            </Link>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 px-4 border-b border-gray-800">
          {[
            { id: 'upcoming', label: 'Upcoming', icon: <CalendarIcon className="w-4 h-4" /> },
            { id: 'past', label: 'Past Contests', icon: <ClockIcon className="w-4 h-4" /> },
            { id: 'my', label: 'My Contests', icon: <UserGroupIcon className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium relative flex items-center space-x-2 ${
                activeTab === tab.id ? 'text-white' : 'text-gray-400'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter event description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Color
                  </label>
                  <div className="flex space-x-2">
                    {['blue', 'green', 'purple', 'orange'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewEvent(prev => ({ ...prev, bannerColor: color }))}
                        className={`w-8 h-8 rounded-full ${
                          newEvent.bannerColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                        } ${
                          color === 'blue' ? 'bg-blue-500' :
                          color === 'green' ? 'bg-green-500' :
                          color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateEvent}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 mb-6">
          {events
            .filter(event => 
              (activeTab === 'upcoming' && event.status === 'upcoming' && !event.createdByMe) ||
              (activeTab === 'past' && event.status === 'ended') ||
              (activeTab === 'my' && event.createdByMe)
            )
            .map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-xl overflow-hidden"
              >
                <div className="relative h-40">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: 'cover'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <p className="text-sm text-gray-300">{event.date} • {event.time}</p>
                          <div className="flex items-center text-sm text-gray-300">
                            <UserGroupIcon className="w-4 h-4 mr-1" />
                            {event.participants}
                          </div>
                        </div>
                        {event.description && (
                          <p className="text-sm text-gray-400 mt-2">{event.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {event.isVirtual && (
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                            Virtual
                          </span>
                        )}
                        {event.createdByMe && (
                          <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
                            Created by me
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Global Rankings */}
        {activeTab === 'upcoming' && (
          <div className="bg-gray-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">🏆</span> Global Rankings
            </h2>
            <div className="space-y-4">
              {rankings.map((user) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      user.rank === 1 ? 'bg-yellow-500/20 text-yellow-300' :
                      user.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                      user.rank === 3 ? 'bg-amber-600/20 text-amber-400' :
                      'bg-gray-700/50 text-gray-400'
                    }`}>{user.rank}</span>
                    <span className="text-2xl">{user.avatar}</span>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">Rating: {user.rating}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Attended: {user.attended}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

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

export default Events; 