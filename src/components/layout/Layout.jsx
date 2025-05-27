import React from 'react';
import styled from '@emotion/styled';
import { GlobalStyles } from '../../styles/global';
import { Rangoli } from '../svgs';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1.5rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  svg {
    height: 60px;
    width: auto;
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

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <Rangoli />
        </Header>
        <Main>{children}</Main>
        <Footer>
          <p>© {new Date().getFullYear()} Dating Myths Quiz. All rights reserved.</p>
          <p>
            Made with ❤️ by <a href="#">Your Name</a>
          </p>
        </Footer>
      </AppContainer>
    </>
  );
};

export default Layout;
