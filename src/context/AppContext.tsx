import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  avatar?: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface AppState {
  user: User | null;
  notifications: Notification[];
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Sarah Chen',
    company: 'TechSolutions Ltd',
    email: 'sarah.chen@techsolutions.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  notifications: [
    {
      id: '1',
      message: 'New tender matching your criteria: Smart City Infrastructure',
      type: 'info',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: '2',
      message: 'Proposal submitted successfully for Project Alpha',
      type: 'success',
      timestamp: new Date(Date.now() - 7200000),
      read: false
    }
  ],
  sidebarCollapsed: false,
  theme: 'light'
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [action.payload, ...state.notifications] 
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        )
      };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export type { User, Notification, AppState, AppAction };