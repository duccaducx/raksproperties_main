import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';

const AppLayout: React.FC = () => {
  const { sidebarOpen } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <TopBar sidebarOpen={sidebarOpen} />
      
      <main className={`transition-all duration-300 pt-16 ${
        sidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        <Dashboard />
      </main>
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default AppLayout;