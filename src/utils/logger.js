// Skip all logging in development unless explicitly enabled
// Disable logging in development by default unless explicitly enabled
const LOGGING_ENABLED = import.meta.env.PROD || import.meta.env.VITE_ENABLE_LOGGING === 'true';

// Suppress the development logging message
if (!LOGGING_ENABLED && !import.meta.env.PROD) {
  // No console message will be shown
}
const API_URL = import.meta.env.VITE_API_URL;

// Track if we've shown the offline warning
let hasShownWarning = false;

const getClientInfo = () => {
  if (typeof window === 'undefined') return {}; // Skip during SSR
  
  return {
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
    screenSize: typeof window !== 'undefined' ? 
      `${window.screen?.width || 0}x${window.screen?.height || 0}` : 'unknown',
    language: typeof navigator !== 'undefined' ? navigator.language : 'en',
    timezone: Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone || 'UTC',
    timestamp: new Date().toISOString(),
  };
};

export const logEvent = async (eventType, data = {}) => {
  // Skip logging entirely if not enabled
  if (!LOGGING_ENABLED) {
    // Don't show any message when logging is disabled
    return Promise.resolve();
  }

  // Only proceed if we have an API URL
  if (!API_URL) {
    if (import.meta.env.DEV && !hasShownWarning) {
      console.warn('[Logger] No API URL configured. Set VITE_API_URL to enable logging.');
      hasShownWarning = true;
    }
    return;
  }

  const logData = {
    eventType,
    ...data,
    clientInfo: getClientInfo(),
    timestamp: new Date().toISOString(),
  };

  try {
    // Use fetch instead of axios to reduce bundle size
    const response = await fetch(`${API_URL}/api/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
      // Don't block the main thread with logging
      keepalive: true,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // Only show errors in development
    if (import.meta.env.DEV) {
      console.warn(`[Logger] Failed to log ${eventType}:`, error.message);
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
