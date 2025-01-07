import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const BookmarkContext = createContext(null);

const initialState = {
  bookmarks: [],
  loading: false,
  error: null
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'LOAD_BOOKMARKS':
      return {
        ...state,
        bookmarks: action.payload,
        loading: false
      };
    
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload]
      };
    
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(id => id !== action.payload)
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}

export function BookmarkProvider({ children }) {
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);
  const { showNotification } = useNotification();

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      dispatch({ 
        type: 'LOAD_BOOKMARKS', 
        payload: JSON.parse(savedBookmarks) 
      });
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  }, [state.bookmarks]);

  const toggleBookmark = (articleId) => {
    const isBookmarked = state.bookmarks.includes(articleId);
    
    if (isBookmarked) {
      dispatch({ type: 'REMOVE_BOOKMARK', payload: articleId });
      showNotification('Article removed from bookmarks', 'info');
    } else {
      dispatch({ type: 'ADD_BOOKMARK', payload: articleId });
      showNotification('Article added to bookmarks', 'success');
    }
  };

  return (
    <BookmarkContext.Provider value={{ state, dispatch, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
