import React, { type FC, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChatBot from '../components/ChatBot';
import FertilizerCalculator from '../components/FertilizerCalculator';
import PestsAndDiseases from '../components/PestsAndDiseases';
import CultivationTips from '../components/CultivationTips';
import DiseaseAlert from '../components/DiseaseAlert';

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

interface FruitInfo {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
  vitamins: string[];
  diseases: string[];
  cultivation: string;
  benefits: string[];
}

interface CropItem {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface CropCategory {
  name: string;
  items: CropItem[];
}

const allCrops: CropCategory[] = [
  {
    name: "Fruits",
    items: [
      { id: 1, name: 'Apple', icon: '🍎', color: 'bg-red-100' },
      { id: 2, name: 'Banana', icon: '🍌', color: 'bg-yellow-100' },
      { id: 3, name: 'Orange', icon: '🍊', color: 'bg-orange-100' },
      { id: 4, name: 'Grapes', icon: '🍇', color: 'bg-purple-100' },
      { id: 5, name: 'Watermelon', icon: '🍉', color: 'bg-red-100' },
      { id: 6, name: 'Mango', icon: '🥭', color: 'bg-yellow-100' },
      { id: 31, name: 'Pineapple', icon: '🍍', color: 'bg-yellow-100' },
      { id: 32, name: 'Strawberry', icon: '🍓', color: 'bg-red-100' },
      { id: 33, name: 'Peach', icon: '🍑', color: 'bg-orange-100' },
      { id: 34, name: 'Pear', icon: '🍐', color: 'bg-green-100' },
      { id: 35, name: 'Kiwi', icon: '🥝', color: 'bg-green-100' },
      { id: 36, name: 'Cherry', icon: '🍒', color: 'bg-red-100' },
      { id: 37, name: 'Blueberry', icon: '🫐', color: 'bg-blue-100' },
      { id: 38, name: 'Raspberry', icon: '🍇', color: 'bg-red-100' },
      { id: 39, name: 'Blackberry', icon: '🍇', color: 'bg-purple-100' },
      { id: 40, name: 'Apricot', icon: '🍑', color: 'bg-orange-100' },
      { id: 41, name: 'Plum', icon: '🍑', color: 'bg-purple-100' },
      { id: 42, name: 'Guava', icon: '🥭', color: 'bg-green-100' },
      { id: 43, name: 'Pomegranate', icon: '🍎', color: 'bg-red-100' },
      { id: 44, name: 'Papaya', icon: '🥭', color: 'bg-orange-100' },
      { id: 45, name: 'Lychee', icon: '🍇', color: 'bg-red-100' },
      { id: 46, name: 'Dragon Fruit', icon: '🥭', color: 'bg-pink-100' },
      { id: 47, name: 'Passion Fruit', icon: '🍇', color: 'bg-purple-100' },
      { id: 48, name: 'Jackfruit', icon: '🥭', color: 'bg-yellow-100' },
      { id: 49, name: 'Custard Apple', icon: '🍎', color: 'bg-green-100' },
      { id: 50, name: 'Star Fruit', icon: '⭐', color: 'bg-yellow-100' },
      { id: 51, name: 'Persimmon', icon: '🍎', color: 'bg-orange-100' },
      { id: 52, name: 'Fig', icon: '🍇', color: 'bg-purple-100' },
      { id: 53, name: 'Date', icon: '🍇', color: 'bg-brown-100' },
      { id: 54, name: 'Coconut', icon: '🥥', color: 'bg-brown-100' },
      { id: 55, name: 'Avocado', icon: '🥑', color: 'bg-green-100' },
      { id: 56, name: 'Lemon', icon: '🍋', color: 'bg-yellow-100' },
      { id: 57, name: 'Lime', icon: '🍋', color: 'bg-green-100' },
      { id: 58, name: 'Grapefruit', icon: '🍊', color: 'bg-orange-100' },
      { id: 59, name: 'Tangerine', icon: '🍊', color: 'bg-orange-100' },
      { id: 60, name: 'Clementine', icon: '🍊', color: 'bg-orange-100' },
      { id: 61, name: 'Kumquat', icon: '🍊', color: 'bg-orange-100' },
      { id: 62, name: 'Nectarine', icon: '🍑', color: 'bg-orange-100' },
      { id: 63, name: 'Mulberry', icon: '🍇', color: 'bg-purple-100' },
      { id: 64, name: 'Elderberry', icon: '🍇', color: 'bg-purple-100' },
      { id: 65, name: 'Gooseberry', icon: '🍇', color: 'bg-green-100' },
      { id: 66, name: 'Cranberry', icon: '🍇', color: 'bg-red-100' },
      { id: 67, name: 'Currant', icon: '🍇', color: 'bg-purple-100' },
      { id: 68, name: 'Quince', icon: '🍎', color: 'bg-yellow-100' },
      { id: 69, name: 'Loquat', icon: '🍎', color: 'bg-orange-100' },
      { id: 70, name: 'Soursop', icon: '🥭', color: 'bg-green-100' }
    ]
  },
  {
    name: "Vegetables",
    items: [
      { id: 7, name: 'Brinjal', icon: '🍆', color: 'bg-purple-100' },
      { id: 8, name: 'Carrot', icon: '🥕', color: 'bg-orange-100' },
      { id: 9, name: 'Potato', icon: '🥔', color: 'bg-yellow-50' },
      { id: 10, name: 'Tomato', icon: '🍅', color: 'bg-red-100' },
      { id: 11, name: 'Cucumber', icon: '🥒', color: 'bg-green-100' },
      { id: 12, name: 'Corn', icon: '🌽', color: 'bg-yellow-100' },
      { id: 34, name: 'Bell Pepper', icon: '🫑', color: 'bg-green-100' },
      { id: 35, name: 'Onion', icon: '🧅', color: 'bg-yellow-50' },
      { id: 36, name: 'Garlic', icon: '🧄', color: 'bg-gray-100' },
      { id: 71, name: 'Broccoli', icon: '🥦', color: 'bg-green-100' },
      { id: 72, name: 'Cauliflower', icon: '🥦', color: 'bg-white' },
      { id: 73, name: 'Cabbage', icon: '🥬', color: 'bg-green-100' },
      { id: 74, name: 'Spinach', icon: '🥬', color: 'bg-green-100' },
      { id: 75, name: 'Lettuce', icon: '🥬', color: 'bg-green-100' },
      { id: 76, name: 'Kale', icon: '🥬', color: 'bg-green-100' },
      { id: 77, name: 'Zucchini', icon: '🥒', color: 'bg-green-100' },
      { id: 78, name: 'Pumpkin', icon: '🎃', color: 'bg-orange-100' },
      { id: 79, name: 'Sweet Potato', icon: '🍠', color: 'bg-orange-100' },
      { id: 80, name: 'Beetroot', icon: '🥕', color: 'bg-red-100' },
      { id: 81, name: 'Radish', icon: '🥕', color: 'bg-red-100' },
      { id: 82, name: 'Turnip', icon: '🥕', color: 'bg-white' },
      { id: 83, name: 'Parsnip', icon: '🥕', color: 'bg-white' },
      { id: 84, name: 'Celery', icon: '🥬', color: 'bg-green-100' },
      { id: 85, name: 'Asparagus', icon: '🥬', color: 'bg-green-100' },
      { id: 86, name: 'Artichoke', icon: '🥬', color: 'bg-green-100' },
      { id: 87, name: 'Brussels Sprouts', icon: '🥬', color: 'bg-green-100' },
      { id: 88, name: 'Green Beans', icon: '🥬', color: 'bg-green-100' },
      { id: 89, name: 'Peas', icon: '🫛', color: 'bg-green-100' },
      { id: 90, name: 'Okra', icon: '🥬', color: 'bg-green-100' },
      { id: 91, name: 'Bitter Gourd', icon: '🥒', color: 'bg-green-100' },
      { id: 92, name: 'Bottle Gourd', icon: '🥒', color: 'bg-green-100' },
      { id: 93, name: 'Ridge Gourd', icon: '🥒', color: 'bg-green-100' },
      { id: 94, name: 'Snake Gourd', icon: '🥒', color: 'bg-green-100' },
      { id: 95, name: 'Yam', icon: '🍠', color: 'bg-brown-100' },
      { id: 96, name: 'Taro', icon: '🍠', color: 'bg-brown-100' },
      { id: 97, name: 'Ginger', icon: '🧄', color: 'bg-brown-100' },
      { id: 98, name: 'Turmeric', icon: '🧄', color: 'bg-orange-100' },
      { id: 99, name: 'Spring Onion', icon: '🧅', color: 'bg-green-100' },
      { id: 100, name: 'Leek', icon: '🧅', color: 'bg-green-100' },
      { id: 101, name: 'Shallot', icon: '🧅', color: 'bg-purple-100' },
      { id: 102, name: 'Fennel', icon: '🥬', color: 'bg-green-100' },
      { id: 103, name: 'Endive', icon: '🥬', color: 'bg-green-100' },
      { id: 104, name: 'Arugula', icon: '🥬', color: 'bg-green-100' },
      { id: 105, name: 'Chicory', icon: '🥬', color: 'bg-green-100' },
      { id: 106, name: 'Watercress', icon: '🥬', color: 'bg-green-100' },
      { id: 107, name: 'Bok Choy', icon: '🥬', color: 'bg-green-100' },
      { id: 108, name: 'Napa Cabbage', icon: '🥬', color: 'bg-green-100' },
      { id: 109, name: 'Collard Greens', icon: '🥬', color: 'bg-green-100' },
      { id: 110, name: 'Swiss Chard', icon: '🥬', color: 'bg-green-100' }
    ]
  },
  {
    name: "Grains",
    items: [
      { id: 13, name: 'Rice', icon: '🌾', color: 'bg-yellow-50' },
      { id: 14, name: 'Wheat', icon: '🌾', color: 'bg-yellow-100' },
      { id: 15, name: 'Barley', icon: '🌾', color: 'bg-yellow-50' },
      { id: 37, name: 'Corn', icon: '🌽', color: 'bg-yellow-100' },
      { id: 38, name: 'Oats', icon: '🌾', color: 'bg-yellow-50' },
      { id: 39, name: 'Millet', icon: '🌾', color: 'bg-yellow-100' }
    ]
  },
  {
    name: "Pulses",
    items: [
      { id: 16, name: 'Black Gram', icon: '🫘', color: 'bg-gray-100' },
      { id: 17, name: 'Green Gram', icon: '🫘', color: 'bg-green-100' },
      { id: 18, name: 'Chickpea', icon: '🫘', color: 'bg-yellow-100' },
      { id: 40, name: 'Red Lentils', icon: '🫘', color: 'bg-red-100' },
      { id: 41, name: 'Pigeon Pea', icon: '🫘', color: 'bg-yellow-50' },
      { id: 42, name: 'Kidney Beans', icon: '🫘', color: 'bg-red-100' }
    ]
  }
];

interface CropSelectionPopupProps {
  onClose: () => void;
  onSelect: (crop: CropItem) => void;
  selectedCrops: CropItem[];
  onRemove: (cropId: number) => void;
}

const CropSelectionPopup: React.FC<CropSelectionPopupProps> = ({ 
  onClose, 
  onSelect, 
  selectedCrops,
  onRemove 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(allCrops[0].name);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl w-[90%] max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <h2 className="text-xl font-semibold">Select crops (up to 8)</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        <div className="flex h-[calc(80vh-64px)]">
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto bg-gray-50">
            {allCrops.map(category => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  selectedCategory === category.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {allCrops
                .find(cat => cat.name === selectedCategory)
                ?.items.map(crop => {
                  const isSelected = selectedCrops.some(c => c.id === crop.id);
                  return (
                    <button
                      key={crop.id}
                      onClick={() => {
                        if (isSelected) {
                          onRemove(crop.id);
                        } else if (selectedCrops.length < 8) {
                          onSelect(crop);
                        }
                      }}
                      className="p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col items-center gap-2 relative group"
                    >
                      <span className={`text-3xl p-2 rounded-lg ${crop.color}`}>{crop.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{crop.name}</span>
                      {isSelected && (
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-sm shadow-sm border border-rose-200">
                          ×
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FruitPopup = ({ fruit, onClose }: { fruit: FruitInfo; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className={`text-4xl p-3 rounded-lg ${fruit.color}`}>{fruit.icon}</span>
            <h2 className="text-2xl font-bold text-gray-800">{fruit.name}</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </motion.button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-600">{fruit.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Vitamins & Nutrients</h3>
            <div className="flex flex-wrap gap-2">
              {fruit.vitamins.map((vitamin, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {vitamin}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Common Diseases</h3>
            <div className="space-y-2">
              {fruit.diseases.map((disease, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-red-50 text-red-700 p-2 rounded-lg text-sm"
                >
                  {disease}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Cultivation Guide</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm"
            >
              {fruit.cultivation}
            </motion.div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Health Benefits</h3>
            <ul className="space-y-2">
              {fruit.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <span className="text-green-500">✓</span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};



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
  const [selectedFruit, setSelectedFruit] = useState<FruitInfo | null>(null);
  const [showCropSelection, setShowCropSelection] = useState(false);
  const defaultCrops = allCrops[0].items.slice(0, 4); // Get first 4 fruits from allCrops
  const [selectedCrops, setSelectedCrops] = useState<CropItem[]>(defaultCrops);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

  const crops: FruitInfo[] = [
    {
      id: 1,
      name: 'Apple',
      icon: '🍎',
      color: 'bg-red-100',
      description: 'Sweet and crispy apples are one of the most popular fruits worldwide.',
      vitamins: ['Vitamin C', 'Vitamin B6', 'Potassium', 'Fiber'],
      diseases: ['Apple Scab', 'Fire Blight', 'Cedar Apple Rust'],
      cultivation: 'Apples need full sun and well-drained soil. Regular pruning is essential for good fruit production. Requires proper spacing and pollination partners.',
      benefits: [
        'Improves heart health',
        'Helps with weight loss',
        'Boosts immune system',
        'Good for digestion'
      ]
    },
    {
      id: 2,
      name: 'Banana',
      icon: '🍌',
      color: 'bg-yellow-100',
      description: 'Energy-rich bananas are perfect for quick nutrition and easy cultivation.',
      vitamins: ['Vitamin B6', 'Vitamin C', 'Potassium', 'Fiber'],
      diseases: ['Panama Disease', 'Black Sigatoka', 'Banana Bunchy Top'],
      cultivation: 'Bananas need rich, well-drained soil and plenty of organic matter. Regular watering and protection from strong winds is important.',
      benefits: [
        'Quick energy source',
        'Supports muscle function',
        'Aids in digestion',
        'Good for heart health'
      ]
    },
    {
      id: 3,
      name: 'Orange',
      icon: '🍊',
      color: 'bg-orange-100',
      description: 'Vitamin C-rich citrus fruits are essential for immune system health.',
      vitamins: ['Vitamin C', 'Vitamin A', 'Folate', 'Potassium'],
      diseases: ['Citrus Canker', 'Greening Disease', 'Brown Rot'],
      cultivation: 'Citrus trees need warm climate and well-drained soil. Protection from frost is essential. Regular fertilization and proper watering schedule required.',
      benefits: [
        'Boosts immunity',
        'Improves skin health',
        'Aids in iron absorption',
        'Reduces inflammation'
      ]
    },
    {
      id: 4,
      name: 'Grapes',
      icon: '🍇',
      color: 'bg-purple-100',
      description: 'Sweet and juicy grapes are excellent for both fresh consumption and wine production.',
      vitamins: ['Vitamin K', 'Vitamin C', 'Antioxidants', 'Resveratrol'],
      diseases: ['Powdery Mildew', 'Black Rot', 'Downy Mildew'],
      cultivation: 'Grapes need strong support systems and regular pruning. Well-drained soil and full sun exposure are essential.',
      benefits: [
        'Rich in antioxidants',
        'Supports heart health',
        'Anti-aging properties',
        'Helps reduce inflammation'
      ]
    },
    {
      id: 5,
      name: 'Watermelon',
      icon: '🍉',
      color: 'bg-red-100',
      description: 'Refreshing and hydrating watermelon is perfect for hot summer days.',
      vitamins: ['Vitamin A', 'Vitamin C', 'Lycopene', 'Potassium'],
      diseases: ['Fusarium Wilt', 'Anthracnose', 'Powdery Mildew'],
      cultivation: 'Watermelons need lots of space, warm temperatures, and consistent moisture. Sandy, well-drained soil is ideal.',
      benefits: [
        'Hydrating properties',
        'Rich in antioxidants',
        'Supports heart health',
        'Anti-inflammatory'
      ]
    },
    {
      id: 6,
      name: 'Mango',
      icon: '🥭',
      color: 'bg-yellow-100',
      description: 'Sweet and tropical mangoes are known as the king of fruits.',
      vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin B6', 'Fiber'],
      diseases: ['Anthracnose', 'Powdery Mildew', 'Stem End Rot'],
      cultivation: 'Mangoes need tropical climate, protection from strong winds, and well-drained soil. Regular pruning helps in better fruit production.',
      benefits: [
        'Boosts immunity',
        'Improves eye health',
        'Aids digestion',
        'Supports skin health'
      ]
    },
    {
      id: 7,
      name: 'Brinjal',
      icon: '🍆',
      color: 'bg-purple-100',
      description: 'Brinjal or eggplant is a versatile vegetable rich in antioxidants and nutrients.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Vitamin B6', 'Potassium', 'Fiber'],
      diseases: ['Verticillium Wilt', 'Bacterial Wilt', 'Fruit and Shoot Borer'],
      cultivation: 'Brinjals need warm weather, well-drained soil, and full sunlight. Regular watering and proper spacing between plants is essential.',
      benefits: [
        'Rich in antioxidants',
        'Helps in weight loss',
        'Supports heart health',
        'Improves digestion'
      ]
    },
    {
      id: 8,
      name: 'Carrot',
      icon: '🥕',
      color: 'bg-orange-100',
      description: 'Carrots are root vegetables known for their high beta-carotene content.',
      vitamins: ['Vitamin A', 'Vitamin K', 'Vitamin C', 'Potassium', 'Fiber'],
      diseases: ['Alternaria Leaf Blight', 'Black Rot', 'Root-Knot Nematodes'],
      cultivation: 'Carrots need loose, well-drained soil and cool temperatures. Thin seedlings to allow proper root development.',
      benefits: [
        'Improves eye health',
        'Boosts immune system',
        'Promotes healthy skin',
        'Aids in digestion'
      ]
    },
    {
      id: 9,
      name: 'Potato',
      icon: '🥔',
      color: 'bg-yellow-50',
      description: 'Potatoes are starchy tubers that are a staple food worldwide.',
      vitamins: ['Vitamin C', 'Vitamin B6', 'Potassium', 'Magnesium'],
      diseases: ['Late Blight', 'Early Blight', 'Black Scurf'],
      cultivation: 'Potatoes need well-drained soil and full sun. Regular hilling and proper spacing are essential.',
      benefits: [
        'Good source of energy',
        'Supports bone health',
        'Reduces inflammation',
        'Promotes heart health'
      ]
    },
    {
      id: 10,
      name: 'Tomato',
      icon: '🍅',
      color: 'bg-red-100',
      description: 'Tomatoes are rich in lycopene and essential vitamins.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Potassium', 'Folate'],
      diseases: ['Early Blight', 'Late Blight', 'Fusarium Wilt'],
      cultivation: 'Tomatoes need full sun and well-drained soil. Proper staking and regular pruning help in better yield.',
      benefits: [
        'Rich in antioxidants',
        'Promotes heart health',
        'Supports skin health',
        'Aids in digestion'
      ]
    },
    {
      id: 13,
      name: 'Rice',
      icon: '🌾',
      color: 'bg-yellow-50',
      description: 'Rice is a staple grain that feeds billions of people worldwide.',
      vitamins: ['Vitamin B1', 'Vitamin B6', 'Iron', 'Magnesium'],
      diseases: ['Rice Blast', 'Bacterial Blight', 'Sheath Blight'],
      cultivation: 'Rice needs standing water and warm temperatures. Proper water management and fertilization are crucial.',
      benefits: [
        'Energy source',
        'Gluten-free grain',
        'Easy to digest',
        'Versatile food'
      ]
    },
    {
      id: 16,
      name: 'Black Gram',
      icon: '🫘',
      color: 'bg-gray-100',
      description: 'Black gram is a protein-rich pulse crop widely used in Indian cuisine.',
      vitamins: ['Protein', 'Iron', 'Folate', 'Calcium'],
      diseases: ['Yellow Mosaic', 'Powdery Mildew', 'Root Rot'],
      cultivation: 'Black gram needs well-drained soil and moderate rainfall. Proper spacing and timely weeding are important.',
      benefits: [
        'High protein content',
        'Rich in minerals',
        'Good for diabetics',
        'Improves digestive health'
      ]
    },
    {
      id: 34,
      name: 'Pear',
      icon: '🍐',
      color: 'bg-green-100',
      description: 'Sweet and juicy pears are rich in fiber and antioxidants.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Copper', 'Fiber'],
      diseases: ['Fire Blight', 'Pear Scab', 'Pear Rust'],
      cultivation: 'Pears need well-drained soil and full sun. They require cross-pollination and regular pruning.',
      benefits: [
        'Improves digestion',
        'Supports heart health',
        'Boosts immune system',
        'Good for skin health'
      ]
    },
    {
      id: 35,
      name: 'Kiwi',
      icon: '🥝',
      color: 'bg-green-100',
      description: 'Tart and sweet kiwi is packed with vitamin C and fiber.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Vitamin E', 'Folate'],
      diseases: ['Bacterial Canker', 'Root Rot', 'Phytophthora Crown Rot'],
      cultivation: 'Kiwi vines need strong support, well-drained soil, and protection from strong winds.',
      benefits: [
        'Boosts immunity',
        'Improves digestion',
        'Supports heart health',
        'Good for skin health'
      ]
    },
    {
      id: 36,
      name: 'Cherry',
      icon: '🍒',
      color: 'bg-red-100',
      description: 'Sweet and tart cherries are rich in antioxidants and anti-inflammatory compounds.',
      vitamins: ['Vitamin C', 'Potassium', 'Fiber', 'Antioxidants'],
      diseases: ['Brown Rot', 'Cherry Leaf Spot', 'Powdery Mildew'],
      cultivation: 'Cherries need well-drained soil, full sun, and protection from birds. Regular pruning is essential.',
      benefits: [
        'Reduces inflammation',
        'Improves sleep quality',
        'Supports heart health',
        'Rich in antioxidants'
      ]
    },
    {
      id: 37,
      name: 'Blueberry',
      icon: '🫐',
      color: 'bg-blue-100',
      description: 'Sweet and tangy blueberries are packed with antioxidants and nutrients.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Manganese', 'Fiber'],
      diseases: ['Mummy Berry', 'Botrytis Blight', 'Anthracnose'],
      cultivation: 'Blueberries need acidic soil, full sun, and regular watering. Mulching helps maintain soil moisture.',
      benefits: [
        'Rich in antioxidants',
        'Improves brain function',
        'Supports heart health',
        'Good for eye health'
      ]
    },
    {
      id: 71,
      name: 'Broccoli',
      icon: '🥦',
      color: 'bg-green-100',
      description: 'Nutrient-rich broccoli is a cruciferous vegetable with numerous health benefits.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Folate', 'Fiber'],
      diseases: ['Downy Mildew', 'Clubroot', 'Black Rot'],
      cultivation: 'Broccoli needs fertile soil, full sun, and consistent moisture. Regular fertilization is important.',
      benefits: [
        'Rich in antioxidants',
        'Supports bone health',
        'Boosts immune system',
        'Good for digestion'
      ]
    },
    {
      id: 72,
      name: 'Cauliflower',
      icon: '🥦',
      color: 'bg-white',
      description: 'Versatile cauliflower is rich in nutrients and can be used in various dishes.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Folate', 'Fiber'],
      diseases: ['Downy Mildew', 'Black Rot', 'Clubroot'],
      cultivation: 'Cauliflower needs fertile soil, full sun, and consistent moisture. Blanching is important for white varieties.',
      benefits: [
        'Rich in antioxidants',
        'Supports heart health',
        'Good for digestion',
        'Low in calories'
      ]
    },
    {
      id: 73,
      name: 'Cabbage',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Nutritious cabbage is a staple in many cuisines and rich in vitamins.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Folate', 'Fiber'],
      diseases: ['Black Rot', 'Clubroot', 'Downy Mildew'],
      cultivation: 'Cabbage needs fertile soil, full sun, and consistent moisture. Regular watering is essential.',
      benefits: [
        'Rich in antioxidants',
        'Supports digestion',
        'Boosts immune system',
        'Good for heart health'
      ]
    },
    {
      id: 38,
      name: 'Raspberry',
      icon: '🍇',
      color: 'bg-red-100',
      description: 'Sweet and tart raspberries are rich in antioxidants and fiber.',
      vitamins: ['Vitamin C', 'Manganese', 'Fiber', 'Antioxidants'],
      diseases: ['Gray Mold', 'Root Rot', 'Spur Blight'],
      cultivation: 'Raspberries need well-drained soil, full sun, and support structures. Regular pruning is essential.',
      benefits: [
        'Rich in antioxidants',
        'Supports heart health',
        'Improves digestion',
        'Good for skin health'
      ]
    },
    {
      id: 39,
      name: 'Blackberry',
      icon: '🍇',
      color: 'bg-purple-100',
      description: 'Sweet and juicy blackberries are packed with vitamins and antioxidants.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Manganese', 'Fiber'],
      diseases: ['Orange Rust', 'Anthracnose', 'Cane Blight'],
      cultivation: 'Blackberries need well-drained soil, full sun, and support structures. Regular pruning is important.',
      benefits: [
        'Rich in antioxidants',
        'Supports brain health',
        'Improves digestion',
        'Good for heart health'
      ]
    },
    {
      id: 40,
      name: 'Apricot',
      icon: '🍑',
      color: 'bg-orange-100',
      description: 'Sweet and aromatic apricots are rich in vitamins and minerals.',
      vitamins: ['Vitamin A', 'Vitamin C', 'Potassium', 'Fiber'],
      diseases: ['Brown Rot', 'Shot Hole Disease', 'Powdery Mildew'],
      cultivation: 'Apricots need well-drained soil, full sun, and protection from late frosts. Regular pruning is essential.',
      benefits: [
        'Good for eye health',
        'Supports skin health',
        'Improves digestion',
        'Rich in antioxidants'
      ]
    },
    {
      id: 41,
      name: 'Plum',
      icon: '🍑',
      color: 'bg-purple-100',
      description: 'Sweet and juicy plums are rich in antioxidants and fiber.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Potassium', 'Fiber'],
      diseases: ['Brown Rot', 'Plum Pox', 'Black Knot'],
      cultivation: 'Plums need well-drained soil, full sun, and regular pruning. Cross-pollination may be required.',
      benefits: [
        'Improves digestion',
        'Supports heart health',
        'Rich in antioxidants',
        'Good for bone health'
      ]
    },
    {
      id: 42,
      name: 'Guava',
      icon: '🥭',
      color: 'bg-green-100',
      description: 'Tropical guava is rich in vitamin C and dietary fiber.',
      vitamins: ['Vitamin C', 'Vitamin A', 'Fiber', 'Potassium'],
      diseases: ['Anthracnose', 'Fruit Rot', 'Wilt'],
      cultivation: 'Guava needs well-drained soil, full sun, and protection from frost. Regular pruning is important.',
      benefits: [
        'Boosts immunity',
        'Improves digestion',
        'Good for heart health',
        'Supports skin health'
      ]
    },
    {
      id: 43,
      name: 'Pomegranate',
      icon: '🍎',
      color: 'bg-red-100',
      description: 'Juicy pomegranate seeds are packed with antioxidants and nutrients.',
      vitamins: ['Vitamin C', 'Vitamin K', 'Folate', 'Potassium'],
      diseases: ['Fruit Rot', 'Bacterial Blight', 'Alternaria Blight'],
      cultivation: 'Pomegranates need well-drained soil, full sun, and protection from frost. Regular pruning is essential.',
      benefits: [
        'Rich in antioxidants',
        'Supports heart health',
        'Anti-inflammatory',
        'Good for digestion'
      ]
    },
    {
      id: 74,
      name: 'Spinach',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Nutrient-dense spinach is rich in iron and vitamins.',
      vitamins: ['Vitamin K', 'Vitamin A', 'Iron', 'Folate'],
      diseases: ['Downy Mildew', 'White Rust', 'Fusarium Wilt'],
      cultivation: 'Spinach needs fertile soil, partial shade, and consistent moisture. Regular harvesting promotes growth.',
      benefits: [
        'Rich in iron',
        'Supports bone health',
        'Good for eye health',
        'Boosts immune system'
      ]
    },
    {
      id: 75,
      name: 'Lettuce',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Crisp and refreshing lettuce is a staple in salads and sandwiches.',
      vitamins: ['Vitamin K', 'Vitamin A', 'Folate', 'Iron'],
      diseases: ['Downy Mildew', 'Bottom Rot', 'Tip Burn'],
      cultivation: 'Lettuce needs fertile soil, partial shade, and consistent moisture. Regular watering is essential.',
      benefits: [
        'Low in calories',
        'Good for hydration',
        'Supports bone health',
        'Rich in vitamins'
      ]
    },
    {
      id: 76,
      name: 'Kale',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Nutrient-packed kale is one of the most nutritious leafy greens.',
      vitamins: ['Vitamin K', 'Vitamin A', 'Vitamin C', 'Calcium'],
      diseases: ['Black Rot', 'Downy Mildew', 'Alternaria Leaf Spot'],
      cultivation: 'Kale needs fertile soil, full sun to partial shade, and regular watering. Frost improves flavor.',
      benefits: [
        'Rich in antioxidants',
        'Supports bone health',
        'Good for heart health',
        'Boosts immune system'
      ]
    },
    {
      id: 77,
      name: 'Zucchini',
      icon: '🥒',
      color: 'bg-green-100',
      description: 'Mild and versatile zucchini is a summer squash rich in nutrients.',
      vitamins: ['Vitamin C', 'Vitamin A', 'Potassium', 'Fiber'],
      diseases: ['Powdery Mildew', 'Bacterial Wilt', 'Squash Vine Borer'],
      cultivation: 'Zucchini needs fertile soil, full sun, and regular watering. Regular harvesting promotes production.',
      benefits: [
        'Low in calories',
        'Good for heart health',
        'Improves digestion',
        'Rich in antioxidants'
      ]
    },
    {
      id: 78,
      name: 'Pumpkin',
      icon: '🎃',
      color: 'bg-orange-100',
      description: 'Sweet and nutritious pumpkin is rich in vitamins and fiber.',
      vitamins: ['Vitamin A', 'Vitamin C', 'Potassium', 'Fiber'],
      diseases: ['Powdery Mildew', 'Downy Mildew', 'Fusarium Wilt'],
      cultivation: 'Pumpkins need fertile soil, full sun, and plenty of space. Regular watering is essential.',
      benefits: [
        'Good for eye health',
        'Supports immune system',
        'Improves digestion',
        'Rich in antioxidants'
      ]
    },
    {
      id: 79,
      name: 'Sweet Potato',
      icon: '🍠',
      color: 'bg-orange-100',
      description: 'Nutritious sweet potatoes are rich in beta-carotene and fiber.',
      vitamins: ['Vitamin A', 'Vitamin C', 'Potassium', 'Fiber'],
      diseases: ['Black Rot', 'Fusarium Wilt', 'Root Knot Nematode'],
      cultivation: 'Sweet potatoes need loose, well-drained soil and warm temperatures. Regular watering is important.',
      benefits: [
        'Good for eye health',
        'Supports immune system',
        'Improves digestion',
        'Rich in antioxidants'
      ]
    },
    {
      id: 44,
      name: 'Papaya',
      icon: '🥭',
      color: 'bg-orange-100',
      description: 'Sweet and tropical papaya is rich in digestive enzymes and vitamins.',
      vitamins: ['Vitamin C', 'Vitamin A', 'Folate', 'Potassium'],
      diseases: ['Papaya Ringspot Virus', 'Anthracnose', 'Powdery Mildew'],
      cultivation: 'Papaya needs well-drained soil, full sun, and protection from wind. Regular watering is essential.',
      benefits: [
        'Aids digestion',
        'Boosts immunity',
        'Good for skin health',
        'Rich in antioxidants'
      ]
    },
    {
      id: 45,
      name: 'Lychee',
      icon: '🍇',
      color: 'bg-red-100',
      description: 'Sweet and fragrant lychee is rich in vitamin C and antioxidants.',
      vitamins: ['Vitamin C', 'Copper', 'Potassium', 'Fiber'],
      diseases: ['Anthracnose', 'Fruit Rot', 'Dieback'],
      cultivation: 'Lychee needs well-drained soil, full sun, and protection from frost. Regular pruning is important.',
      benefits: [
        'Boosts immunity',
        'Supports heart health',
        'Rich in antioxidants',
        'Good for skin health'
      ]
    },
    {
      id: 46,
      name: 'Dragon Fruit',
      icon: '🥭',
      color: 'bg-pink-100',
      description: 'Exotic dragon fruit is rich in antioxidants and fiber.',
      vitamins: ['Vitamin C', 'Iron', 'Magnesium', 'Fiber'],
      diseases: ['Stem Rot', 'Anthracnose', 'Fruit Rot'],
      cultivation: 'Dragon fruit needs well-drained soil, full sun, and support structures. Regular pruning is essential.',
      benefits: [
        'Rich in antioxidants',
        'Improves digestion',
        'Supports immune system',
        'Good for heart health'
      ]
    },
    {
      id: 80,
      name: 'Beetroot',
      icon: '🥕',
      color: 'bg-red-100',
      description: 'Nutritious beetroot is rich in nitrates and antioxidants.',
      vitamins: ['Folate', 'Manganese', 'Potassium', 'Iron'],
      diseases: ['Cercospora Leaf Spot', 'Downy Mildew', 'Root Rot'],
      cultivation: 'Beetroot needs loose, well-drained soil and full sun. Regular thinning is important.',
      benefits: [
        'Supports heart health',
        'Improves blood pressure',
        'Rich in antioxidants',
        'Good for digestion'
      ]
    },
    {
      id: 81,
      name: 'Radish',
      icon: '🥕',
      color: 'bg-red-100',
      description: 'Crisp and peppery radishes are rich in vitamin C and fiber.',
      vitamins: ['Vitamin C', 'Potassium', 'Folate', 'Fiber'],
      diseases: ['Black Root', 'Downy Mildew', 'Clubroot'],
      cultivation: 'Radishes need loose, well-drained soil and full sun. Regular watering is essential.',
      benefits: [
        'Supports digestion',
        'Boosts immunity',
        'Good for heart health',
        'Low in calories'
      ]
    },
    {
      id: 82,
      name: 'Turnip',
      icon: '🥕',
      color: 'bg-white',
      description: 'Mild and nutritious turnips are rich in vitamins and minerals.',
      vitamins: ['Vitamin C', 'Fiber', 'Potassium', 'Calcium'],
      diseases: ['Clubroot', 'Downy Mildew', 'Black Rot'],
      cultivation: 'Turnips need fertile, well-drained soil and full sun. Regular watering is important.',
      benefits: [
        'Supports bone health',
        'Improves digestion',
        'Good for heart health',
        'Rich in nutrients'
      ]
    },
    {
      id: 83,
      name: 'Parsnip',
      icon: '🥕',
      color: 'bg-white',
      description: 'Sweet and nutty parsnips are rich in fiber and vitamins.',
      vitamins: ['Vitamin C', 'Folate', 'Potassium', 'Fiber'],
      diseases: ['Canker', 'Leaf Spot', 'Root Rot'],
      cultivation: 'Parsnips need deep, well-drained soil and full sun. Frost improves sweetness.',
      benefits: [
        'Supports digestion',
        'Good for heart health',
        'Rich in fiber',
        'Boosts immunity'
      ]
    },
    {
      id: 84,
      name: 'Celery',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Crisp and refreshing celery is rich in vitamins and minerals.',
      vitamins: ['Vitamin K', 'Vitamin A', 'Potassium', 'Folate'],
      diseases: ['Early Blight', 'Late Blight', 'Fusarium Wilt'],
      cultivation: 'Celery needs rich, moist soil and full sun. Regular watering is essential.',
      benefits: [
        'Supports hydration',
        'Good for digestion',
        'Rich in antioxidants',
        'Low in calories'
      ]
    },
    {
      id: 85,
      name: 'Asparagus',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Nutritious asparagus is rich in vitamins and antioxidants.',
      vitamins: ['Vitamin K', 'Folate', 'Vitamin A', 'Fiber'],
      diseases: ['Fusarium Crown Rot', 'Rust', 'Purple Spot'],
      cultivation: 'Asparagus needs well-drained soil, full sun, and patience. Regular weeding is important.',
      benefits: [
        'Supports digestion',
        'Good for heart health',
        'Rich in antioxidants',
        'Boosts immunity'
      ]
    },
    {
      id: 47,
      name: 'Passion Fruit',
      icon: '🍇',
      color: 'bg-purple-100',
      description: 'Tropical passion fruit is rich in antioxidants and fiber.',
      vitamins: ['Vitamin C', 'Vitamin A', 'Iron', 'Potassium'],
      diseases: ['Fusarium Wilt', 'Woodiness Virus', 'Brown Spot'],
      cultivation: 'Passion fruit needs well-drained soil, full sun, and support structures. Regular pruning is essential.',
      benefits: [
        'Rich in antioxidants',
        'Improves digestion',
        'Supports heart health',
        'Good for skin health'
      ]
    },
    {
      id: 48,
      name: 'Jackfruit',
      icon: '🥭',
      color: 'bg-yellow-100',
      description: 'Large and sweet jackfruit is rich in nutrients and fiber.',
      vitamins: ['Vitamin C', 'Potassium', 'Magnesium', 'Fiber'],
      diseases: ['Fruit Rot', 'Dieback', 'Leaf Spot'],
      cultivation: 'Jackfruit needs well-drained soil, full sun, and protection from wind. Regular pruning is important.',
      benefits: [
        'Rich in antioxidants',
        'Supports digestion',
        'Good for heart health',
        'Boosts immunity'
      ]
    },
    {
      id: 49,
      name: 'Custard Apple',
      icon: '🍎',
      color: 'bg-green-100',
      description: 'Sweet and creamy custard apple is rich in vitamins and minerals.',
      vitamins: ['Vitamin C', 'Potassium', 'Magnesium', 'Fiber'],
      diseases: ['Anthracnose', 'Fruit Rot', 'Dieback'],
      cultivation: 'Custard apple needs well-drained soil, full sun, and protection from frost. Regular pruning is essential.',
      benefits: [
        'Rich in antioxidants',
        'Supports heart health',
        'Good for digestion',
        'Boosts immunity'
      ]
    },
    {
      id: 50,
      name: 'Star Fruit',
      icon: '⭐',
      color: 'bg-yellow-100',
      description: 'Sweet and tangy star fruit is rich in vitamin C and antioxidants.',
      vitamins: ['Vitamin C', 'Fiber', 'Potassium', 'Antioxidants'],
      diseases: ['Anthracnose', 'Fruit Rot', 'Leaf Spot'],
      cultivation: 'Star fruit needs well-drained soil, full sun, and protection from wind. Regular pruning is important.',
      benefits: [
        'Rich in antioxidants',
        'Supports digestion',
        'Good for heart health',
        'Boosts immunity'
      ]
    },
    {
      id: 51,
      name: 'Persimmon',
      icon: '🍎',
      color: 'bg-orange-100',
      description: 'Sweet and flavorful persimmon is rich in vitamins and fiber.',
      vitamins: ['Vitamin A', 'Vitamin C', 'Manganese', 'Fiber'],
      diseases: ['Anthracnose', 'Leaf Spot', 'Fruit Rot'],
      cultivation: 'Persimmons need well-drained soil, full sun, and protection from frost. Regular pruning is essential.',
      benefits: [
        'Good for eye health',
        'Supports heart health',
        'Rich in antioxidants',
        'Improves digestion'
      ]
    },
    {
      id: 52,
      name: 'Fig',
      icon: '🍇',
      color: 'bg-purple-100',
      description: 'Sweet and nutritious figs are rich in fiber and minerals.',
      vitamins: ['Vitamin K', 'Potassium', 'Calcium', 'Fiber'],
      diseases: ['Fig Rust', 'Fruit Rot', 'Leaf Spot'],
      cultivation: 'Figs need well-drained soil, full sun, and protection from frost. Regular pruning is important.',
      benefits: [
        'Improves digestion',
        'Supports bone health',
        'Good for heart health',
        'Rich in fiber'
      ]
    },
    {
      id: 86,
      name: 'Artichoke',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Nutritious artichokes are rich in fiber and antioxidants.',
      vitamins: ['Vitamin C', 'Folate', 'Magnesium', 'Fiber'],
      diseases: ['Botrytis Rot', 'Powdery Mildew', 'Verticillium Wilt'],
      cultivation: 'Artichokes need fertile soil, full sun, and regular watering. Protection from frost is important.',
      benefits: [
        'Supports liver health',
        'Improves digestion',
        'Rich in antioxidants',
        'Good for heart health'
      ]
    },
    {
      id: 87,
      name: 'Brussels Sprouts',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Nutritious Brussels sprouts are rich in vitamins and fiber.',
      vitamins: ['Vitamin K', 'Vitamin C', 'Folate', 'Fiber'],
      diseases: ['Black Rot', 'Downy Mildew', 'Clubroot'],
      cultivation: 'Brussels sprouts need fertile soil, full sun, and consistent moisture. Frost improves flavor.',
      benefits: [
        'Rich in antioxidants',
        'Supports bone health',
        'Good for heart health',
        'Boosts immune system'
      ]
    },
    {
      id: 88,
      name: 'Green Beans',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Crisp and nutritious green beans are rich in vitamins and fiber.',
      vitamins: ['Vitamin K', 'Vitamin C', 'Folate', 'Fiber'],
      diseases: ['Anthracnose', 'Bacterial Blight', 'Rust'],
      cultivation: 'Green beans need well-drained soil, full sun, and support structures. Regular harvesting is important.',
      benefits: [
        'Supports bone health',
        'Good for heart health',
        'Rich in fiber',
        'Low in calories'
      ]
    },
    {
      id: 53,
      name: 'Date',
      icon: '🍇',
      color: 'bg-brown-100',
      description: 'Sweet and nutritious dates are rich in fiber and minerals.',
      vitamins: ['Potassium', 'Magnesium', 'Copper', 'Fiber'],
      diseases: ['Bayoud Disease', 'Fruit Rot', 'Leaf Spot'],
      cultivation: 'Dates need well-drained soil, full sun, and hot climate. Regular pruning is essential.',
      benefits: [
        'Natural energy source',
        'Supports digestion',
        'Good for bone health',
        'Rich in antioxidants'
      ]
    },
    {
      id: 54,
      name: 'Coconut',
      icon: '🥥',
      color: 'bg-brown-100',
      description: 'Versatile coconut is rich in healthy fats and minerals.',
      vitamins: ['Manganese', 'Copper', 'Iron', 'Fiber'],
      diseases: ['Bud Rot', 'Leaf Spot', 'Fruit Rot'],
      cultivation: 'Coconuts need sandy soil, full sun, and tropical climate. Regular watering is important.',
      benefits: [
        'Supports heart health',
        'Good for hydration',
        'Rich in healthy fats',
        'Boosts immunity'
      ]
    },
    {
      id: 55,
      name: 'Avocado',
      icon: '🥑',
      color: 'bg-green-100',
      description: 'Creamy and nutritious avocado is rich in healthy fats and vitamins.',
      vitamins: ['Vitamin K', 'Folate', 'Potassium', 'Healthy Fats'],
      diseases: ['Root Rot', 'Anthracnose', 'Scab'],
      cultivation: 'Avocados need well-drained soil, full sun, and protection from frost. Regular pruning is important.',
      benefits: [
        'Rich in healthy fats',
        'Supports heart health',
        'Good for skin health',
        'Improves digestion'
      ]
    },
    {
      id: 89,
      name: 'Peas',
      icon: '🫛',
      color: 'bg-green-100',
      description: 'Sweet and nutritious peas are rich in protein and fiber.',
      vitamins: ['Vitamin K', 'Vitamin C', 'Folate', 'Protein'],
      diseases: ['Powdery Mildew', 'Fusarium Wilt', 'Root Rot'],
      cultivation: 'Peas need well-drained soil, full sun, and support structures. Regular watering is essential.',
      benefits: [
        'Rich in protein',
        'Supports bone health',
        'Good for heart health',
        'Improves digestion'
      ]
    },
    {
      id: 90,
      name: 'Okra',
      icon: '🥬',
      color: 'bg-green-100',
      description: 'Nutritious okra is rich in fiber and vitamins.',
      vitamins: ['Vitamin K', 'Vitamin C', 'Folate', 'Fiber'],
      diseases: ['Fusarium Wilt', 'Powdery Mildew', 'Yellow Vein Mosaic'],
      cultivation: 'Okra needs well-drained soil, full sun, and warm temperatures. Regular harvesting is important.',
      benefits: [
        'Supports digestion',
        'Good for heart health',
        'Rich in antioxidants',
        'Boosts immunity'
      ]
    },
    {
      id: 91,
      name: 'Bitter Gourd',
      icon: '🥒',
      color: 'bg-green-100',
      description: 'Nutritious bitter gourd is known for its medicinal properties.',
      vitamins: ['Vitamin C', 'Vitamin A', 'Folate', 'Fiber'],
      diseases: ['Powdery Mildew', 'Fruit Fly', 'Downy Mildew'],
      cultivation: 'Bitter gourd needs well-drained soil, full sun, and support structures. Regular watering is essential.',
      benefits: [
        'Helps control blood sugar',
        'Rich in antioxidants',
        'Supports digestion',
        'Good for skin health'
      ]
    },
    {
      id: 92,
      name: 'Bottle Gourd',
      icon: '🥒',
      color: 'bg-green-100',
      description: 'Mild and nutritious bottle gourd is rich in water and fiber.',
      vitamins: ['Vitamin C', 'Calcium', 'Iron', 'Fiber'],
      diseases: ['Powdery Mildew', 'Fruit Fly', 'Downy Mildew'],
      cultivation: 'Bottle gourd needs well-drained soil, full sun, and support structures. Regular watering is essential.',
      benefits: [
        'Good for hydration',
        'Supports digestion',
        'Low in calories',
        'Rich in nutrients'
      ]
    },
    {
      id: 93,
      name: 'Ridge Gourd',
      icon: '🥒',
      color: 'bg-green-100',
      description: 'Nutritious ridge gourd is rich in fiber and vitamins.',
      vitamins: ['Vitamin C', 'Iron', 'Calcium', 'Fiber'],
      diseases: ['Powdery Mildew', 'Fruit Fly', 'Downy Mildew'],
      cultivation: 'Ridge gourd needs well-drained soil, full sun, and support structures. Regular watering is important.',
      benefits: [
        'Supports digestion',
        'Good for heart health',
        'Rich in fiber',
        'Low in calories'
      ]
    },
    {
      id: 94,
      name: 'Snake Gourd',
      icon: '🥒',
      color: 'bg-green-100',
      description: 'Nutritious snake gourd is rich in water and fiber.',
      vitamins: ['Vitamin C', 'Calcium', 'Iron', 'Fiber'],
      diseases: ['Powdery Mildew', 'Fruit Fly', 'Downy Mildew'],
      cultivation: 'Snake gourd needs well-drained soil, full sun, and support structures. Regular watering is essential.',
      benefits: [
        'Good for hydration',
        'Supports digestion',
        'Low in calories',
        'Rich in nutrients'
      ]
    }
  ];

  const tools = [
    { id: 1, name: 'Fertilizer calculator', icon: '🌱', Component: FertilizerCalculator, color: 'bg-green-50' },
    { id: 2, name: 'Pests & diseases', icon: '🐛', Component: PestsAndDiseases, color: 'bg-red-50' },
    { id: 3, name: 'Cultivation Tips', icon: '🌿', Component: CultivationTips, color: 'bg-blue-50' },
    { id: 4, name: 'Pests and Disease Alert', icon: '⚠️', Component: DiseaseAlert, color: 'bg-orange-50' },
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

  // Add debounce effect for search
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

  

      // Then, use Gemini API to get detailed analysis


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
          className="flex space-x-4 overflow-x-auto mb-4 px-4"
        >
          {selectedCrops.map((crop: CropItem) => (
            <motion.div
              key={crop.id}
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <button 
                onClick={() => {
                  const fruitInfo = crops.find(f => f.name === crop.name);
                  if (fruitInfo) {
                    setSelectedFruit(fruitInfo);
                  }
                }}
                className={`w-16 h-16 rounded-full ${crop.color} flex items-center justify-center text-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300`}
              >
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
            <button 
              onClick={() => setShowCropSelection(true)}
              className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl hover:bg-blue-600 transition-colors"
            >
              +
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Events Panel - Optimized */}
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
              onClick={() => setSelectedTool(tool.id)}
              className={`${tool.color} p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer`}
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

      {/* Crop Selection Popup */}
      {showCropSelection && (
        <CropSelectionPopup
          onClose={() => setShowCropSelection(false)}
          selectedCrops={selectedCrops}
          onSelect={(crop) => {
            if (selectedCrops.length < 8 && !selectedCrops.some(c => c.id === crop.id)) {
              setSelectedCrops(prev => [...prev, crop]);
              setShowCropSelection(false);
            }
          }}
          onRemove={(cropId) => {
            setSelectedCrops(prev => prev.filter(c => c.id !== cropId));
          }}
        />
      )}

      {/* Fruit Information Popup */}
      <AnimatePresence>
        {selectedFruit && (
          <FruitPopup 
            fruit={selectedFruit} 
            onClose={() => setSelectedFruit(null)} 
          />
        )}
      </AnimatePresence>

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

      {/* Add the camera capture UI */}
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

      {/* Add hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Home; 