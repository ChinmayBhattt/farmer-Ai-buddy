import React from 'react';
import { motion } from 'framer-motion';

interface PostCardProps {
  image: string;
  title: string;
  description: string;
  timestamp: string;
  source: string;
  author?: string;
  likes?: number;
  comments?: number;
  url?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  image,
  title,
  description,
  timestamp,
  source,
  author,
  likes = 0,
  comments = 0,
  url
}) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image || fallbackImage}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full shadow-lg">
            Community Post
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
            {author ? author[0].toUpperCase() : '👨‍🌾'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{author || 'Farmer Community'}</p>
            <p className="text-xs text-gray-500">{timestamp} • {source}</p>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <span className="text-lg">👍</span>
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <span className="text-lg">💬</span>
              <span className="text-sm">{comments}</span>
            </button>
          </div>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm hover:underline flex items-center gap-1 group"
            >
              Read more
              <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard; 