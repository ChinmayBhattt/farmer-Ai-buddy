export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  description?: string;
  viewCount?: string;
  category: string;
}

export type VideoCategory = 
  | 'All Topics'
  | 'Global Warming'
  | 'Climate Change'
  | 'Biodiversity Loss'
  | 'Sea Level Rise'
  | 'Deforestation'; 