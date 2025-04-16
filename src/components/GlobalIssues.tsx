import React, { useState, useEffect } from 'react';
import { fetchYouTubeVideos } from '../services/youtubeApi';
import { getOfflineVideos } from '../services/offlineVideoService';
import { networkService } from '../services/networkService';
import VideoPlayer from './VideoPlayer';
import { Loader2, Wifi, WifiOff } from 'lucide-react';
import { Video, VideoCategory } from '../types/video';

const categories: VideoCategory[] = [
  'All Topics',
  'Global Warming',
  'Climate Change',
  'Biodiversity Loss',
  'Sea Level Rise',
  'Deforestation',
];

const GlobalIssues: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('All Topics');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isOnline, setIsOnline] = useState(networkService.isOnline());

  useEffect(() => {
    const unsubscribe = networkService.subscribe(setIsOnline);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        let fetchedVideos: Video[];
        
        if (isOnline) {
          const youtubeVideos = await fetchYouTubeVideos(selectedCategory);
          fetchedVideos = youtubeVideos.map(video => ({
            ...video,
            category: selectedCategory
          }));
        } else {
          fetchedVideos = getOfflineVideos(selectedCategory);
        }
        
        setVideos(fetchedVideos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load videos');
        // If online fetch fails, fall back to offline videos
        if (isOnline) {
          const offlineVideos = getOfflineVideos(selectedCategory);
          setVideos(offlineVideos);
          setError('Failed to load online videos. Showing offline content.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [selectedCategory, isOnline]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-center flex-1">Global Issue Podcast</h2>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center text-green-600 gap-1">
              <Wifi size={20} />
              <span className="text-sm">Online</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600 gap-1">
              <WifiOff size={20} />
              <span className="text-sm">Offline</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden">
            <div className="p-4 flex justify-between items-center bg-gray-800">
              <h3 className="text-white text-lg font-medium">{selectedVideo.title}</h3>
              <button
                onClick={handleClosePlayer}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <VideoPlayer
              url={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
              videoId={selectedVideo.id}
              title={selectedVideo.title}
              onClose={handleClosePlayer}
            />
          </div>
        </div>
      )}

      {/* Video Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {video.channelTitle} • {new Date(video.publishedAt).toLocaleDateString()}
                </p>
                {video.viewCount && (
                  <p className="text-sm text-gray-500 mt-1">
                    {parseInt(video.viewCount).toLocaleString()} views
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalIssues; 