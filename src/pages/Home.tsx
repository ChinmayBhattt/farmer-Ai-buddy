import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface WeatherData {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

interface LocationData {
  name: string;
  lat: number;
  lon: number;
}

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

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

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

  const navigationItems = [
    { icon: '🏠', label: 'Your crops', path: '/' },
    { icon: '👥', label: 'Community', path: '/community' },
    { icon: '📅', label: 'Events', path: '/events' },
    { icon: '👤', label: 'You', path: '/profile' }
  ];

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      setSearchLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query},IN&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.map((item: any) => ({
        name: item.name + (item.state ? `, ${item.state}` : ''),
        lat: item.lat,
        lon: item.lon
      })));
      setSearchLoading(false);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    // Get user's location and fetch weather
    const getLocationAndWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
            // Default to a location (e.g., Mumbai)
            fetchWeather(19.0760, 72.8777);
            setLoading(false);
          }
        );
      } else {
        // Default to a location if geolocation is not supported
        fetchWeather(19.0760, 72.8777);
        setLoading(false);
      }
    };

    getLocationAndWeather();
  }, []);

  // Add debounce effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchLocations(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header with Animated Background */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-white"
      >
        <div className="flex items-center justify-between mb-4">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-green-600"
          >
            FarmAI
          </motion.h1>
        </div>
        
        {/* Animated Crop Selection */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex space-x-4 overflow-x-auto mb-4"
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
              <button className={`w-16 h-16 rounded-full ${crop.color} flex items-center justify-center text-2xl border border-gray-100`}>
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
            <button className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
              +
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

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
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/events')}
              className="flex-shrink-0 w-[320px]"
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

      {/* Weather Card */}
      <div className="px-4 mb-4">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : weather ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Weather</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLocationSearch(!showLocationSearch)}
                  className="text-blue-500 flex items-center space-x-1 text-sm"
                >
                  <span>📍</span>
                  <span>Change Location</span>
                </motion.button>
              </div>

              {showLocationSearch && (
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a city in India..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {searchLoading && (
                      <div className="absolute right-3 top-2.5">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                  </div>
                  {searchResults.length > 0 && (
                    <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-lg">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            fetchWeather(result.lat, result.lon);
                            setShowLocationSearch(false);
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 border-gray-100"
                        >
                          {result.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Today, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </h2>
                  <div className="mt-1 text-gray-600">
                    Clear • {Math.round(weather.main.temp)}°C / {Math.round(weather.main.temp_min)}°C
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-4xl font-semibold">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <span className="ml-2 text-4xl">
                    {weather.weather[0].main === 'Clear' ? '☀️' : 
                     weather.weather[0].main === 'Clouds' ? '☁️' : 
                     weather.weather[0].main === 'Rain' ? '🌧️' : '☀️'}
                  </span>
                </div>
              </div>
              
              {!location && (
                <div className="mt-4 bg-yellow-50 rounded-xl p-3 flex items-center">
                  <span className="text-lg mr-2">📍</span>
                  <div className="flex-1">
                    <button
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const { latitude, longitude } = position.coords;
                              setLocation({ lat: latitude, lon: longitude });
                              fetchWeather(latitude, longitude);
                            }
                          );
                        }
                      }}
                      className="text-left w-full"
                    >
                      <div className="text-gray-700">Location permission required</div>
                      <div className="text-blue-600 font-medium">Allow</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">
              Unable to fetch weather data
            </div>
          )}
        </motion.div>
      </div>

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