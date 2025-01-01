import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useGame } from '@contexts';
import { useClickMovement } from '@hooks';
import { resetSelection, clearMessages } from '@utils';

// Mock dependencies
jest.mock('@contexts', () => ({
  useGame: jest.fn(),
}));

jest.mock('@utils', () => ({
  resetSelection: jest.fn(),
  clearMessages: jest.fn(),
}));

// Mock consumer for testing
const MockConsumer = () => {
  const { handleTowerClick, selectedDisk, selectedTower } = useClickMovement();

  return (
    <div>
      <button data-testid="tower-0" onClick={() => handleTowerClick(0)}>
        Tower 0
      </button>
      <button data-testid="tower-1" onClick={() => handleTowerClick(1)}>
        Tower 1
      </button>
      <div data-testid="selected-disk">
        {selectedDisk !== null ? `Disk ${selectedDisk}` : 'None'}
      </div>
      <div data-testid="selected-tower">
        {selectedTower !== null ? `Tower ${selectedTower}` : 'None'}
      </div>
    </div>
  );
};

// Helper function to render with mocked context
const renderWithMockedGame = (overrides = {}) => {
  useGame.mockReturnValue({
    selectedDisk: null,
    setSelectedDisk: jest.fn(),
    selectedTower: null,
    setSelectedTower: jest.fn(),
    handleMoveDisk: jest.fn(),
    towers: [[3, 2, 1], [], []],
    ...overrides,
  });

  return render(<MockConsumer />);
};

describe('useClickMovement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('resets selection when clicking on an empty tower without a selected disk', () => {
    const mockSetSelectedDisk = jest.fn();
    const mockSetSelectedTower = jest.fn();

    const { getByTestId } = renderWithMockedGame({
      towers: [[], [], []],
      setSelectedDisk: mockSetSelectedDisk,
      setSelectedTower: mockSetSelectedTower,
    });

    fireEvent.click(getByTestId('tower-0'));

    expect(resetSelection).toHaveBeenCalledWith(
      mockSetSelectedDisk,
      mockSetSelectedTower,
    );
    expect(clearMessages).toHaveBeenCalled();
  });

  test('selects a disk from a tower', () => {
    const mockSetSelectedDisk = jest.fn();
    const mockSetSelectedTower = jest.fn();

    const { getByTestId } = renderWithMockedGame({
      setSelectedDisk: mockSetSelectedDisk,
      setSelectedTower: mockSetSelectedTower,
    });

    fireEvent.click(getByTestId('tower-0'));

    expect(mockSetSelectedDisk).toHaveBeenCalledWith(0);
    expect(mockSetSelectedTower).toHaveBeenCalledWith(0);
    expect(clearMessages).toHaveBeenCalled();
  });

  test('resets selection when clicking the same empty tower after selecting', () => {
    const mockSetSelectedDisk = jest.fn();
    const mockSetSelectedTower = jest.fn();

    const { getByTestId } = renderWithMockedGame({
      selectedDisk: 3,
      selectedTower: 0,
      towers: [[], [], []],
      setSelectedDisk: mockSetSelectedDisk,
      setSelectedTower: mockSetSelectedTower,
    });

    fireEvent.click(getByTestId('tower-0'));

    expect(resetSelection).toHaveBeenCalledWith(
      mockSetSelectedDisk,
      mockSetSelectedTower,
    );
    expect(clearMessages).toHaveBeenCalled();
  });

  test('moves a disk and resets selection', () => {
    const mockSetSelectedDisk = jest.fn();
    const mockSetSelectedTower = jest.fn();
    const mockHandleMoveDisk = jest.fn();

    const { getByTestId } = renderWithMockedGame({
      selectedDisk: 3,
      selectedTower: 0,
      towers: [[3, 2, 1], [], []],
      setSelectedDisk: mockSetSelectedDisk,
      setSelectedTower: mockSetSelectedTower,
      handleMoveDisk: mockHandleMoveDisk,
    });

    fireEvent.click(getByTestId('tower-1'));

    expect(mockHandleMoveDisk).toHaveBeenCalledWith(0, 1);
    expect(resetSelection).toHaveBeenCalledWith(
      mockSetSelectedDisk,
      mockSetSelectedTower,
    );
    expect(clearMessages).toHaveBeenCalled();
  });
});
