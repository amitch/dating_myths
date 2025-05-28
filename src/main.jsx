import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { QuizProvider } from './context/QuizContext';
import App from './App';
import IntroPage from './pages/IntroPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import questionsData from './data/questions.json';

// Get valid area IDs from questions data
const validAreaIds = Object.keys(questionsData.questions || {}).map(Number);

// Debug log for valid area IDs
console.log('Valid area IDs from questions data:', validAreaIds);

// Route handler for quiz areas
const QuizAreaRoute = () => {
  const { areaId } = useParams();
  const areaNum = parseInt(areaId);
  
  console.log('QuizAreaRoute - areaId:', areaId, 'areaNum:', areaNum);
  
  if (isNaN(areaNum)) {
    console.error('Invalid area ID:', areaId);
    return <Navigate to="/not-found" replace />;
  }
  
  const isValidArea = validAreaIds.includes(areaNum) && areaNum >= 1 && areaNum <= 5;
  
  if (!isValidArea) {
    console.error('Area ID out of range or not found in validAreaIds:', areaNum);
    return <Navigate to="/not-found" replace />;
  }
  
  return <QuizPage />;
};

// Main App Router
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<IntroPage />} />
        <Route path="quiz/:areaId" element={<QuizAreaRoute />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QuizProvider>
        <Router>
          <AppRouter />
        </Router>
      </QuizProvider>
    </ThemeProvider>
  </StrictMode>
);