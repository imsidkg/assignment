import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ArticleList } from './pages/ArticleList';
import { ArticleView } from './pages/ArticleView';
import {ArticleCreate} from './pages/ArticleCreate'
import { Navigation } from './components/Navigation';
import './App.css';

function App() {
  return (
 
    <Router>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleView />} />
          <Route path="/new" element={<ArticleCreate />} />
        </Routes>
      </div>
    </Router>
 
  );
}

export default App;
