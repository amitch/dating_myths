# Custom Hooks

This directory contains reusable custom React hooks for the application.

## Available Hooks

### `useForm`

A form handling hook with validation.

```jsx
import { useForm } from './hooks';

const MyForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { username: '', password: '' },
    {
      username: [
        (value) => (value ? null : 'Username is required'),
        (value) => (value.length >= 3 ? null : 'Must be at least 3 characters'),
      ],
      password: [
        (value) => (value ? null : 'Password is required'),
        (value) => (value.length >= 6 ? null : 'Must be at least 6 characters'),
      ],
    },
    async (formValues) => {
      // Handle form submission
      console.log('Form submitted:', formValues);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />
      {errors.username && <div className="error">{errors.username}</div>}
      
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      {errors.password && <div className="error">{errors.password}</div>}
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

### `useScroll`

Detects scroll position and direction.

```jsx
import { useScroll } from './hooks';

const MyComponent = () => {
  const { scrollY, scrollDirection, isScrolled } = useScroll({ threshold: 50 });
  
  return (
    <div>
      <div>Current scroll position: {scrollY}px</div>
      <div>Scroll direction: {scrollDirection || 'none'}</div>
      <div>Is scrolled: {isScrolled ? 'Yes' : 'No'}</div>
    </div>
  );
};
```

### `useScrollTo`

Provides a function to smoothly scroll to an element.

```jsx
import { useScrollTo } from './hooks';

const MyComponent = () => {
  const scrollToTop = useScrollTo({ selector: '#top' });
  
  return (
    <div>
      <div id="top">Top of the page</div>
      <button onClick={scrollToTop}>Scroll to Top</button>
    </div>
  );
};
```

### `useMediaQuery`

Handles media queries in React components.

```jsx
import { useMediaQuery } from './hooks';

const MyComponent = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  return (
    <div>
      {isMobile ? (
        <div>Mobile view</div>
      ) : (
        <div>Desktop view</div>
      )}
    </div>
  );
};
```

### `useIsMobile`, `useIsTablet`, `useIsDesktop`

Convenience hooks for common breakpoints.

```jsx
import { useIsMobile, useIsTablet, useIsDesktop } from './hooks';

const MyComponent = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  
  return (
    <div>
      {isMobile && <div>Mobile</div>}
      {isTablet && <div>Tablet</div>}
      {isDesktop && <div>Desktop</div>}
    </div>
  );
};
```

### `usePrefersDarkMode`, `usePrefersLightMode`

Detects user's color scheme preference.

```jsx
import { usePrefersDarkMode, usePrefersLightMode } from './hooks';

const ThemeAwareComponent = () => {
  const prefersDark = usePrefersDarkMode();
  const prefersLight = usePrefersLightMode();
  
  return (
    <div className={prefersDark ? 'dark-theme' : 'light-theme'}>
      {prefersDark ? 'Dark mode' : 'Light mode'}
    </div>
  );
};
```

### `useReducedMotion`

Detects if the user prefers reduced motion.

```jsx
import { useReducedMotion } from './hooks';
import { motion } from 'framer-motion';

const AnimatedComponent = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={{
        // Disable animations if reduced motion is preferred
        opacity: prefersReducedMotion ? 1 : [0, 1],
        x: prefersReducedMotion ? 0 : [100, 0],
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
      }}
    >
      Content
    </motion.div>
  );
};
```
