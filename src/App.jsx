import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { QuizProvider } from './context/QuizContext';
import Layout from './components/layout/Layout';

const AppContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-family: ${({ theme }) => theme.fonts.primary};
  position: relative;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <QuizProvider>
      <AppContainer
        data-testid="app-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Layout>
          <Outlet />
        </Layout>
      </AppContainer>
    </QuizProvider>
  );
}

export default App;