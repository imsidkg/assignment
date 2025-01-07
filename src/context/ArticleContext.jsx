import { createContext, useContext, useReducer } from 'react';

const initialState = {
  articles: [],
  bookmarks: [],
  filters: {
    category: null,
    searchTerm: '',
    sortBy: 'date'
  }
};

function articleReducer(state, action) {
  switch (action.type) {
    case 'ADD_ARTICLE':
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };
    
    case 'UPDATE_ARTICLE':
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.payload.id ? action.payload : article
        )
      };
    
    case 'TOGGLE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.includes(action.payload)
          ? state.bookmarks.filter(id => id !== action.payload)
          : [...state.bookmarks, action.payload]
      };
    
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    
    default:
      return state;
  }
}

const ArticleContext = createContext(null);

export function ArticleProvider({ children }) {
  const [state, dispatch] = useReducer(articleReducer, initialState);

  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
}

// Helper functions for common article operations
export function useArticleActions() {
  const { dispatch } = useArticles();

  return {
    addArticle: (article) => {
      dispatch({ type: 'ADD_ARTICLE', payload: article });
    },
    updateArticle: (article) => {
      dispatch({ type: 'UPDATE_ARTICLE', payload: article });
    },
    toggleBookmark: (articleId) => {
      dispatch({ type: 'TOGGLE_BOOKMARK', payload: articleId });
    },
    updateFilters: (filters) => {
      dispatch({ type: 'UPDATE_FILTERS', payload: filters });
    }
  };
}
