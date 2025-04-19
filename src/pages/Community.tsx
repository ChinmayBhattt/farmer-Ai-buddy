import { FC, useEffect, useState, useRef, useCallback } from 'react';
import { MagnifyingGlassIcon, BellIcon, BellSlashIcon } from '@heroicons/react/24/outline';
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
  const [newsItems, setNewsItems] = useState<NewsItem[]>(FALLBACK_NEWS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showNotifyMenu, setShowNotifyMenu] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const notifyMenuRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastNewsElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const environmentalIssues = [
    { name: 'Global Warming', icon: '🌡️', query: 'global warming climate crisis temperature rise' },
    { name: 'Glacial Melting', icon: '🧊', query: 'glacier melting ice caps arctic antarctic' },
    { name: 'Climate Change', icon: '🌍', query: 'climate change extreme weather natural disasters' },
    { name: 'Ozone Layer', icon: '☀️', query: 'ozone layer depletion UV radiation' },
    { name: 'Sea Level Rise', icon: '🌊', query: 'sea level rise coastal flooding islands' },
    { name: 'Desertification', icon: '🏜️', query: 'desertification land degradation drought' },
    { name: 'Coral Reefs', icon: '🐠', query: 'coral reef bleaching ocean acidification marine' },
    { name: 'Biodiversity', icon: '🦋', query: 'biodiversity loss species extinction wildlife' },
    { name: 'E-waste', icon: '🔌', query: 'electronic waste e-waste recycling pollution' },
    { name: 'Refugee Crisis', icon: '🏃', query: 'climate refugees environmental migration displacement' },
    { name: 'Permafrost', icon: '❄️', query: 'permafrost thawing methane release arctic' },
    { name: 'Antarctica', icon: '🧊', query: 'antarctica melting ice shelf glacier collapse' }
  ];

  const fetchNews = async (pageNumber: number) => {
    try {
      setLoading(true);
      const selectedIssue = environmentalIssues.find(issue => 
        issue.name.toLowerCase() === activeFilter.toLowerCase()
      );
      
      let query = activeFilter === 'all' 
        ? 'environmental crisis OR climate change OR global warming'
        : selectedIssue?.query || '';

      // Add search query if it exists
      if (searchQuery.trim()) {
        query = `${query} AND ${searchQuery}`;
      }

      const [newsApiResponse, gNewsResponse] = await Promise.allSettled([
        axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: query,
            sortBy: 'publishedAt',
            language: 'en',
            pageSize: 10,
            page: pageNumber,
            apiKey: NEWS_API_KEY
          }
        }),
        axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: query,
            lang: 'en',
            max: 10,
            page: pageNumber,
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
            id: article.url || `news-${pageNumber}-${index}`,
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.image || article.urlToImage || `https://picsum.photos/seed/${pageNumber}-${index}/400/300`,
            publishedAt: article.publishedAt,
            source: article.source
          }));

        setNewsItems(prev => pageNumber === 1 ? processedNews : [...prev, ...processedNews]);
        setHasMore(articles.length >= 10);
        setRetryCount(0);
      } else {
        setHasMore(false);
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchNews(pageNumber), 2000);
        }
      }
    } catch (err: unknown) {
      console.error('Failed to fetch news:', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setNewsItems([]);
    setHasMore(true);
    fetchNews(1);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchNews(page);
    }
  }, [page]);

  // Handle click outside notification menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifyMenuRef.current && !notifyMenuRef.current.contains(event.target as Node)) {
        setShowNotifyMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  // Toggle notifications
  const toggleNotifications = async (enable: boolean) => {
    if (enable) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setNotificationsEnabled(true);
        showNotification('Notifications Enabled', 'You will now receive notifications for new environmental updates.');
      }
    } else {
      setNotificationsEnabled(false);
      showNotification('Notifications Disabled', 'You will no longer receive notifications.');
    }
    setShowNotifyMenu(false);
  };

  // Show notification
  const showNotification = (title: string, body: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico', // Make sure to add your app icon
        badge: '/favicon.ico',
        tag: 'environmental-update'
      });
    }
  };

  // Notify about new posts
  useEffect(() => {
    if (notificationsEnabled && newsItems.length > 0) {
      const latestPost = newsItems[0];
      showNotification(
        'New Environmental Update',
        latestPost.title
      );
    }
  }, [newsItems, notificationsEnabled]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative" ref={notifyMenuRef}>
            <button 
              onClick={() => setShowNotifyMenu(!showNotifyMenu)}
              className={`p-2 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {notificationsEnabled ? (
                <BellIcon className="h-6 w-6 text-green-600" />
              ) : (
                <BellSlashIcon className="h-6 w-6 text-gray-400" />
              )}
            </button>

            {/* Notification Menu */}
            {showNotifyMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                <button
                  onClick={() => toggleNotifications(true)}
                  className={`flex items-center px-4 py-2 text-sm w-full hover:bg-gray-50 ${
                    notificationsEnabled ? 'text-green-600' : 'text-gray-700'
                  }`}
                >
                  <BellIcon className="h-5 w-5 mr-2" />
                  Notify All
                </button>
                <button
                  onClick={() => toggleNotifications(false)}
                  className={`flex items-center px-4 py-2 text-sm w-full hover:bg-gray-50 ${
                    !notificationsEnabled ? 'text-red-600' : 'text-gray-700'
                  }`}
                >
                  <BellSlashIcon className="h-5 w-5 mr-2" />
                  Notify Off
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">Environmental Issues</h2>
            <button 
              onClick={() => setActiveFilter('all')}
              className="text-green-600 text-sm hover:text-green-700"
            >
              Show All
            </button>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {environmentalIssues.map((issue) => (
              <button
                key={issue.name}
                onClick={() => setActiveFilter(issue.name.toLowerCase())}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all
                  ${activeFilter === issue.name.toLowerCase()
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <span className="text-xl">{issue.icon}</span>
                <span className="text-sm font-medium">{issue.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <div 
              key={item.id} 
              ref={index === newsItems.length - 1 ? lastNewsElementRef : undefined}
              className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
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
          {loading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          )}
          {!hasMore && newsItems.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              No more posts to load
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community; 