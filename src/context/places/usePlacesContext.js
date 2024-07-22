import { useContext } from 'react';
import { PlacesContext } from './PlacesContext';

const usePlacesContext = () => {
  const context = useContext(PlacesContext);

  if (context === undefined) {
    throw new Error('usePlacesContext must be used within a PlacesProvider');
  }

  return context;
};

export default usePlacesContext;
