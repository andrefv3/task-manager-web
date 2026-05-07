import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Automatic cleanup to prevent memory leaks between tests
afterEach(() => {
  cleanup();
});