import { Video } from '../types/video';
import { getFallbackVideos } from './fallbackVideos';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const fetchYouTubeVideos = async (category: string): Promise<Video[]> => {
  try {
    if (!API_KEY) {
      console.log('No API key found, using fallback videos');
      return getFallbackVideos(category);
    }

    const searchQuery = category === 'All Topics' 
      ? '(Global Warming OR Glacial Melting OR Climate Change OR Ozone Layer OR Sea Level Rise OR Desertification OR Coral Reef OR Biodiversity Loss OR E-waste OR Environmental Refugee OR Permafrost Thawing OR Antarctica) (documentary OR educational OR explained OR crisis)'
      : `${category} (documentary OR educational OR explained OR crisis)`;

    const response = await fetch(
      `${BASE_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`
    );

    if (!response.ok) {
      console.log('YouTube API error, using fallback videos');
      return getFallbackVideos(category);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.log('No videos found from API, using fallback videos');
      return getFallbackVideos(category);
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
      viewCount: '0', // View count not available in search endpoint
      category: category
    }));

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    console.log('Using fallback videos due to error');
    return getFallbackVideos(category);
  }
}; 