import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getFromSessionStorage, saveToSessionStorage } from '../utils/storage';

// Initial state
const initialState = {
  userName: '',
  currentArea: 1,
  answers: {},
  completedAreas: [],
  quizCompleted: false,
};

// Action types
const RESET_QUIZ = 'RESET_QUIZ';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_CURRENT_AREA = 'SET_CURRENT_AREA';
const SAVE_ANSWERS = 'SAVE_ANSWERS';
const COMPLETE_QUIZ = 'COMPLETE_QUIZ';

// Reducer function
function quizReducer(state, action) {
  switch (action.type) {
    case RESET_QUIZ:
      return { ...initialState };
      
    case SET_USER_NAME:
      return { ...state, userName: action.payload };
      
    case SET_CURRENT_AREA:
      return { ...state, currentArea: action.payload };
      
    case SAVE_ANSWERS: {
      const { areaId, answers, score } = action.payload;
      const updatedAnswers = {
        ...state.answers,
        [areaId]: {
          answers,
          score: score || 0
        }
      };
      
      const updatedCompletedAreas = state.completedAreas.includes(areaId)
        ? state.completedAreas
        : [...state.completedAreas, areaId];
      
      return {
        ...state,
        answers: updatedAnswers,
        completedAreas: updatedCompletedAreas,
      };
    }
      
    case COMPLETE_QUIZ:
      return { ...state, quizCompleted: true };
      
    default:
      return state;
  }
}

// Create context
const QuizContext = createContext();

// Context provider component
export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState, () => {
    // Initialize state from sessionStorage if available
    const savedState = getFromSessionStorage('quizState');
    return savedState || initialState;
  });

  // Sync state to sessionStorage on changes
  useEffect(() => {
    saveToSessionStorage('quizState', state);
  }, [state]);

  // Action creators
  const resetQuiz = () => dispatch({ type: RESET_QUIZ });
  
  const setUserName = (name) => {
    dispatch({ type: SET_USER_NAME, payload: name });
  };
  
  const setCurrentArea = (areaId) => {
    dispatch({ type: SET_CURRENT_AREA, payload: areaId });
  };
  
  const saveAnswers = (areaId, answers) => {
    // Filter out any invalid question IDs before saving
    const validAnswers = {};
    const areaQuestions = {}; // Get this from questions data
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      // Only include answers for questions that exist in this area
      if (questionId.startsWith('q') && answer) {
        validAnswers[questionId] = answer;
      }
    });
    
    // Only save if we have valid answers
    if (Object.keys(validAnswers).length > 0) {
      dispatch({ type: SAVE_ANSWERS, payload: { areaId, answers: validAnswers } });
    } else {
      console.warn('No valid answers to save for area', areaId);
    }
  };
  
  const completeQuiz = () => {
    // Calculate total score from all answers
    const totalScore = Object.values(state.answers).reduce((sum, areaData) => {
      return sum + (areaData.score || 0);
    }, 0);
    
    // Save final results to session storage for results page
    const finalResults = {
      totalScore,
      answers: state.answers,
      completedAt: new Date().toISOString(),
    };
    
    saveToSessionStorage('quizResults', finalResults);
    dispatch({ type: COMPLETE_QUIZ });
  };

  // Memoize action creators to prevent recreation on every render
  const actions = React.useMemo(() => ({
    resetQuiz: () => dispatch({ type: RESET_QUIZ }),
    setUserName: (name) => dispatch({ type: SET_USER_NAME, payload: name }),
    setCurrentArea: (areaId) => dispatch({ type: SET_CURRENT_AREA, payload: areaId }),
    saveAnswers: (areaId, answers) => {
      // Filter out any invalid question IDs before saving
      const validAnswers = {};
      
      Object.entries(answers).forEach(([questionId, answer]) => {
        // Only include answers for questions that exist in this area
        if (questionId.startsWith('q') && answer) {
          validAnswers[questionId] = answer;
        }
      });
      
      // Only save if we have valid answers
      if (Object.keys(validAnswers).length > 0) {
        dispatch({ type: SAVE_ANSWERS, payload: { areaId, answers: validAnswers } });
      } else {
        console.warn('No valid answers to save for area', areaId);
      }
    },
    completeQuiz: () => {
      // Calculate total score from all answers
      const totalScore = Object.values(state.answers).reduce((sum, areaData) => {
        return sum + (areaData.score || 0);
      }, 0);
      
      // Save final results to session storage for results page
      const finalResults = {
        totalScore,
        answers: state.answers,
        completedAt: new Date().toISOString(),
      };
      
      saveToSessionStorage('quizResults', finalResults);
      dispatch({ type: COMPLETE_QUIZ });
    },
  }), [state.answers]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({
    // State
    userName: state.userName,
    currentArea: state.currentArea,
    answers: state.answers,
    completedAreas: state.completedAreas,
    quizCompleted: state.quizCompleted,
    // Actions (memoized)
    ...actions,
  }), [
    state.userName,
    state.currentArea,
    state.answers,
    state.completedAreas,
    state.quizCompleted,
    actions
  ]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// Custom hook for using the quiz context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
