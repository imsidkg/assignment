import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticleProvider } from './context/ArticleContext';
import { Navigation } from './components/layout/Navigation';
import { ArticleList } from './components/articles/ArticleList';
import { ArticleForm } from './components/articles/ArticleForm';
import { ArticleDetail } from './components/articles/ArticleDetail';
import './App.css';
import { ReadingProvider } from './context/ReadingContext';
import { NotificationProvider } from './context/NotificationContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { Notification } from './components/common/Notification';
import { BookmarkList } from './components/bookmarks/BookmarkList';

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <ArticleProvider>
          <BookmarkProvider>
            <ReadingProvider>
              <div className="app-container">
                <Navigation />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<ArticleList />} />
                    <Route path="/new" element={<ArticleForm />} />
                    <Route path="/edit/:id" element={<ArticleForm />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                    <Route path="/bookmarks" element={<BookmarkList />} />
                  </Routes>
                </main>
                <Notification />
            
              </div>
            </ReadingProvider>
          </BookmarkProvider>
        </ArticleProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
