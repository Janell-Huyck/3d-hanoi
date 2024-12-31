/**
 * DndContext.test.jsx
 *
 * Tests the functionality of the DndProviderContext, a wrapper for react-dnd's DndProvider.
 *
 * - Mocks the DndProvider to validate its `backend` prop and ensure proper rendering
 *   of children within the context.
 * - Verifies support for custom backends and ensures they are passed correctly to the DndProvider.
 * - Includes tests for default behavior, custom backend handling, and PropTypes validation
 *   (e.g., ensuring children are provided).
 * - Uses jest mock functions to control the behavior of the DndProvider for precise testing.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import DndProviderContext from '@contexts/DndContext';
import { DndProvider } from 'react-dnd';

// Mock DndProvider to verify backend prop
jest.mock('react-dnd', () => ({
  DndProvider: jest.fn(({ backend, children }) => (
    <div
      data-testid="mock-dnd-provider"
      data-backend={backend?.name || 'createBackend'}
    >
      {children}
    </div>
  )),
}));

describe('DndProviderContext', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders children correctly', () => {
    render(
      <DndProviderContext>
        <div data-testid="child">Test Child</div>
      </DndProviderContext>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('mock-dnd-provider')).toHaveAttribute(
      'data-backend',
      'createBackend', // Matches the mock behavior
    );
  });

  test('supports a custom backend', () => {
    const CustomBackend = jest.fn();
    render(
      <DndProvider backend={CustomBackend}>
        <div data-testid="child">Test Child</div>
      </DndProvider>,
    );

    expect(screen.getByTestId('mock-dnd-provider')).toHaveAttribute(
      'data-backend',
      'mockConstructor',
    );
  });

  test('passes a custom backend to DndProvider', () => {
    const CustomBackend = jest.fn();
    render(
      <DndProvider backend={CustomBackend}>
        <div data-testid="child">Test Child</div>
      </DndProvider>,
    );

    expect(DndProvider).toHaveBeenCalledWith(
      expect.objectContaining({ backend: CustomBackend }),
      expect.anything(),
    );
  });

  test('logs a warning if children are not provided', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<DndProviderContext />);

    expect(console.error).toHaveBeenCalledWith(
      'Warning: Failed %s type: %s%s',
      'prop',
      'The prop `children` is marked as required in `DndProviderContext`, but its value is `undefined`.',
      expect.stringContaining('at children'), // Matches the file and line location in the message
    );

    console.error = originalConsoleError;
  });
});
