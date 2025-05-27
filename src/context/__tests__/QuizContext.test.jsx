import { renderHook, act } from '@testing-library/react';
import { QuizProvider, useQuiz } from '../QuizContext';

describe('QuizContext', () => {
  // Mock sessionStorage
  const sessionStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value.toString(); },
      clear: () => { store = {}; },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });
  });

  beforeEach(() => {
    window.sessionStorage.clear();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }) => <QuizProvider>{children}</QuizProvider>;

  it('initializes with default state', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    
    expect(result.current.state).toEqual({
      userName: '',
      currentArea: 1,
      answers: {},
      completedAreas: [],
      quizCompleted: false,
    });
  });

  it('sets user name', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    
    act(() => {
      result.current.setUserName('Test User');
    });
    
    expect(result.current.state.userName).toBe('Test User');
  });

  it('saves answers and updates current area', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    const answers = { q1: ['a'], q2: ['b'] };
    
    act(() => {
      result.current.saveAnswers(1, answers);
    });
    
    expect(result.current.state.answers[1]).toEqual(answers);
    expect(result.current.state.currentArea).toBe(2);
    expect(result.current.state.completedAreas).toContain(1);
  });

  it('resets the quiz', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    
    // Set some state first
    act(() => {
      result.current.setUserName('Test User');
      result.current.saveAnswers(1, { q1: ['a'] });
    });
    
    // Then reset
    act(() => {
      result.current.resetQuiz();
    });
    
    expect(result.current.state).toEqual({
      userName: '',
      currentArea: 1,
      answers: {},
      completedAreas: [],
      quizCompleted: false,
    });
  });

  it('persists state in sessionStorage', () => {
    const { result, rerender } = renderHook(() => useQuiz(), { wrapper });
    
    act(() => {
      result.current.setUserName('Test User');
    });
    
    // Force re-render to simulate page refresh
    rerender();
    
    expect(result.current.state.userName).toBe('Test User');
  });
});
