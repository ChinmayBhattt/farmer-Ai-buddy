import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChatBot from '../components/ChatBot';
import FertilizerCalculator from '../components/FertilizerCalculator';
import PestsAndDiseases from '../components/PestsAndDiseases';
import CultivationTips from '../components/CultivationTips';
import DiseaseAlert from '../components/DiseaseAlert';
import GlobalProblems from '../components/GlobalProblems';

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

const tools = [
  { id: 1, name: 'Fertilizer calculator', icon: '🌱', Component: FertilizerCalculator, color: 'bg-green-50' },
  { id: 2, name: 'Pests & diseases', icon: '🐛', Component: PestsAndDiseases, color: 'bg-red-50' },
  { id: 3, name: 'Cultivation Tips', icon: '🌿', Component: CultivationTips, color: 'bg-blue-50' },
  { id: 4, name: 'Pests and Disease Alert', icon: '⚠️', Component: DiseaseAlert, color: 'bg-orange-50' },
];

const navigationItems = [
  { icon: '🏠', label: 'Your crops', path: '/' },
  { icon: '🧭', label: 'Discover', path: '/community' },
  { icon: '📅', label: 'Events', path: '/events' },
  { icon: '👤', label: 'You', path: '/profile' }
];

const Home: React.FC = () => {
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
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [defaultWeather] = useState({
    temp: 28,
    condition: 'Sunny',
    location: 'Mumbai, India'
  });
  const [showChat, setShowChat] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

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
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setSearchResults(data.map((item: any) => ({
          name: item.state ? `${item.name}, ${item.state}, ${item.country}` : `${item.name}, ${item.country}`,
          lat: item.lat,
          lon: item.lon
        })));
      } else {
        setSearchResults([]);
      }
      setSearchLoading(false);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchLoading(false);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchLocations(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const handleCloseChatBot = () => setShowChat(false);
    document.addEventListener('closeChatBot', handleCloseChatBot);
    return () => document.removeEventListener('closeChatBot', handleCloseChatBot);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        setIsCapturing(false);
      }
    }
  };

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

      {/* Weather Card */}
      <div className="px-4 mb-4">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
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
                    placeholder="Search for a city..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  {searchLoading && (
                    <div className="absolute right-3 top-2.5">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          fetchWeather(result.lat, result.lon);
                          setLocation({ lat: result.lat, lon: result.lon });
                          setShowLocationSearch(false);
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 border-gray-100 transition-colors duration-200"
                      >
                        {result.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : weather && location ? (
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Today, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </h2>
                  <div className="mt-1 text-gray-600">
                    {weather.weather[0].main} • {Math.round(weather.main.temp)}°C / {Math.round(weather.main.temp_min)}°C
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
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Today, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </h2>
                  <div className="mt-1 text-gray-600">
                    {defaultWeather.condition} • {defaultWeather.location}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-4xl font-semibold">
                    {defaultWeather.temp}°C
                  </div>
                  <span className="ml-2 text-4xl">
                    ☀️
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Heal your crop section */}
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
            onClick={() => {
              setIsCapturing(true);
              startCamera();
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl py-4 font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            Take a picture
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Tools Grid */}
      <div className="px-4 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`${tool.color} p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{tool.icon}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{tool.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tool Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
            >
              ×
            </button>
            {selectedTool === 1 && <FertilizerCalculator />}
            {selectedTool === 2 && <PestsAndDiseases />}
            {selectedTool === 3 && <CultivationTips />}
            {selectedTool === 4 && <DiseaseAlert />}
          </motion.div>
        </div>
      )}

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-20 right-4 sm:right-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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

      {/* Camera UI */}
      {isCapturing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Take a picture of your crop</h2>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsCapturing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={captureImage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Home; 