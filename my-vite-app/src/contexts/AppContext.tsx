import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: true,
  toggleSidebar: () => {},
  currentView: 'dashboard',
  setCurrentView: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};