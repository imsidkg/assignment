import { createContext, useContext, useReducer, useEffect } from 'react';

const ReadingContext = createContext(null);

const initialState = {
  fontSize: 16, // base font size in pixels
  preferences: {
    theme: 'light',
    lineHeight: 1.6,
  },
};

function readingReducer(state, action) {
  switch (action.type) {
    case 'SET_FONT_SIZE':
      const newState = {
        ...state,
        fontSize: action.payload,
      };
      // Save to localStorage
      localStorage.setItem('readingPreferences', JSON.stringify(newState));
      return newState;

    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

export function ReadingProvider({ children }) {
  const [state, dispatch] = useReducer(readingReducer, initialState);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('readingPreferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      dispatch({ type: 'SET_PREFERENCES', payload: preferences });
    }
  }, []);

  return (
    <ReadingContext.Provider value={{ state, dispatch }}>
      {children}
    </ReadingContext.Provider>
  );
}

export function useReading() {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return context;
}
