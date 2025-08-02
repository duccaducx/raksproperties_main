import React from 'react';
import NewHomePage from '@/components/NewHomePage';
import { AppProvider } from '@/contexts/AppContext';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <NewHomePage />
    </AppProvider>
  );
};

export default Index;