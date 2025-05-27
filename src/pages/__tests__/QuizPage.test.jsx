import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import QuizPage from '../QuizPage';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock the useQuiz hook
jest.mock('../../context/QuizContext', () => ({
  useQuiz: () => ({
    state: {
      currentArea: 1,
      answers: {},
    },
    saveAnswers: jest.fn(),
  }),
}));

// Mock questions data
const mockQuestions = [
  {
    id: 'q1',
    text: 'What is your favorite color?',
    options: [
      { id: 'a', text: 'Red' },
      { id: 'b', text: 'Blue' },
    ],
  },
  {
    id: 'q2',
    text: 'What is your favorite animal?',
    options: [
      { id: 'a', text: 'Dog' },
      { id: 'b', text: 'Cat' },
    ],
  },
];

// Mock the questions import
jest.mock('../../data/questions.json', () => ({
  default: {
    1: mockQuestions,
  },
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

describe('QuizPage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ areaId: '1' });
  });

  it('renders quiz questions', () => {
    renderWithProviders(<QuizPage />);
    
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
    expect(screen.getByText('What is your favorite animal?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('disables Next button until all questions are answered', () => {
    renderWithProviders(<QuizPage />);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    expect(nextButton).toBeDisabled();
    
    // Answer first question
    const firstOption = screen.getByLabelText('Red');
    fireEvent.click(firstOption);
    
    // Still disabled because second question not answered
    expect(nextButton).toBeDisabled();
    
    // Answer second question
    const secondOption = screen.getByLabelText('Dog');
    fireEvent.click(secondOption);
    
    // Now should be enabled
    expect(nextButton).not.toBeDisabled();
  });

  it('saves answers and navigates on Next click', () => {
    const mockSaveAnswers = jest.fn();
    const mockNavigate = jest.fn();
    
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
    
    jest.mock('../../context/QuizContext', () => ({
      useQuiz: () => ({
        state: {
          currentArea: 1,
          answers: {},
        },
        saveAnswers: mockSaveAnswers,
      }),
    }));
    
    renderWithProviders(<QuizPage />);
    
    // Answer all questions
    fireEvent.click(screen.getByLabelText('Red'));
    fireEvent.click(screen.getByLabelText('Dog'));
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    
    expect(mockSaveAnswers).toHaveBeenCalledWith(1, {
      q1: ['a'],
      q2: ['a'],
    });
    expect(mockNavigate).toHaveBeenCalledWith('/quiz/2');
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<QuizPage />);
    expect(container).toMatchSnapshot();
  });
});
