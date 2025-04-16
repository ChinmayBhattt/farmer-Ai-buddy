import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  description?: string;
  viewCount?: string;
}

interface YouTubeVideoDetails {
  id: string;
  statistics?: {
    viewCount?: string;
  };
}

const getSearchQuery = (category: string): string => {
  if (category === 'All Topics') {
    return '(Global Warming OR Glacial Melting OR Climate Change OR Ozone Layer OR ' +
           'Sea Level Rise OR Desertification OR Coral Reef OR Biodiversity Loss OR ' +
           'E-waste OR Environmental Refugee OR Permafrost OR Antarctica) ' +
           '(documentary OR educational OR explained OR crisis)';
  }
  return `${category} (documentary OR educational OR explained OR effects OR crisis OR impact)`;
};

export const fetchYouTubeVideos = async (category: string): Promise<YouTubeVideo[]> => {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is missing. Please check your environment variables.');
  }

  try {
    const searchParams = {
      part: 'snippet',
      q: getSearchQuery(category),
      type: 'video',
      maxResults: 15,
      key: YOUTUBE_API_KEY,
      order: 'relevance',
      relevanceLanguage: 'en',
      videoDuration: 'long',
      hl: 'en',
    };

    const searchResponse = await axios.get(`${YOUTUBE_API_URL}/search`, { params: searchParams });

    if (!searchResponse.data?.items?.length) {
      return [];
    }

    const videoIds = searchResponse.data.items.map((item: any) => item.id.videoId).join(',');
    const videoParams = {
      part: 'statistics,snippet',
      id: videoIds,
      key: YOUTUBE_API_KEY,
    };

    const videoResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, { params: videoParams });
    const videoDetails = new Map<string, YouTubeVideoDetails>(
      videoResponse.data.items.map((item: YouTubeVideoDetails) => [item.id, item])
    );

    return searchResponse.data.items
      .map((item: any) => {
        const details = videoDetails.get(item.id.videoId);
        if (!item.id?.videoId || !item.snippet) return null;

        return {
          id: item.id.videoId,
          title: item.snippet.title || 'Untitled',
          thumbnail: item.snippet.thumbnails?.maxres?.url || 
                    item.snippet.thumbnails?.high?.url || 
                    item.snippet.thumbnails?.medium?.url || '',
          channelTitle: item.snippet.channelTitle || 'Unknown Channel',
          publishedAt: item.snippet.publishedAt || new Date().toISOString(),
          description: item.snippet.description || '',
          viewCount: details?.statistics?.viewCount || '0',
        };
      })
      .filter(Boolean);
  } catch (error: any) {
    console.error('YouTube API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response?.status === 403) {
      throw new Error('YouTube API key is invalid or has insufficient permissions');
    }

    if (error.response?.status === 429) {
      throw new Error('YouTube API quota exceeded. Please try again later');
    }

    throw new Error(
      error.response?.data?.error?.message || 
      error.message || 
      'Failed to fetch videos from YouTube'
    );
  }
}; 