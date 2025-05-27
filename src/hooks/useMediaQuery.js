import { useState, useEffect } from 'react';

/**
 * Custom hook to handle media queries
 * @param {string} query - The media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener function
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', listener);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

/**
 * Hook to detect if the screen is mobile size
 * @returns {boolean} - True if screen is mobile size
 */
const useIsMobile = () => {
  return useMediaQuery('(max-width: 767px)');
};

/**
 * Hook to detect if the screen is tablet size
 * @returns {boolean} - True if screen is tablet size
 */
const useIsTablet = () => {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
};

/**
 * Hook to detect if the screen is desktop size
 * @returns {boolean} - True if screen is desktop size
 */
const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1024px)');
};

/**
 * Hook to detect if the screen is in dark mode
 * @returns {boolean} - True if dark mode is enabled
 */
const usePrefersDarkMode = () => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};

/**
 * Hook to detect if the screen is in light mode
 * @returns {boolean} - True if light mode is enabled
 */
const usePrefersLightMode = () => {
  return useMediaQuery('(prefers-color-scheme: light)');
};

/**
 * Hook to detect if the user has reduced motion preference
 * @returns {boolean} - True if reduced motion is preferred
 */
const useReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersLightMode,
  useReducedMotion,
};

export default useMediaQuery;
