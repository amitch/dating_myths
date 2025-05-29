const theme = {
  colors: {
    primary: '#4682B4', // Steel Blue
    secondary: '#DB7093', // Pale Violet Red
    background: '#FFF0F5', // Lavender Blush
    backgroundDark: '#1a1a2e', // Dark background for contrast
    accent: '#A0522D', // Sienna
    text: '#2F4F4F', // Dark Slate Gray
    textLight: '#ffffff', // White text for dark backgrounds
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    body: '"Poppins", sans-serif',
    heading: '"Montserrat", sans-serif',
  },
  fontSizes: {
    small: '0.75rem',
    medium: '0.875rem',
    large: '1rem',
    xlarge: '1.25rem',
    xxlarge: '1.5rem',
  },

  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
  },
};

export default theme;
