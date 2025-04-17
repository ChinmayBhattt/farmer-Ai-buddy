export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  description: string;
  category: string;
  publishedAt?: string;
  viewCount?: string;
}

export type VideoCategory = 
  | 'All Topics'
  | 'Global Warming'
  | 'Climate Change'
  | 'Biodiversity Loss'
  | 'Sea Level Rise'
  | 'Deforestation'; 