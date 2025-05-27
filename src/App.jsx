import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { QuizProvider } from './context/QuizContext';
import Layout from './components/layout/Layout';

// Pages
import IntroPage from './pages/IntroPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';

const AppContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lavenderBlush};
  color: ${({ theme }) => theme.colors.darkSlateGray};
  font-family: ${({ theme }) => theme.fonts.primary};
  position: relative;
`;

function App() {
  return (
    <Router>
      <QuizProvider>
        <AppContainer
          data-testid="app-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Layout>
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/quiz/:areaId" element={<QuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Layout>
        </AppContainer>
      </QuizProvider>
    </Router>
  );
}

export default App;