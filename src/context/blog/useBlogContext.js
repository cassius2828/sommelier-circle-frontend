import { useContext } from 'react';
import { BlogContext } from './BlogContext';

const useBlogContext = () => {
  const context = useContext(BlogContext);

  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }

  return context;
};

export default useBlogContext;
