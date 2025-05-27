import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to detect scroll position and direction
 * @param {Object} options - Options for the scroll listener
 * @param {number} options.threshold - The scroll threshold in pixels
 * @returns {Object} - Scroll position and direction
 */
const useScroll = (options = {}) => {
  const { threshold = 100 } = options;
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    // Update scroll position
    setScrollY(window.scrollY);
    setScrollX(window.scrollX);

    // Check if scrolled past threshold
    setIsScrolled(window.scrollY > threshold);

    // Determine scroll direction
    setScrollDirection((prev) => {
      if (window.scrollY > scrollY) return 'down';
      if (window.scrollY < scrollY) return 'up';
      return prev;
    });
  }, [scrollY, threshold]);

  useEffect(() => {
    // Set initial scroll position
    setScrollY(window.scrollY);
    setScrollX(window.scrollX);
    setIsScrolled(window.scrollY > threshold);

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, threshold]);

  return {
    scrollY,
    scrollX,
    scrollDirection,
    isScrolled,
  };
};

/**
 * Custom hook to scroll to an element with smooth behavior
 * @param {Object} options - Options for the scroll behavior
 * @param {string} options.selector - CSS selector for the target element
 * @param {string} options.behavior - Scroll behavior ('auto' or 'smooth')
 * @param {string} options.block - Vertical alignment ('start', 'center', 'end', or 'nearest')
 * @param {string} options.inline - Horizontal alignment ('start', 'center', 'end', or 'nearest')
 * @returns {Function} - Scroll function
 */
const useScrollTo = (options = {}) => {
  const {
    selector = '',
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest',
  } = options;

  const scrollTo = useCallback((target) => {
    try {
      let element;
      
      if (target) {
        element = target;
      } else if (selector) {
        element = document.querySelector(selector);
      } else {
        element = document.documentElement;
      }

      if (element) {
        element.scrollIntoView({
          behavior,
          block,
          inline,
        });
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }, [selector, behavior, block, inline]);

  return scrollTo;
};

export { useScroll, useScrollTo };

export default useScroll;
