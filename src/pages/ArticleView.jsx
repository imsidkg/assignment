import React from 'react';
import { useParams } from 'react-router-dom';

export const ArticleView = () => {
  const { id } = useParams();
  
  // Fetch article data by id (mock or API)
  const article = { title: 'Tech Trends', content: 'Full article content...', lastEdited: '2023-09-25', readingTime: '5 mins' };

  return (
    <div className="article-view">
      <h1>{article.title}</h1>
      <p><i>Last edited on: {article.lastEdited}</i></p>
      <div>{article.content}</div>
      <button>Edit</button>
    </div>
  );
};
