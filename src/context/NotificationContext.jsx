import { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext(null);

const initialState = {
  notifications: []
};

function notificationReducer(state, action) {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };

    default:
      return state;
  }
}

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id, message, type }
    });

    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ state, dispatch, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
