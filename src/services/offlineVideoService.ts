import { Video, VideoCategory } from '../types/video';

// Predefined offline videos with obfuscated IDs
const OFFLINE_VIDEOS: Video[] = [
  {
    id: btoa('global-warming-1'),
    title: 'Understanding Global Warming: A Comprehensive Guide',
    thumbnail: '/assets/thumbnails/global-warming-1.jpg',
    channelTitle: 'Environmental Education',
    publishedAt: '2024-01-15T00:00:00Z',
    description: 'A detailed exploration of global warming causes and effects',
    viewCount: '150000',
    category: 'Global Warming'
  },
  {
    id: btoa('climate-change-1'),
    title: 'Climate Change: The Science Behind Earth\'s Changes',
    thumbnail: '/assets/thumbnails/climate-change-1.jpg',
    channelTitle: 'Earth Sciences',
    publishedAt: '2024-01-20T00:00:00Z',
    description: 'Understanding climate change through scientific evidence',
    viewCount: '200000',
    category: 'Climate Change'
  },
  {
    id: btoa('biodiversity-1'),
    title: 'Biodiversity Loss: A Crisis in the Making',
    thumbnail: '/assets/thumbnails/biodiversity-1.jpg',
    channelTitle: 'Nature Studies',
    publishedAt: '2024-02-01T00:00:00Z',
    description: 'Exploring the impact of biodiversity loss on ecosystems',
    viewCount: '120000',
    category: 'Biodiversity Loss'
  },
  {
    id: btoa('sea-level-1'),
    title: 'Rising Seas: Coastal Communities at Risk',
    thumbnail: '/assets/thumbnails/sea-level-1.jpg',
    channelTitle: 'Ocean Sciences',
    publishedAt: '2024-02-10T00:00:00Z',
    description: 'Understanding sea level rise and its implications',
    viewCount: '180000',
    category: 'Sea Level Rise'
  },
  {
    id: btoa('deforestation-1'),
    title: 'Deforestation: The Impact on Our Planet',
    thumbnail: '/assets/thumbnails/deforestation-1.jpg',
    channelTitle: 'Forest Conservation',
    publishedAt: '2024-02-15T00:00:00Z',
    description: 'Examining the causes and effects of deforestation',
    viewCount: '160000',
    category: 'Deforestation'
  }
];

// Function to get offline video URL
export const getOfflineVideoUrl = (videoId: string): string => {
  try {
    // Decode the ID and construct the offline video URL
    const decodedId = atob(videoId);
    return `/assets/videos/${decodedId}.mp4`;
  } catch {
    return '';
  }
};

// Function to get offline videos by category
export const getOfflineVideos = (category: VideoCategory): Video[] => {
  if (category === 'All Topics') {
    return OFFLINE_VIDEOS;
  }
  return OFFLINE_VIDEOS.filter(video => video.category === category);
};

// Function to check if a video exists offline
export const isVideoAvailableOffline = (videoId: string): boolean => {
  try {
    const decodedId = atob(videoId);
    return OFFLINE_VIDEOS.some(video => atob(video.id) === decodedId);
  } catch {
    return false;
  }
}; 