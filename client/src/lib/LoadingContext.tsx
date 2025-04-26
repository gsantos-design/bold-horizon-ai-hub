import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  transitionToSection: (sectionId: string, offset?: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Function to trigger loading animation when transitioning between sections
  const transitionToSection = useCallback((sectionId: string, offset: number = 100) => {
    startLoading();
    
    // Short delay to allow the loading animation to start
    setTimeout(() => {
      const element = document.querySelector(sectionId);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: "smooth",
        });
      }
      
      // Stop loading after a short delay to show the animation
      setTimeout(stopLoading, 800);
    }, 300);
  }, [startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading, transitionToSection }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};