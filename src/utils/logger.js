// Logging functionality has been disabled
const logEvent = async () => Promise.resolve();

// Event types (kept for compatibility)
const EVENT_TYPES = {
  PAGE_VIEW: 'PAGE_VIEW',
  QUIZ_STARTED: 'QUIZ_STARTED',
  QUESTION_ANSWERED: 'QUESTION_ANSWERED',
  QUIZ_COMPLETED: 'QUIZ_COMPLETED',
  REPORT_VIEWED: 'REPORT_VIEWED',
};

export { logEvent, EVENT_TYPES };
