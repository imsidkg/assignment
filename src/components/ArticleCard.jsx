import React from 'react';
import { Link } from 'react-router-dom';

export const ArticleCard = ({ article }) => (
  <div className="article-card">
    <img src={article.thumbnail} alt={article.title} />
    <h3>{article.title}</h3>
    <p>{article.excerpt}</p>
    <Link to={`/article/${article.id}`}>Read more</Link>
  </div>
);
