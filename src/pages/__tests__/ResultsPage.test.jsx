import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import ResultsPage from '../ResultsPage';

// Mock the useQuiz hook
jest.mock('../../context/QuizContext', () => ({
  useQuiz: () => ({
    state: {
      userName: 'Test User',
      answers: {
        1: { q1: ['a'], q2: ['b'] },
        2: { q3: ['a'], q4: ['b'] },
      },
    },
    resetQuiz: jest.fn(),
  }),
}));

// Mock the utility functions
jest.mock('../../utils/quizUtils', () => ({
  calculateScores: () => ({
    totalScore: 8,
    maxScore: 15,
    areaScores: {
      1: { score: 2, maxScore: 3 },
      2: { score: 2, maxScore: 3 },
    },
  }),
  getStrongestWeakestAreas: () => ({
    strongest: { id: 1, name: 'First Impressions', score: 3 },
    weakest: { id: 2, name: 'Communication', score: 1 },
  }),
  getTips: () => [
    'Tip 1: Be yourself',
    'Tip 2: Listen actively',
    'Tip 3: Be confident',
  ],
}));

const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('ResultsPage', () => {
  it('renders the results page with user data', () => {
    renderWithProviders(<ResultsPage />);
    
    // Check if user name is displayed
    expect(screen.getByText(/Test User's Results/i)).toBeInTheDocument();
    
    // Check if score is displayed
    expect(screen.getByText(/8\/15/i)).toBeInTheDocument();
    
    // Check if tips are displayed
    expect(screen.getByText(/Tip 1: Be yourself/i)).toBeInTheDocument();
    expect(screen.getByText(/Tip 2: Listen actively/i)).toBeInTheDocument();
    expect(screen.getByText(/Tip 3: Be confident/i)).toBeInTheDocument();
    
    // Check if restart button is present
    expect(screen.getByRole('button', { name: /Take Quiz Again/i })).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<ResultsPage />);
    expect(container).toMatchSnapshot();
  });
});
