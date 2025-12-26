
import React from 'react';
import LandingPage from '@/components/LandingPage';
import { AppProvider } from '@/contexts/AppContext';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <LandingPage />
    </AppProvider>
  );
};

export default Index;
