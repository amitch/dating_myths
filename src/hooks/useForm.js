import { useState, useCallback } from 'react';
import { createValidator } from '../utils/validation';

/**
 * Custom hook for form handling with validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validations - Validation rules for each field
 * @param {Function} onSubmit - Form submission handler
 * @returns {Object} - Form state and handlers
 */
const useForm = (initialValues = {}, validations = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create validators for each field
  const fieldValidators = Object.entries(validations).reduce((acc, [fieldName, rules]) => {
    acc[fieldName] = createValidator(rules);
    return acc;
  }, {});

  /**
   * Validates a single field
   * @param {string} fieldName - The name of the field to validate
   * @param {*} value - The value to validate
   * @returns {string|null} - Error message or null if valid
   */
  const validateField = useCallback((fieldName, value) => {
    if (!fieldValidators[fieldName]) return null;
    return fieldValidators[fieldName](value);
  }, [fieldValidators]);

  /**
   * Validates all fields in the form
   * @returns {Object} - Object containing validation errors
   */
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  }, [values, validateField]);

  /**
   * Handles input changes and validates the field
   * @param {Object|string} eventOrName - The event object or field name
   * @param {*} value - The new value (if first param is field name)
   */
  const handleChange = useCallback((eventOrName, value) => {
    const name = eventOrName.target ? eventOrName.target.name : eventOrName;
    const newValue = eventOrName.target ? eventOrName.target.value : value;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));

    // Clear error for the field when user types
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  }, [errors]);

  /**
   * Handles form submission
   * @param {Object} event - The form submission event
   * @returns {Promise} - Promise that resolves when submission is complete
   */
  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { isValid, errors: validationErrors } = validateForm();

    if (!isValid) {
      return Promise.reject({ validationErrors });
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(values);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, validateForm, values]);

  /**
   * Resets the form to its initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  /**
   * Sets a field value programmatically
   * @param {string} name - The name of the field
   * @param {*} value - The new value
   */
  const setFieldValue = useCallback((name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  /**
   * Sets a field error programmatically
   * @param {string} name - The name of the field
   * @param {string} error - The error message
   */
  const setFieldError = useCallback((name, error) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm,
  };
};

export default useForm;
