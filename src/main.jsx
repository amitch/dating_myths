import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import IntroPage from './pages/IntroPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<IntroPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
