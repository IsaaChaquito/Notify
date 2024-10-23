
import { useContext } from 'react';
import { AppContext } from './app-provider'; 

export const useProvider = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context; 
};
