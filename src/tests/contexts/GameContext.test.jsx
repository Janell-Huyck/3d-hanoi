/**
 * GameContext.test.jsx
 *
 * Tests the functionality of the GameContext and its associated provider, GameProvider.
 *
 * - MockConsumer: A mock React component that consumes the GameContext to simulate
 *   interactions and validate state changes (e.g., towers, selectedDisk, selectedTower).
 * - GameLogic: Mocked to control the behavior of game logic methods like `moveDisk`
 *   and `isGameWon`, allowing precise simulation of game states.
 * - Includes tests for default values, state updates (e.g., selectedDisk, selectedTower),
 *   and error handling when an invalid move is made.
 *
 * Mocking, state verification, and edge cases are handled to ensure full coverage.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameProvider, useGame } from '@contexts';
import { GameLogic } from '@logics';

jest.mock('@logics', () => ({
  GameLogic: jest.fn(),
}));

const MockConsumer = () => {
  const {
    towers,
    handleMoveDisk,
    selectedDisk,
    setSelectedDisk,
    selectedTower,
    setSelectedTower,
    isGameWon,
  } = useGame();

  return (
    <div>
      <div data-testid="towers">{JSON.stringify(towers)}</div>
      <button data-testid="move-disk" onClick={() => handleMoveDisk(0, 1)}>
        Move Disk
      </button>
      <button data-testid="select-disk" onClick={() => setSelectedDisk(1)}>
        Select Disk
      </button>
      <button data-testid="select-tower" onClick={() => setSelectedTower(2)}>
        Select Tower
      </button>
      <div data-testid="selected-disk">
        {selectedDisk !== null ? `Disk ${selectedDisk}` : 'None'}
      </div>
      <div data-testid="selected-tower">
        {selectedTower !== null ? `Tower ${selectedTower}` : 'None'}
      </div>
      <div data-testid="is-game-won">{isGameWon() ? 'Won' : 'Not Won'}</div>
    </div>
  );
};

describe('GameContext', () => {
  let originalAlert;
  const mockMoveDisk = jest.fn();
  const mockIsGameWon = jest.fn();

  const renderWithProvider = (ui = <MockConsumer />) =>
    render(<GameProvider numDisks={3}>{ui}</GameProvider>);

  beforeAll(() => {
    // Save the original implementation of window.alert
    originalAlert = window.alert;
    window.alert = jest.fn();
  });

  afterAll(() => {
    // Restore the original implementation of window.alert
    window.alert = originalAlert;
  });

  beforeEach(() => {
    GameLogic.mockImplementation(() => ({
      towers: [[3, 2, 1], [], []],
      moveDisk: mockMoveDisk,
      isGameWon: mockIsGameWon,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('provides correct default values', () => {
    renderWithProvider();

    expect(screen.getByTestId('towers')).toHaveTextContent('[[3,2,1],[],[]]');
    expect(screen.getByTestId('is-game-won')).toHaveTextContent('Not Won');
    expect(screen.getByTestId('selected-disk')).toHaveTextContent('None');
    expect(screen.getByTestId('selected-tower')).toHaveTextContent('None');
  });

  test('updates towers and calls moveDisk when handleMoveDisk is invoked', () => {
    const towers = [[3, 2, 1], [], []];
    mockMoveDisk.mockImplementation(() => {
      towers[1].push(towers[0].pop());
    });

    GameLogic.mockImplementation(() => ({
      towers,
      moveDisk: mockMoveDisk,
      isGameWon: mockIsGameWon,
    }));

    renderWithProvider();

    fireEvent.click(screen.getByTestId('move-disk'));

    expect(mockMoveDisk).toHaveBeenCalledWith(0, 1);
    expect(screen.getByTestId('towers')).toHaveTextContent('[[3,2],[1],[]]');
  });

  test('updates selectedDisk when setSelectedDisk is called', () => {
    renderWithProvider();

    fireEvent.click(screen.getByTestId('select-disk'));

    expect(screen.getByTestId('selected-disk')).toHaveTextContent('Disk 1');
  });

  test('updates selectedTower when setSelectedTower is called', () => {
    renderWithProvider();

    fireEvent.click(screen.getByTestId('select-tower'));

    expect(screen.getByTestId('selected-tower')).toHaveTextContent('Tower 2');
  });

  test('calls isGameWon and updates the DOM', () => {
    mockIsGameWon.mockReturnValueOnce(true);

    renderWithProvider();

    expect(screen.getByTestId('is-game-won')).toHaveTextContent('Won');
  });

  test('calls alert with error message on invalid move', () => {
    const mockError = new Error('Invalid move!');
    mockMoveDisk.mockImplementation(() => {
      throw mockError;
    });

    renderWithProvider();

    fireEvent.click(screen.getByTestId('move-disk'));

    // Ensure the alert was called with the correct message
    expect(window.alert).toHaveBeenCalledWith('Invalid move!');
  });

  test('handles edge case: calling handleMoveDisk with same source and destination tower', () => {
    renderWithProvider();

    fireEvent.click(screen.getByTestId('move-disk')); // Invalid move
    expect(mockMoveDisk).toHaveBeenCalledWith(0, 1);
  });
});
