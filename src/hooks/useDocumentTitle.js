import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Dating Myths Quiz`;
    
    // Cleanup function to reset the title when component unmounts
    return () => {
      document.title = 'Dating Myths Quiz';
    };
  }, [title]);
};

export default useDocumentTitle;
