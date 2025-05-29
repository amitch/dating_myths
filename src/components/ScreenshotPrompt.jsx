import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const PromptContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.sienna};
  border-radius: 12px;
  padding: 1.2rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  z-index: 1000;
  max-width: 90%;
  width: 500px;
`;

const PromptText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const ShareButton = styled.button`
  background: ${({ theme }) => theme.colors.paleVioletRed};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.darkPink};
  }
`;

const ScreenshotPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasSeenPrompt, setHasSeenPrompt] = useState(false);

  useEffect(() => {
    // Show prompt after 3 seconds if not seen before
    const showTimer = setTimeout(() => {
      const hasSeen = sessionStorage.getItem('hasSeenScreenshotPrompt');
      if (!hasSeen) {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenScreenshotPrompt', 'true');
        
        // Auto-hide after 5 seconds
        const hideTimer = setTimeout(() => {
          handleClose();
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    if (!isVisible) return;
    
    setIsClosing(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
    
    return () => clearTimeout(timer);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my dating myths quiz results!',
          text: 'I just took the dating myths quiz. See how you compare!',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
      handleClose();
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <PromptContainer
      initial={{ y: 100, opacity: 0 }}
      animate={isClosing ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <PromptText>
        Share your results with friends! 📱
      </PromptText>
      <ShareButton onClick={handleShare}>
        Share
      </ShareButton>
      <CloseButton onClick={handleClose} aria-label="Close prompt">
        ×
      </CloseButton>
    </PromptContainer>
  );
};

export default ScreenshotPrompt;
