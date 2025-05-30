import React from 'react';
import styled from '@emotion/styled';
import { GlobalStyles } from '../../styles/global';
import headerImage from '../../assets/header_Gemini_crop3.jpg';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 3rem 1.5rem;
  text-align: center;
  background: url(${headerImage}) no-repeat center center;
  background-size: cover;
  position: relative;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  h1 {
    position: relative;
    z-index: 2;
    color: white;
    margin: 0;
    padding: 1rem 0;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem 0.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 0.9em;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.darkSlateGray};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
  
  a {
    color: ${({ theme }) => theme.colors.paleVioletRed};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Layout = ({ children, title = '', showHeader = true, showFooter = true, customHeader }) => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        {showHeader && (
          <Header>
            {customHeader || <h1>{title}</h1>}
          </Header>
        )}
        <Main>{children}</Main>
        {showFooter && (
          <Footer>
            <p> {new Date().getFullYear()} Dating Myths Quiz. All rights reserved.</p>
            <p>
              Made with  by <a href="#" onClick={(e) => {
                e.preventDefault();
                const user = 'amitc2033';
                const domain = 'gmail.com';
                window.location.href = `mailto:${user}@${domain}`;
              }}>Amit Chaudhary</a>
            </p>
          </Footer>
        )}
      </AppContainer>
    </>
  );
};

export default Layout;
