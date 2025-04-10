import React from 'react';
import { motion } from 'framer-motion';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
  const fallbackImage = 'https://picsum.photos/400/300';
  const formattedDate = new Date(article.publishedAt).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'short'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={article.urlToImage || fallbackImage}
          alt={article.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg">
            News Update
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">
            📰
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{article.source.name}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.description}
        </p>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <span className="text-lg">🔖</span>
              <span className="text-sm">Save</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
              <span className="text-lg">↗️</span>
              <span className="text-sm">Share</span>
            </button>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            Read More
            <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard; 