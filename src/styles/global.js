import { Global, css } from '@emotion/react';
import { theme } from '../theme';

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: ${theme.fonts.secondary};
        color: ${theme.colors.darkSlateGray};
        line-height: 1.6;
        background-color: ${theme.colors.lavenderBlush};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: ${theme.fonts.primary};
        margin-bottom: 1rem;
        line-height: 1.2;
        color: ${theme.colors.darkSlateGray};
      }
      
      h1 {
        font-size: 2.5rem;
        @media (max-width: ${theme.breakpoints.mobile}) {
          font-size: 2rem;
        }
      }
      
      h2 {
        font-size: 2rem;
        @media (max-width: ${theme.breakpoints.mobile}) {
          font-size: 1.75rem;
        }
      }
      
      h3 {
        font-size: 1.5rem;
      }
      
      p {
        margin-bottom: 1rem;
      }
      
      a {
        color: ${theme.colors.paleVioletRed};
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: ${theme.colors.steelBlue};
          text-decoration: underline;
        }
      }
      
      button, input, textarea, select {
        font: inherit;
      }
      
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `}
  />
);
