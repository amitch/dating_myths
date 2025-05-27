import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import App from './App';

describe('App Component', () => {
  const renderWithProviders = (ui, { ...renderOptions } = {}) => {
    const Wrapper = ({ children }) => (
      <ThemeProvider theme={theme}>
        <Router>{children}</Router>
      </ThemeProvider>
    );
    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };

  it('renders without crashing', () => {
    renderWithProviders(<App />);
    // Check for any element that indicates the app has rendered
    expect(screen.getByTestId('app-container')).toBeInTheDocument();
  });

  it('contains the main heading', () => {
    renderWithProviders(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dating Myths Quiz');
  });
});
