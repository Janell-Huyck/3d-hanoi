import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useGame } from '@contexts';
import { useClickMovement } from '@hooks';
import { resetSelection } from '@utils';

jest.mock('@contexts', () => ({
  useGame: jest.fn(),
}));

jest.mock('@utils', () => ({
  resetSelection: jest.fn(),
}));

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

describe('useClickMovement', () => {
  const mockSetSelectedDisk = jest.fn();
  const mockSetSelectedTower = jest.fn();
  const mockHandleMoveDisk = jest.fn();

  beforeEach(() => {
    useGame.mockReturnValue({
      selectedDisk: null,
      setSelectedDisk: mockSetSelectedDisk,
      selectedTower: null,
      setSelectedTower: mockSetSelectedTower,
      handleMoveDisk: mockHandleMoveDisk,
      towers: [[3, 2, 1], [], []],
    });
    jest.clearAllMocks();
  });

  test('resets selection when clicking on an empty tower without a selected disk', () => {
    useGame.mockReturnValueOnce({
      ...useGame(),
      towers: [[], [], []],
    });

    const { getByTestId } = render(<MockConsumer />);

    fireEvent.click(getByTestId('tower-0'));
    expect(resetSelection).toHaveBeenCalledWith(
      mockSetSelectedDisk,
      mockSetSelectedTower,
    );
  });

  test('selects a disk from a tower', () => {
    const { getByTestId } = render(<MockConsumer />);

    fireEvent.click(getByTestId('tower-0'));
    expect(mockSetSelectedDisk).toHaveBeenCalledWith(0);
    expect(mockSetSelectedTower).toHaveBeenCalledWith(0);
  });

  test('resets selection when clicking the same empty tower after selecting', () => {
    useGame.mockReturnValueOnce({
      ...useGame(),
      selectedDisk: 3,
      selectedTower: 0,
      towers: [[], [], []],
    });

    const { getByTestId } = render(<MockConsumer />);

    fireEvent.click(getByTestId('tower-0'));
    expect(resetSelection).toHaveBeenCalledWith(
      mockSetSelectedDisk,
      mockSetSelectedTower,
    );
  });

  test('moves a disk and resets selection', () => {
    useGame.mockReturnValueOnce({
      ...useGame(),
      selectedDisk: 3,
      selectedTower: 0,
      towers: [[3, 2, 1], [], []],
    });

    const { getByTestId } = render(<MockConsumer />);

    fireEvent.click(getByTestId('tower-1'));
    expect(mockHandleMoveDisk).toHaveBeenCalledWith(0, 1);
    expect(resetSelection).toHaveBeenCalledWith(
      mockSetSelectedDisk,
      mockSetSelectedTower,
    );
  });
});
