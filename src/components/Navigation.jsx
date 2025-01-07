
import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => (
  <nav className="navbar">
    <Link to="/">ArticleHub</Link>
    <Link to="/new">Create Article</Link>
  </nav>
);
