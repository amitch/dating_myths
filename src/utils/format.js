/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a number with commas as thousand separators
 * @param {number} num - The number to format
 * @returns {string} - The formatted number as a string
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Truncates a string to a specified length and adds an ellipsis if needed
 * @param {string} str - The string to truncate
 * @param {number} maxLength - The maximum length of the string
 * @param {string} [ellipsis='...'] - The ellipsis string to append if truncated
 * @returns {string} - The truncated string with ellipsis if needed
 */
export const truncate = (str, maxLength, ellipsis = '...') => {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength) + ellipsis;
};

/**
 * Converts a string to kebab-case
 * @param {string} str - The string to convert
 * @returns {string} - The kebab-cased string
 */
export const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Converts a string to camelCase
 * @param {string} str - The string to convert
 * @returns {string} - The camelCased string
 */
export const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/[\s-]+/g, '');
};

/**
 * Converts a string to PascalCase
 * @param {string} str - The string to convert
 * @returns {string} - The PascalCased string
 */
export const toPascalCase = (str) => {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
};

/**
 * Converts a string to title case
 * @param {string} str - The string to convert
 * @returns {string} - The title cased string
 */
export const toTitleCase = (str) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
};

/**
 * Formats a date string into a more readable format
 * @param {string|Date} date - The date to format
 * @param {string} [locale='en-US'] - The locale to use for formatting
 * @param {Object} [options] - Options for date formatting
 * @returns {string} - The formatted date string
 */
export const formatDate = (date, locale = 'en-US', options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, defaultOptions);
};

/**
 * Formats a number as a currency string
 * @param {number} amount - The amount to format
 * @param {string} [currency='USD'] - The currency code
 * @param {string} [locale='en-US'] - The locale to use for formatting
 * @returns {string} - The formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formats a number as a percentage
 * @param {number} value - The value to format (0-1)
 * @param {number} [decimalPlaces=0] - The number of decimal places to show
 * @returns {string} - The formatted percentage string
 */
export const formatPercentage = (value, decimalPlaces = 0) => {
  const percentage = value * 100;
  return percentage.toFixed(decimalPlaces) + '%';
};

/**
 * Generates a random string of specified length
 * @param {number} length - The length of the random string
 * @returns {string} - The generated random string
 */
export const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Converts a string to a URL-friendly slug
 * @param {string} str - The string to convert
 * @returns {string} - The URL-friendly slug
 */
export const toSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-'); // Replace multiple hyphens with single hyphen
};

/**
 * Removes HTML tags from a string
 * @param {string} str - The string to remove HTML tags from
 * @returns {string} - The string with HTML tags removed
 */
export const stripHtml = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '');
};
