import { Outlet, Link } from 'react-router-dom';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const NavItem = styled.li`
  a {
    color: ${({ theme }) => theme.colors.darkSlateGray};
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.sienna};
      background-color: ${({ theme }) => theme.colors.paleVioletRed}15;
    }
  }
`;

const MainContent = styled.main`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

function App() {
  return (
    <AppContainer>
      <Nav>
        <NavList>
          {/* Results link will be shown conditionally later when we have results to show */}
        </NavList>
      </Nav>
      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
}

export default App;