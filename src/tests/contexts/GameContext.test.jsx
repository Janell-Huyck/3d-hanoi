import React from 'react';
import { render, act } from '@testing-library/react';
import { GameProvider, useGame } from '@contexts';
import { GameLogic } from '@logics';

jest.mock('@logics', () => ({
  GameLogic: jest.fn(),
}));

jest.mock('@hooks', () => ({
  useHandleMoveDisk: jest.fn(() => jest.fn()), // Mock the hook as a no-op function
}));

describe('GameContext', () => {
  let mockGameInstance;

  beforeEach(() => {
    // Mock the GameLogic instance
    mockGameInstance = {
      towers: [[3, 2, 1], [], []],
      isGameWon: jest.fn(),
    };

    GameLogic.mockImplementation((numDisks) => {
      return {
        towers: [
          Array.from({ length: numDisks }, (_, i) => numDisks - i),
          [],
          [],
        ],
        isGameWon: jest.fn(),
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = () => {
    const {
      numDisks,
      towers,
      resetGame,
      victoryMessage,
      invalidMoveMessage,
      moveCount,
      selectedDisk,
      selectedTower,
    } = useGame();

    return (
      <div>
        <div data-testid="num-disks">{numDisks}</div>
        <div data-testid="towers">{JSON.stringify(towers)}</div>
        <div data-testid="victory-message">{victoryMessage}</div>
        <div data-testid="invalid-move-message">{invalidMoveMessage}</div>
        <div data-testid="move-count">{moveCount}</div>
        <div data-testid="selected-disk">{JSON.stringify(selectedDisk)}</div>
        <div data-testid="selected-tower">{JSON.stringify(selectedTower)}</div>
        <button data-testid="reset-button" onClick={() => resetGame(4)}>
          Reset Game
        </button>
      </div>
    );
  };

  it('initializes with default values', () => {
    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    expect(getByTestId('num-disks').textContent).toBe('3'); // Default disks
    expect(getByTestId('towers').textContent).toBe(
      JSON.stringify([[3, 2, 1], [], []]), // Default towers
    );
    expect(getByTestId('victory-message').textContent).toBe(''); // Default empty message
    expect(getByTestId('invalid-move-message').textContent).toBe(''); // Default empty message
    expect(getByTestId('move-count').textContent).toBe('0'); // Default move count
  });

  it('initializes with a custom number of disks', () => {
    mockGameInstance.towers = [[5, 4, 3, 2, 1], [], []];

    const { getByTestId } = render(
      <GameProvider initialNumDisks={5}>
        <TestComponent />
      </GameProvider>,
    );

    expect(getByTestId('num-disks').textContent).toBe('5'); // Custom disks
    expect(getByTestId('towers').textContent).toBe(
      JSON.stringify([[5, 4, 3, 2, 1], [], []]), // Custom towers
    );
  });

  it('resets the game with a new number of disks', async () => {
    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    // Trigger reset
    await act(async () => {
      getByTestId('reset-button').click();
    });

    // Ensure GameLogic was initialized with the new disk count
    expect(GameLogic).toHaveBeenCalledWith(4);

    // Wait for state updates and validate the towers
    expect(getByTestId('num-disks').textContent).toBe('4'); // Updated disks
    expect(getByTestId('towers').textContent).toBe(
      JSON.stringify([[4, 3, 2, 1], [], []]), // Updated towers
    );

    // Verify reset state
    expect(getByTestId('move-count').textContent).toBe('0'); // Reset move count
    expect(getByTestId('victory-message').textContent).toBe(''); // Reset victory message
    expect(getByTestId('invalid-move-message').textContent).toBe(''); // Reset invalid move message

    expect(getByTestId('selected-disk').textContent).toBe('null'); // Disk reset
    expect(getByTestId('selected-tower').textContent).toBe('null'); // Tower reset
  });

  it('provides all required values and functions', () => {
    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>,
    );

    expect(getByTestId('num-disks')).toBeInTheDocument();
    expect(getByTestId('towers')).toBeInTheDocument();
    expect(getByTestId('victory-message')).toBeInTheDocument();
    expect(getByTestId('invalid-move-message')).toBeInTheDocument();
    expect(getByTestId('move-count')).toBeInTheDocument();
    expect(getByTestId('reset-button')).toBeInTheDocument();
  });
});
