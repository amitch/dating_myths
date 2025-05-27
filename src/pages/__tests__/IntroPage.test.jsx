import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../styles/theme';
import IntroPage from '../IntroPage';

// Mock the useQuiz hook
jest.mock('../../context/QuizContext', () => ({
  useQuiz: () => ({
    setUserName: jest.fn(),
  }),
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

describe('IntroPage', () => {
  it('renders the intro page with form', () => {
    renderWithProviders(<IntroPage />);
    
    expect(screen.getByText(/Welcome to Dating Myths Quiz/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Quiz/i })).toBeInTheDocument();
  });

  it('validates name input', () => {
    renderWithProviders(<IntroPage />);
    
    const input = screen.getByLabelText(/Your Name/i);
    const button = screen.getByRole('button', { name: /Start Quiz/i });
    
    // Initially, button should be disabled
    expect(button).toBeDisabled();
    
    // Enter a valid name
    fireEvent.change(input, { target: { value: 'Test User' } });
    expect(button).not.toBeDisabled();
    
    // Clear the input
    fireEvent.change(input, { target: { value: '   ' } });
    expect(button).toBeDisabled();
  });

  it('submits the form with valid name', () => {
    const navigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigate,
    }));
    
    renderWithProviders(<IntroPage />);
    
    const input = screen.getByLabelText(/Your Name/i);
    const button = screen.getByRole('button', { name: /Start Quiz/i });
    
    fireEvent.change(input, { target: { value: 'Test User' } });
    fireEvent.click(button);
    
    expect(navigate).toHaveBeenCalledWith('/quiz/1');
  });

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<IntroPage />);
    expect(container).toMatchSnapshot();
  });
});
