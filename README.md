# Form Validator

A lightweight React form validation component with debounce and throttle utilities. Built for Assignment 2.

## What it does

This is a reusable form validator component that handles real-time validation with debouncing. It also includes demo pages showing how debounce and throttle work in practice.

## Features

- **FormValidator component** - Drop it in, pass your fields and validators, done
- **Debounce/throttle utilities** - Custom implementations (no lodash needed)
- **Real-time validation** - Validates as you type with a 250ms debounce
- **Customizable themes** - Pass accent, error, and border colors
- **Demo page** - Interactive examples of throttle and debounce behavior

## Quick start

```bash
npm install
npm run dev
```

## Usage

```tsx
import FormValidator from './validator/FormValidator';

const fields = [
  {
    name: 'email',
    label: 'Email',
    validators: [
      (v) => !v ? 'Email is required' : null,
      (v) => !v.includes('@') ? 'Invalid email' : null
    ]
  },
  {
    name: 'password',
    label: 'Password',
    validators: [
      (v) => !v ? 'Password is required' : null,
      (v) => v.length < 8 ? 'Must be at least 8 characters' : null
    ]
  }
];

function MyForm() {
  return (
    <FormValidator
      fields={fields}
      theme={{ accent: '#007bff', error: '#dc3545' }}
      onSubmit={(values) => console.log(values)}
    />
  );
}
```

## Project structure

```
src/
  validator/
    FormValidator.tsx  # Main component
    utils.ts           # debounce, throttle, polyfills
    styles.css         # Component styles
  DemoPage.tsx         # Demo page with throttle/debounce examples
```

## Tech stack

- React 19
- TypeScript
- Vite
- Yup (for validation schemas if needed)

## Notes

- Validation debounces at 250ms to avoid spamming checks
- Password fields automatically trigger confirmPassword validation when password changes
- Includes a polyfill for `Object.fromEntries` for older browsers
