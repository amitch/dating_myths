import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { QuizProvider } from './context/QuizContext';
import App from './App';
import IntroPage from './pages/IntroPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QuizProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<IntroPage />} />
              <Route path="quiz/:areaId" element={<QuizPage />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </QuizProvider>
    </ThemeProvider>
  </StrictMode>
);