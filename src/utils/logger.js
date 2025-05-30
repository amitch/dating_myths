import axios from 'axios';

// Use Vite's import.meta.env for environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getClientInfo = () => {
  // This is a placeholder - in a real app, you'd get more detailed client info
  return {
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  };
};

export const logEvent = async (eventType, data = {}) => {
  const logData = {
    eventType,
    ...data,
    clientInfo: getClientInfo(),
    timestamp: new Date().toISOString(),
  };

  try {
    // In a production app, you would send this to your backend
    await axios.post(`${API_URL}/api/logs`, logData);
  } catch (error) {
    // Silently fail for production, but log to console in development
    if (import.meta.env.DEV) {
      console.error('Failed to log event:', error);
    }
  }
};

// Event types
export const EVENT_TYPES = {
  PAGE_VIEW: 'PAGE_VIEW',
  QUIZ_STARTED: 'QUIZ_STARTED',
  QUESTION_ANSWERED: 'QUESTION_ANSWERED',
  QUIZ_COMPLETED: 'QUIZ_COMPLETED',
  REPORT_VIEWED: 'REPORT_VIEWED',
};
