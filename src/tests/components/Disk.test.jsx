import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Disk } from '@components';
import { useDiskDrag } from '@hooks';
import { isTopDisk, getDiskColor } from '@utils';

// Mock hooks and utility functions with pre-defined values
jest.mock('@contexts', () => ({
  useGame: jest.fn(() => ({
    towers: [[3, 2, 1], [], []], // Example game state
  })),
}));

jest.mock('@hooks', () => ({
  useDiskDrag: jest.fn(() => ({
    isDragging: false,
    drag: jest.fn(),
  })),
}));

jest.mock('@utils', () => ({
  isTopDisk: jest.fn(),
  getDiskColor: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const defaultProps = { size: 1, towerIndex: 0 };
const renderDisk = (props = defaultProps) => render(<Disk {...props} />);

test('renders Disk without crashing', () => {
  const { container } = renderDisk();
  expect(container).toBeInTheDocument();
});

test('renders Disk with the correct className for size and color', () => {
  getDiskColor.mockReturnValueOnce('red'); // Mocked color for size 1
  const { container } = renderDisk();
  const diskElement = container.firstChild;

  expect(diskElement).toHaveClass('disk');
  expect(diskElement).toHaveClass('red'); // Mocked color
  expect(diskElement).toHaveClass('size-1');
  expect(getDiskColor).toHaveBeenCalledWith(1); // Ensure utility is called
});

test('applies correct styles for top disk', () => {
  isTopDisk.mockReturnValueOnce(true); // Simulate top disk
  const { container } = renderDisk();
  const diskElement = container.firstChild;

  expect(diskElement).toHaveStyle({
    opacity: '1',
    cursor: 'grab', // Top disk
  });
  expect(isTopDisk).toHaveBeenCalledWith([[3, 2, 1], [], []], 0, 1); // Ensure utility is called
});

test('applies correct styles for non-top disk', () => {
  isTopDisk.mockReturnValueOnce(false); // Simulate non-top disk
  const { container } = renderDisk({ size: 2, towerIndex: 0 });
  const diskElement = container.firstChild;

  expect(diskElement).toHaveStyle({
    opacity: '1',
    cursor: 'not-allowed', // Not top disk
  });
  expect(isTopDisk).toHaveBeenCalledWith([[3, 2, 1], [], []], 0, 2);
});

test('applies correct styles when dragging', () => {
  useDiskDrag.mockReturnValueOnce({
    isDragging: true,
    drag: jest.fn(),
  }); // Simulate dragging
  const { container } = renderDisk();
  const diskElement = container.firstChild;

  expect(diskElement).toHaveStyle({
    opacity: '0.5',
  });
});

test('does not introduce accessibility violations', async () => {
  const { container } = renderDisk();
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
