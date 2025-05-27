/**
 * Validates if a string is not empty
 * @param {string} value - The string to validate
 * @returns {boolean} - True if the string is not empty, false otherwise
 */
export const isRequired = (value) => {
  return value.trim() !== '';
};

/**
 * Validates if a string has a minimum length
 * @param {string} value - The string to validate
 * @param {number} minLength - The minimum required length
 * @returns {boolean} - True if the string meets the minimum length, false otherwise
 */
export const minLength = (value, minLength) => {
  return value.length >= minLength;
};

/**
 * Validates if a string has a maximum length
 * @param {string} value - The string to validate
 * @param {number} maxLength - The maximum allowed length
 * @returns {boolean} - True if the string is within the maximum length, false otherwise
 */
export const maxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

/**
 * Validates if a string matches a regular expression pattern
 * @param {string} value - The string to validate
 * @param {RegExp} pattern - The regular expression to test against
 * @returns {boolean} - True if the string matches the pattern, false otherwise
 */
export const matchesPattern = (value, pattern) => {
  return pattern.test(value);
};

/**
 * Validates if a value is a valid email address
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email is valid, false otherwise
 */
export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a value is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL is valid, false otherwise
 */
export const isUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates if a value is a number
 * @param {*} value - The value to validate
 * @returns {boolean} - True if the value is a number, false otherwise
 */
export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Validates if a number is within a specified range
 * @param {number} value - The number to validate
 * @param {number} min - The minimum value (inclusive)
 * @param {number} max - The maximum value (inclusive)
 * @returns {boolean} - True if the number is within the range, false otherwise
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  return num >= min && num <= max;
};

/**
 * Creates a validation function that checks multiple validators
 * @param {Array<Function>} validators - Array of validator functions
 * @returns {Function} - A function that runs all validators and returns the first error message or null
 */
export const createValidator = (validators) => {
  return (value) => {
    for (const validator of validators) {
      const result = validator(value);
      if (result !== true) {
        return result; // Return the error message
      }
    }
    return null; // No errors
  };
};

/**
 * Creates a required field validator with a custom error message
 * @param {string} fieldName - The name of the field for the error message
 * @returns {Function} - A validator function
 */
export const createRequiredValidator = (fieldName) => {
  return (value) => {
    if (!isRequired(value)) {
      return `${fieldName} is required`;
    }
    return true;
  };
};

/**
 * Creates a minimum length validator with a custom error message
 * @param {number} min - The minimum length
 * @param {string} fieldName - The name of the field for the error message
 * @returns {Function} - A validator function
 */
export const createMinLengthValidator = (min, fieldName) => {
  return (value) => {
    if (!minLength(value, min)) {
      return `${fieldName} must be at least ${min} characters long`;
    }
    return true;
  };
};

/**
 * Creates a maximum length validator with a custom error message
 * @param {number} max - The maximum length
 * @param {string} fieldName - The name of the field for the error message
 * @returns {Function} - A validator function
 */
export const createMaxLengthValidator = (max, fieldName) => {
  return (value) => {
    if (!maxLength(value, max)) {
      return `${fieldName} must be no more than ${max} characters long`;
    }
    return true;
  };
};

/**
 * Creates an email validator with a custom error message
 * @param {string} fieldName - The name of the field for the error message
 * @returns {Function} - A validator function
 */
export const createEmailValidator = (fieldName) => {
  return (value) => {
    if (!isEmail(value)) {
      return `Please enter a valid ${fieldName.toLowerCase()}`;
    }
    return true;
  };
};
