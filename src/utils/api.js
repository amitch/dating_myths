/**
 * Performs a GET request to the specified URL
 * @param {string} url - The URL to fetch data from
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} - The parsed JSON response
 */
export const get = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

/**
 * Performs a POST request to the specified URL
 * @param {string} url - The URL to send data to
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} - The parsed JSON response
 */
export const post = async (url, data = {}, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

/**
 * Performs a PUT request to the specified URL
 * @param {string} url - The URL to update data at
 * @param {Object} data - The data to send in the request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} - The parsed JSON response
 */
export const put = async (url, data = {}, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

/**
 * Performs a DELETE request to the specified URL
 * @param {string} url - The URL to delete data from
 * @param {Object} options - Additional fetch options
 * @returns {Promise<Object>} - The parsed JSON response
 */
export const del = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // For DELETE, the response might be empty
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};

/**
 * Creates an API client with a base URL
 * @param {string} baseURL - The base URL for all API requests
 * @returns {Object} - An object with HTTP methods bound to the base URL
 */
export const createApiClient = (baseURL) => {
  return {
    get: (endpoint, options) =>
      get(`${baseURL}${endpoint}`, options),
    
    post: (endpoint, data, options) =>
      post(`${baseURL}${endpoint}`, data, options),
    
    put: (endpoint, data, options) =>
      put(`${baseURL}${endpoint}`, data, options),
    
    delete: (endpoint, options) =>
      del(`${baseURL}${endpoint}`, options),
  };
};

// Example usage:
// const api = createApiClient('https://api.example.com');
// const data = await api.get('/endpoint');
