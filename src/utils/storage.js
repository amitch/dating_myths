/**
 * Saves data to localStorage
 * @param {string} key - The key under which to store the data
 * @param {*} value - The data to store (will be stringified)
 * @returns {boolean} - True if successful, false otherwise
 */
export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Retrieves data from localStorage
 * @param {string} key - The key of the data to retrieve
 * @param {*} defaultValue - The default value to return if the key doesn't exist
 * @returns {*} - The parsed data or the default value
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Removes data from localStorage
 * @param {string} key - The key of the data to remove
 * @returns {boolean} - True if successful, false otherwise
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

/**
 * Clears all data from localStorage
 * @returns {boolean} - True if successful, false otherwise
 */
export const clearLocalStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Saves data to sessionStorage
 * @param {string} key - The key under which to store the data
 * @param {*} value - The data to store (will be stringified)
 * @returns {boolean} - True if successful, false otherwise
 */
export const saveToSessionStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
    return false;
  }
};

/**
 * Retrieves data from sessionStorage
 * @param {string} key - The key of the data to retrieve
 * @param {*} defaultValue - The default value to return if the key doesn't exist
 * @returns {*} - The parsed data or the default value
 */
export const getFromSessionStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error reading from sessionStorage:', error);
    return defaultValue;
  }
};

/**
 * Removes data from sessionStorage
 * @param {string} key - The key of the data to remove
 * @returns {boolean} - True if successful, false otherwise
 */
export const removeFromSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from sessionStorage:', error);
    return false;
  }
};

/**
 * Clears all data from sessionStorage
 * @returns {boolean} - True if successful, false otherwise
 */
export const clearSessionStorage = () => {
  try {
    sessionStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
    return false;
  }
};
