import {
  isRequired,
  minLength,
  maxLength,
  isEmail,
  isUrl,
  isNumber,
  isInRange,
  createValidator,
} from '../validation';

describe('Validation Utilities', () => {
  describe('isRequired', () => {
    it('returns true for non-empty string', () => {
      expect(isRequired('test')).toBe(true);
    });

    it('returns false for empty string', () => {
      expect(isRequired('')).toBe(false);
      expect(isRequired('   ')).toBe(false);
    });
  });

  describe('minLength', () => {
    it('validates minimum length', () => {
      expect(minLength('test', 3)).toBe(true);
      expect(minLength('te', 3)).toBe(false);
      expect(minLength('test', 5)).toBe(false);
    });
  });

  describe('maxLength', () => {
    it('validates maximum length', () => {
      expect(maxLength('test', 5)).toBe(true);
      expect(maxLength('test', 3)).toBe(false);
      expect(maxLength('', 3)).toBe(true);
    });
  });

  describe('isEmail', () => {
    it('validates email format', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('invalid-email')).toBe(false);
      expect(isEmail('test@.com')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('validates URL format', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://example.com/path')).toBe(true);
      expect(isUrl('not-a-url')).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('validates if value is a number', () => {
      expect(isNumber('123')).toBe(true);
      expect(isNumber(123)).toBe(true);
      expect(isNumber('abc')).toBe(false);
      expect(isNumber('123abc')).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('validates if number is within range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange('5', 1, 10)).toBe(true);
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe('createValidator', () => {
    it('creates a validator function that runs all validators', () => {
      const validators = [
        (value) => (value.length >= 3 ? true : 'Too short'),
        (value) => (value.includes('@') ? true : 'Must include @'),
      ];

      const validate = createValidator(validators);
      
      expect(validate('te@')).toBe('Too short');
      expect(validate('test')).toBe('Must include @');
      expect(validate('test@example.com')).toBeNull();
    });
  });
});
