import { motion } from 'framer-motion';

// Page transitions
export const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 }
};

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// Fade animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

// Stagger animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Button hover effects
export const buttonHover = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10
  }
};

export const buttonTap = {
  scale: 0.95
};

// Card hover effects
export const cardHover = {
  y: -5,
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 15
  }
};

// Loading animations
export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity
    }
  }
};

// Text animations
export const textFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Progress bar animation
export const progressBar = (progress) => ({
  initial: { width: 0 },
  animate: { 
    width: `${progress}%`,
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
});

export const MotionDiv = motion.div;