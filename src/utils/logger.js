// Only enable logging if we're in production and have an API URL, or if explicitly enabled in development
const API_URL = import.meta.env.VITE_API_URL;
const IS_PRODUCTION = import.meta.env.PROD;
const IS_DEVELOPMENT = !IS_PRODUCTION;
const IS_LOGGING_EXPLICITLY_ENABLED = import.meta.env.VITE_ENABLE_LOGGING === 'true';

// Only enable logging if:
// 1. We're in production AND have an API URL, OR
// 2. Logging is explicitly enabled in development
const LOGGING_ENABLED = (IS_PRODUCTION && API_URL) || (IS_DEVELOPMENT && IS_LOGGING_EXPLICITLY_ENABLED);

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
  // Skip logging entirely if not enabled or no API URL in production
  if (!LOGGING_ENABLED || (IS_PRODUCTION && !API_URL)) {
    return Promise.resolve();
  }

  // Only show warning in development if API URL is missing
  if (!API_URL) {
    if (IS_DEVELOPMENT && !hasShownWarning) {
      console.warn('[Logger] No API URL configured. Set VITE_API_URL to enable logging.');
      hasShownWarning = true;
    }
    return Promise.resolve();
  }

  const logData = {
    timestamp: new Date().toISOString(),
    eventType,
    ...data,
    ...getClientInfo(),
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
    if (IS_DEVELOPMENT) {
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
