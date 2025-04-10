import { FC, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

// Fallback data to ensure content is always shown
const FALLBACK_NEWS = [
  {
    id: 'fallback-1',
    title: 'Global Climate Crisis: Arctic Ice Melting at Unprecedented Rate',
    description: 'Scientists warn that Arctic ice is melting 95% faster than previous models predicted, threatening coastal communities and wildlife. Immediate action required to prevent irreversible damage.',
    url: 'https://example.com/climate-crisis',
    image: 'https://picsum.photos/seed/arctic/400/300',
    publishedAt: new Date().toISOString(),
    source: { name: 'Environmental Watch' }
  },
  {
    id: 'fallback-2',
    title: 'Breakthrough in Sustainable Agriculture: New Drought-Resistant Crops',
    description: 'Revolutionary genetic research leads to development of crops that require 60% less water while maintaining yield. Could be game-changer for farming in drought-prone regions.',
    url: 'https://example.com/sustainable-farming',
    image: 'https://picsum.photos/seed/farming/400/300',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    source: { name: 'AgriTech Today' }
  },
  {
    id: 'fallback-3',
    title: 'Amazon Rainforest: Critical Tipping Point Reached',
    description: 'Latest satellite data reveals unprecedented deforestation rates. Experts warn of potential collapse of rain patterns affecting global agriculture.',
    url: 'https://example.com/amazon-crisis',
    image: 'https://picsum.photos/seed/amazon/400/300',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: 'Forest Alert' }
  }
];

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const Community: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(FALLBACK_NEWS); // Initialize with fallback data
  const [activeFilter, setActiveFilter] = useState('all');
  const [retryCount, setRetryCount] = useState(0);

  const cropFilters = [
    { name: 'Climate', icon: '🌡️', query: 'climate crisis melting ice' },
    { name: 'Agriculture', icon: '🌾', query: 'sustainable farming drought' },
    { name: 'Environment', icon: '🌍', query: 'environmental disaster pollution' },
    { name: 'Water', icon: '💧', query: 'water crisis shortage pollution' },
  ];

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const query = activeFilter === 'all' 
        ? 'climate crisis OR environmental disaster OR water shortage'
        : cropFilters.find(f => f.name.toLowerCase() === activeFilter)?.query || '';

      const [newsApiResponse, gNewsResponse] = await Promise.allSettled([
        axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: query,
            sortBy: 'publishedAt',
            language: 'en',
            pageSize: 15,
            apiKey: NEWS_API_KEY
          }
        }),
        axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: query,
            lang: 'en',
            max: 15,
            token: GNEWS_API_KEY
          }
        })
      ]);

      let articles: any[] = [];

      if (newsApiResponse.status === 'fulfilled') {
        articles = [...articles, ...(newsApiResponse.value.data.articles || [])];
      }
      if (gNewsResponse.status === 'fulfilled') {
        articles = [...articles, ...(gNewsResponse.value.data.articles || [])];
      }

      if (articles.length > 0) {
        const processedNews = articles
          .filter(article => article.title && article.description)
          .map((article, index) => ({
            id: article.url || `news-${index}`,
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.image || article.urlToImage || `https://picsum.photos/seed/${index}/400/300`,
            publishedAt: article.publishedAt,
            source: article.source
          }));

        setNewsItems(processedNews);
        setRetryCount(0);
      } else if (retryCount < 3) {
        // Retry up to 3 times if no articles are found
        setRetryCount(prev => prev + 1);
        setTimeout(fetchNews, 2000);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Keep showing fallback content if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [activeFilter]);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Search Header */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search environmental crisis news"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button className="p-2 rounded-full bg-red-50">
            <BellIcon className="h-6 w-6 text-red-600" />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">Critical Issues</h2>
            <button 
              onClick={() => setActiveFilter('all')}
              className="text-red-600 text-sm hover:text-red-700"
            >
              Show All
            </button>
          </div>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {cropFilters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name.toLowerCase())}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border whitespace-nowrap transition-colors
                  ${activeFilter === filter.name.toLowerCase()
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <span className="text-xl">{filter.icon}</span>
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-red-100 rounded-full p-2">
                  <span className="text-red-600 text-sm font-medium">{item.source.name}</span>
                </div>
                <span className="text-sm text-gray-500">{getTimeAgo(item.publishedAt)}</span>
              </div>

              <h3 className="font-medium text-lg mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

              {item.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/seed/${item.id}/400/300`;
                    }}
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                    <span>⚠️</span>
                    <span>Critical</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                    <span>📢</span>
                    <span>Share Alert</span>
                  </button>
                </div>
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Read Full Report →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community; 