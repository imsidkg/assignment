import React, { useState, useEffect } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import SearchBar from '../components/SearchBar'

// ArticleFilter is now a local component
const ArticleFilter = () => {
    return (
      <div>
        <h3>Filter Articles</h3>
        {/* Implement filtering logic here (e.g., category dropdown) */}
      </div>
    );
};

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    // Fetch articles (mock API or local data)
    const mockArticles = [
      { id: 1, title: 'Tech Trends', excerpt: 'Latest in tech...', category: 'Technology', thumbnail: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Business Strategies', excerpt: 'How to grow your business...', category: 'Business', thumbnail: 'https://via.placeholder.com/150' },
      // Add more mock data
    ];
    setArticles(mockArticles);
  }, []);
  
  return (
    <div>
      <SearchBar />
      <ArticleFilter />
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};
