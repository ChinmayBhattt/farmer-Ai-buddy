import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import NewsCard from './NewsCard';
import PostCard from './PostCard';

// API Configuration - Store these in .env in production
const NEWS_API_KEY = "214dd7948c3c40d2aed19e83dd85b49c";
const NASA_API_KEY = "87345ui3i45y7p3tfg34g";
const GNEWS_API_KEY = "fec47d5ece60d00f0789fe9cd1dab73d";

// Update template posts with better content
const templatePosts = [
  {
    image: 'https://picsum.photos/seed/organic/400/300',
    title: 'New Organic Fertilizer Launch: Game-Changer for Small Farmers',
    description: 'Government announces 50% subsidy on organic fertilizers to promote sustainable farming practices. Small-scale farmers can now access premium quality fertilizers at affordable rates.',
    timestamp: '1h ago',
    source: 'AgriNews',
    author: 'Rajesh Kumar',
    likes: 24,
    comments: 8
  },
  {
    image: 'https://picsum.photos/seed/weather/400/300',
    title: 'Weather Alert: Prepare Your Crops for Upcoming Monsoon',
    description: 'Meteorological Department predicts heavy rainfall next week. Expert tips on protecting your crops and maximizing yield during monsoon season.',
    timestamp: '2h ago',
    source: 'FarmersDaily',
    author: 'Dr. Sarah Chen',
    likes: 156,
    comments: 32
  },
  {
    image: 'https://picsum.photos/seed/tech/400/300',
    title: 'Smart Farming Technology: AI-Powered Pest Detection',
    description: 'Revolutionary new app helps farmers identify crop diseases and pests using smartphone cameras. Early detection can save up to 40% of crop loss.',
    timestamp: '3h ago',
    source: 'AgriTech Weekly',
    author: 'Tech Team',
    likes: 89,
    comments: 15
  }
];

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface CropFilter {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const cropFilters: CropFilter[] = [
  { id: 'cabbage', name: 'Cabbage', icon: '🥬', color: 'bg-green-100' },
  { id: 'bean', name: 'Bean', icon: '🫘', color: 'bg-yellow-100' },
  { id: 'apple', name: 'Apple', icon: '🍎', color: 'bg-red-100' },
  { id: 'rice', name: 'Rice', icon: '🌾', color: 'bg-yellow-50' },
  { id: 'tomato', name: 'Tomato', icon: '🍅', color: 'bg-red-100' },
  { id: 'carrot', name: 'Carrot', icon: '🥕', color: 'bg-orange-100' },
];

const navigationItems = [
  { icon: '🏠', label: 'Your crops', path: '/' },
  { icon: '👥', label: 'Community', path: '/community' },
  { icon: '📅', label: 'Events', path: '/events' },
  { icon: '👤', label: 'You', path: '/profile' }
];

const CommunityPage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [showTemplates, setShowTemplates] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (reset = false) => {
    if (reset) {
      setPage(1);
      setNewsArticles([]);
    }

    try {
      setIsLoading(true);
      const searchTerm = selectedCrop 
        ? `${selectedCrop} farming agriculture crops`
        : 'sustainable farming agriculture environmental';

      // Fetch from multiple APIs in parallel
      const [newsResponse, gnewsResponse] = await Promise.all([
        axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: searchTerm,
            sortBy: 'publishedAt',
            apiKey: NEWS_API_KEY,
            page: reset ? 1 : page,
            pageSize: 10,
            language: 'en'
          }
        }).catch(error => ({ data: { articles: [] } })), // Fallback to empty array on error
        axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: searchTerm,
            token: GNEWS_API_KEY,
            max: 5,
            lang: 'en'
          }
        }).catch(error => ({ data: { articles: [] } })) // Fallback to empty array on error
      ]);

      const combinedNews = [
        ...(reset ? [] : newsArticles),
        ...(newsResponse.data.articles || []),
        ...(gnewsResponse.data.articles || [])
      ]
        .filter(article => article && article.title)
        .filter((article, index, self) => 
          index === self.findIndex((t) => t.title === article.title)
        );

      if (combinedNews.length > 0) {
        setNewsArticles(combinedNews);
        setShowTemplates(false);
      } else {
        setShowTemplates(true); // Show templates if no news articles
      }
      
      setHasMore(combinedNews.length < (newsResponse.data.totalResults || 0));
      setHasError(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setHasError(true);
      setShowTemplates(true); // Show templates on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Always show template posts first
    setShowTemplates(true);
    
    // Fetch real data after a short delay
    const timer = setTimeout(() => {
      fetchNews(true);
    }, 1000); // Reduced to 1 second for better UX

    return () => clearTimeout(timer);
  }, [selectedCrop]);

  const loadMore = () => {
    setPage(prev => prev + 1);
    fetchNews();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search community posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Crop Filters */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600">Filter by Crop</h2>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {cropFilters.map((crop) => (
              <motion.button
                key={crop.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCrop(selectedCrop === crop.id ? null : crop.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                  selectedCrop === crop.id
                    ? 'bg-green-500 text-white shadow-md'
                    : `${crop.color} text-gray-700 hover:shadow-sm`
                }`}
              >
                <span>{crop.icon}</span>
                <span className="whitespace-nowrap">{crop.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 pb-24">
        <div className="space-y-4">
          {/* Always show template posts while loading */}
          {(showTemplates || (isLoading && newsArticles.length === 0)) && (
            <>
              {templatePosts.map((post, index) => (
                <PostCard key={`template-${index}`} {...post} />
              ))}
            </>
          )}

          {/* Show real news articles when available */}
          {!showTemplates && newsArticles.length > 0 && (
            <>
              {newsArticles.map((article, index) => (
                <NewsCard key={`news-${index}`} article={article} />
              ))}
              {hasMore && (
                <div className="text-center py-4">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Show error state only if both templates and news failed */}
          {hasError && !showTemplates && newsArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Unable to load news. Please try again.</p>
              <button
                onClick={() => fetchNews(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-between items-center px-6 py-3 z-50"
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
                item.path === '/community' ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              {item.icon}
            </motion.div>
            <span className={`text-[10px] mt-1 ${
              item.path === '/community' ? 'text-blue-400 font-medium' : 'text-gray-400'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default CommunityPage; 