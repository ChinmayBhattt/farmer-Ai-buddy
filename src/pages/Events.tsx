import { FC, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserGroupIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { eventBanners, getRandomBanner } from '../assets/eventBanners';

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
  capacity: string;
  ticketType: 'free' | 'paid';
  ticketPrice?: number;
}

interface EventFormData {
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  description: string;
  isPublic: boolean;
  requireApproval: boolean;
  capacity: string;
  coverImage: string | null;
  ticketType: 'free' | 'paid';
  ticketPrice: number;
}

// Add new interface for registration form
interface RegistrationFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  institution: string;
}

const Events: FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'my'>('upcoming');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        image: eventBanners.hackathon.url,
        status: 'upcoming',
        participants: 1234,
        createdByMe: false,
        description: 'Join us for an exciting hackathon where you can showcase your coding skills and win amazing prizes!',
        capacity: 'Unlimited',
        ticketType: 'free',
        ticketPrice: 0
      },
      {
        id: 444,
        title: 'Weekly Contest 444',
        date: 'Mar 30, 2025',
        time: '8:00 AM GMT+5:30',
        isVirtual: true,
        image: eventBanners.workshop.url,
        status: 'upcoming',
        participants: 987,
        createdByMe: false,
        description: 'Learn new technologies and best practices in this hands-on workshop.',
        capacity: 'Unlimited',
        ticketType: 'free',
        ticketPrice: 0
      },
      {
        id: 443,
        title: 'Biweekly Contest 153',
        date: 'Mar 29, 2025',
        time: '8:00 PM GMT+5:30',
        isVirtual: true,
        image: eventBanners.conference.url,
        status: 'upcoming',
        participants: 756,
        createdByMe: false,
        description: 'A virtual conference bringing together the best minds in technology.',
        capacity: 'Unlimited',
        ticketType: 'free',
        ticketPrice: 0
      }
    ];
  });

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    startDate: '',
    startTime: '12:30',
    endDate: '',
    endTime: '12:30',
    location: '',
    description: '',
    isPublic: true,
    requireApproval: false,
    capacity: 'Unlimited',
    coverImage: null,
    ticketType: 'free',
    ticketPrice: 0
  });

  // Add new state for registration
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    institution: ''
  });

  // Add state for menu visibility
  const [menuOpenEventId, setMenuOpenEventId] = useState<number | null>(null);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleCreateEvent = () => {
    if (!formData.eventName || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newEventObj: Event = {
      id: Date.now(),
      title: formData.eventName,
      date: new Date(formData.startDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: formData.startTime + ' GMT+5:30',
      isVirtual: true,
      image: formData.coverImage || getRandomBanner(),
      status: 'upcoming',
      participants: 0,
      createdByMe: true,
      description: formData.description,
      capacity: formData.capacity,
      ticketType: formData.ticketType,
      ticketPrice: formData.ticketPrice
    };

    setEvents(prev => [...prev, newEventObj]);
    setShowCreateEvent(false);
    setFormData({
      eventName: '',
      startDate: '',
      startTime: '12:30',
      endDate: '',
      endTime: '12:30',
      location: '',
      description: '',
      isPublic: true,
      requireApproval: false,
      capacity: 'Unlimited',
      coverImage: null,
      ticketType: 'free',
      ticketPrice: 0
    });
    
    setActiveTab('my');
  };

  const handleClose = () => {
    setShowCreateEvent(false);
    setFormData({
      eventName: '',
      startDate: '',
      startTime: '12:30',
      endDate: '',
      endTime: '12:30',
      location: '',
      description: '',
      isPublic: true,
      requireApproval: false,
      capacity: 'Unlimited',
      coverImage: null,
      ticketType: 'free',
      ticketPrice: 0
    });
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          coverImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSearch = (query: string) => {
    setFormData(prev => ({ ...prev, location: query }));
    // Simulated location suggestions - replace with actual API call
    const suggestions = [
      'New York, USA',
      'London, UK',
      'Tokyo, Japan',
      'Paris, France',
      'Mumbai, India'
    ].filter(loc => loc.toLowerCase().includes(query.toLowerCase()));
    setLocationSuggestions(suggestions);
    setShowLocationSuggestions(true);
  };

  const selectLocation = (location: string) => {
    setFormData(prev => ({ ...prev, location }));
    setShowLocationSuggestions(false);
  };

  // Add delete handler
  const handleDeleteEvent = (eventId: number, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent event card click when clicking delete button
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
      setSelectedEvent(null);
    }
  };

  // Add click handler for menu
  const handleMenuClick = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpenEventId(menuOpenEventId === eventId ? null : eventId);
  };

  // Add click outside handler to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpenEventId !== null) {
        setMenuOpenEventId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpenEventId]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white w-full overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-sm z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold">Events</h1>
              <div className="flex space-x-1">
                {[
                  { id: 'upcoming', label: 'Upcoming' },
                  { id: 'past', label: 'Past Contests' },
                  { id: 'my', label: 'My Contests' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-400 hover:bg-gray-800/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Create Event */}
      <motion.button
        onClick={() => setShowCreateEvent(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-20 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex flex-col items-center transition-colors"
      >
        <PlusIcon className="w-6 h-6" />
        <span className="text-xs mt-1">Create</span>
      </motion.button>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#1a1a1a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl mx-4"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-sm p-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Create Event</h2>
                <button onClick={handleClose} className="p-2 hover:bg-gray-800 rounded-lg">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-6">
                {/* Cover Image Upload */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video bg-gray-800 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors relative overflow-hidden"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {formData.coverImage ? (
                    <div className="absolute inset-0">
                      <img 
                        src={formData.coverImage} 
                        alt="Event cover" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white">Change Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <PlusIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400">Add Cover Image</p>
                    </div>
                  )}
                </div>

                {/* Event Details Form */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Event Name"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />

                  {/* Location Input with Suggestions */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Add Event Location"
                      value={formData.location}
                      onChange={(e) => handleLocationSearch(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-sm text-gray-400 mt-1 block">Offline location or virtual link</span>
                    {showLocationSuggestions && locationSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                        {locationSuggestions.map((location, index) => (
                          <button
                            key={index}
                            onClick={() => selectLocation(location)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Start</label>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                          className="w-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">End</label>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                          className="w-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <textarea
                    placeholder="Add Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 min-h-[100px] resize-none"
                  />

                  {/* Ticket Options */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                        <span>Tickets</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-blue-500"
                            checked={formData.ticketType === 'free'}
                            onChange={() => setFormData(prev => ({ ...prev, ticketType: 'free', ticketPrice: 0 }))}
                          />
                          <span className="ml-2">Free</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-blue-500"
                            checked={formData.ticketType === 'paid'}
                            onChange={() => setFormData(prev => ({ ...prev, ticketType: 'paid' }))}
                          />
                          <span className="ml-2">Paid</span>
                        </label>
                      </div>
                    </div>

                    {formData.ticketType === 'paid' && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.ticketPrice}
                          onChange={(e) => setFormData(prev => ({ ...prev, ticketPrice: parseFloat(e.target.value) || 0 }))}
                          className="w-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    )}

                    {/* Capacity Input */}
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <UserGroupIcon className="w-5 h-5 text-gray-400" />
                        <span>Capacity</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-blue-500"
                            checked={formData.capacity === 'Unlimited'}
                            onChange={() => setFormData(prev => ({ ...prev, capacity: 'Unlimited' }))}
                          />
                          <span className="ml-2">Unlimited</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className="form-radio text-blue-500"
                            checked={formData.capacity !== 'Unlimited'}
                            onChange={() => setFormData(prev => ({ ...prev, capacity: '1' }))}
                          />
                          <span className="ml-2">Limited</span>
                        </label>
                      </div>
                    </div>

                    {formData.capacity !== 'Unlimited' && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="1"
                          value={formData.capacity}
                          onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                          className="w-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        />
                        <span className="text-gray-400">participants</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#1a1a1a]/95 backdrop-blur-sm p-4 border-t border-gray-800">
                <button
                  onClick={handleCreateEvent}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#1a1a1a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl mx-4"
            >
              {/* Modal Header */}
              <div className="relative h-64">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedEvent.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 bg-gray-900/50 hover:bg-gray-900/75 rounded-full transition-colors flex items-center space-x-2"
                  >
                    <span className="text-sm">Close</span>
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-semibold">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-300">{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-300">{selectedEvent.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">
                      {selectedEvent.participants} participants
                      {selectedEvent.capacity !== 'Unlimited' && ` / ${selectedEvent.capacity} max`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedEvent.status === 'upcoming' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {selectedEvent.status === 'upcoming' ? 'Upcoming' : 'Ended'}
                    </span>
                  </div>
                </div>

                {selectedEvent.description && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">About Event</h3>
                    <p className="text-gray-300">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="flex items-center justify-between py-4 border-t border-gray-800">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Ticket Type:</span>
                    <span className="text-white font-medium capitalize">
                      {selectedEvent.ticketType}
                    </span>
                  </div>
                  {selectedEvent.ticketType === 'paid' && (
                    <div className="text-white font-medium">
                      ₹{selectedEvent.ticketPrice}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <button 
                    onClick={() => setShowRegistration(true)}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    {selectedEvent.ticketType === 'free' ? 'Join Event' : `Register • ₹${selectedEvent.ticketPrice}`}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistration && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowRegistration(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#1a1a1a] w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-xl mx-4"
            >
              {/* Registration Header */}
              <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-sm p-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Register for Event</h2>
                <button 
                  onClick={() => setShowRegistration(false)} 
                  className="p-2 hover:bg-gray-800 rounded-lg"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Registration Form */}
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={registrationData.fullName}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={registrationData.phoneNumber}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">College/School Name</label>
                    <input
                      type="text"
                      value={registrationData.institution}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="Enter your college or school name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Registration Footer */}
              <div className="sticky bottom-0 bg-[#1a1a1a]/95 backdrop-blur-sm p-4 border-t border-gray-800">
                <button
                  onClick={() => {
                    // Handle registration submission here
                    alert('Registration successful!');
                    setShowRegistration(false);
                    setSelectedEvent(null);
                    setRegistrationData({
                      fullName: '',
                      phoneNumber: '',
                      email: '',
                      institution: ''
                    });
                  }}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Register Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-700/50 transition-colors relative group"
                onClick={() => setSelectedEvent(event)}
              >
                {event.createdByMe && (
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => handleMenuClick(event.id, e)}
                      className="p-2 bg-gray-900/50 hover:bg-gray-900/75 rounded-full transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="3" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="8" cy="13" r="1.5" />
                      </svg>
                    </button>
                    
                    {menuOpenEventId === event.id && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                        <button
                          onClick={(e) => handleDeleteEvent(event.id, e)}
                          className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center space-x-2"
                        >
                          <XMarkIcon className="w-4 h-4" />
                          <span>Delete Event</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="relative h-48">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-sm text-gray-300">{event.date} • {event.time}</p>
                      <div className="flex items-center text-sm text-gray-300">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {event.participants}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Global Rankings */}
        {activeTab === 'upcoming' && (
          <div className="bg-gray-800 rounded-xl p-4 mt-4">
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