import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import { toHaveNoViolations } from 'jest-axe';

// Extend Jest with jest-axe matchers
expect.extend(toHaveNoViolations);
