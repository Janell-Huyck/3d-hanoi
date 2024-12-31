import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Tower } from '@components';
import { useGame } from '@contexts';
import { useClickMovement, useTowerDrop } from '@hooks';

// Mock dependent components
jest.mock('@components/Disk', () => ({
  __esModule: true,
  default: jest.fn(({ size, towerIndex }) => (
    <div data-testid={`disk-mock-${size}`} data-towerindex={towerIndex}></div>
  )),
}));

jest.mock('@components/TowerSpike', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="tower-spike-mock"></div>),
}));

// Mock hooks
jest.mock('@contexts', () => ({
  useGame: jest.fn(),
}));

jest.mock('@hooks', () => ({
  useClickMovement: jest.fn(),
  useTowerDrop: jest.fn(),
}));

describe('Tower Component', () => {
  const mockTowers = [[3, 2, 1], [], []]; // Example game state
  const mockHandleMoveDisk = jest.fn();
  const mockSelectedTower = 0;

  beforeEach(() => {
    useGame.mockReturnValue({
      towers: mockTowers,
      handleMoveDisk: mockHandleMoveDisk,
      selectedTower: mockSelectedTower,
    });

    useClickMovement.mockReturnValue({
      handleTowerClick: jest.fn(),
    });

    useTowerDrop.mockReturnValue({
      isOver: false,
      drop: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    const { container } = render(<Tower towerIndex={0} />);
    expect(container).toBeInTheDocument();
  });

  test('renders TowerSpike', () => {
    const { getByTestId } = render(<Tower towerIndex={0} />);
    expect(getByTestId('tower-spike-mock')).toBeInTheDocument();
  });

  test('renders disks for the correct tower', () => {
    const { getByTestId } = render(<Tower towerIndex={0} />);
    expect(getByTestId('disk-mock-3')).toHaveAttribute('data-towerindex', '0');
    expect(getByTestId('disk-mock-2')).toHaveAttribute('data-towerindex', '0');
    expect(getByTestId('disk-mock-1')).toHaveAttribute('data-towerindex', '0');
  });

  test('applies "selected" class when tower is selected', () => {
    const { container } = render(<Tower towerIndex={0} />);
    expect(container.firstChild).toHaveClass('selected');
  });

  test('applies "hovered" class when tower is hovered over', () => {
    useTowerDrop.mockReturnValueOnce({
      isOver: true,
      drop: jest.fn(),
    });
    const { container } = render(<Tower towerIndex={0} />);
    expect(container.firstChild).toHaveClass('hovered');
  });

  test('calls handleTowerClick on click', () => {
    const mockHandleTowerClick = jest.fn();
    useClickMovement.mockReturnValueOnce({
      handleTowerClick: mockHandleTowerClick,
    });
    const { container } = render(<Tower towerIndex={0} />);
    container.firstChild.click();
    expect(mockHandleTowerClick).toHaveBeenCalledWith(0);
  });

  test('does not introduce accessibility violations', async () => {
    const { container } = render(<Tower towerIndex={0} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('does not apply "selected" class when tower is not selected', () => {
    useGame.mockReturnValueOnce({
      towers: mockTowers,
      handleMoveDisk: mockHandleMoveDisk,
      selectedTower: 1, // A different tower index is selected
    });

    const { container } = render(<Tower towerIndex={0} />);
    expect(container.firstChild).not.toHaveClass('selected');
  });
});
