export const eventBanners = {
  hackathon: {
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
    title: 'Hackathon'
  },
  workshop: {
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80',
    title: 'Workshop'
  },
  conference: {
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
    title: 'Conference'
  },
  competition: {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    title: 'Competition'
  },
  meetup: {
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    title: 'Meetup'
  }
};

export const getRandomBanner = () => {
  const banners = Object.values(eventBanners);
  return banners[Math.floor(Math.random() * banners.length)].url;
}; 