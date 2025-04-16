import React, { useState, useEffect } from 'react';
import { fetchYouTubeVideos, YouTubeVideo } from '../services/youtubeApi';

const categories = [
  'Global Warming',
  'Glacial Melting',
  'Climate Change',
  'Ozone Layer Depletion',
  'Sea Level Rise',
  'Desertification',
  'Coral Reef Destruction',
  'Loss of Biodiversity',
  'E-waste Mismanagement',
  'Refugee Crisis',
  'Permafrost Thawing',
  'Antarctica Melting'
];

const GlobalIssuePodcast: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedVideos = await fetchYouTubeVideos(selectedCategory);
        setVideos(fetchedVideos);
      } catch (err: any) {
        console.error('Error in GlobalIssuePodcast:', err);
        setError(err.message || 'Failed to load videos');
        
        if (err.message.includes('quota exceeded') && retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 1000 * (retryCount + 1));
        }
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [selectedCategory, retryCount]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setRetryCount(0);
  };

  const formatViewCount = (viewCount: string) => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-6 px-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Environmental Issues</h2>
        {error && (
          <button
            onClick={() => setRetryCount(prev => prev + 1)}
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            Try Again
          </button>
        )}
      </div>
      
      {/* Category Filter Bar */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={loading}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-red-500 mt-2">
            {error.includes('API key') ? 
              'Please check your YouTube API key configuration.' :
              error.includes('quota') ?
              'The YouTube API quota has been exceeded. Please try again later.' :
              'Please try again or select a different category.'}
          </p>
        </div>
      )}

      {/* Video List */}
      {loading ? (
        <div className="relative">
          <div className="flex overflow-x-auto -mx-4 px-4 gap-4 pb-4 scrollbar-hide">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex-none w-80">
                <div className="aspect-video bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ) : !error && videos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No videos found for "{selectedCategory}"</p>
          <p className="text-sm text-gray-400 mt-2">Try selecting a different category</p>
        </div>
      ) : !error && (
        <div className="relative">
          <div className="flex overflow-x-auto -mx-4 px-4 gap-4 pb-4 scrollbar-hide">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-none w-80 group"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 text-gray-800 group-hover:text-blue-600 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {video.channelTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatViewCount(video.viewCount || '0')}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GlobalIssuePodcast; 