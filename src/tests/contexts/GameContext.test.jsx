import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameProvider, DndProviderContext } from '@contexts';
import { GameLogic } from '@logics';
import { GameBoard, GameMessages } from '@components';

jest.mock('@logics', () => ({
  GameLogic: jest.fn(),
}));

jest.mock('@utils/gameStateUtils', () => ({
  clearMessages: jest.fn(),
  resetSelection: jest.fn(),
  isTopDisk: jest.fn(),
}));

describe('handleMoveDisk behavior', () => {
  let mockMoveDisk, mockIsGameWon;
  const towers = [[3, 2, 1], [], []];

  const renderWithProvider = ({ ui = null, numDisks = 2 } = {}) => {
    return render(
      <GameProvider numDisks={numDisks}>
        <DndProviderContext>
          <div>
            <GameMessages />
            {ui || <GameBoard />}
          </div>
        </DndProviderContext>
      </GameProvider>,
    );
  };

  beforeEach(() => {
    mockMoveDisk = jest.fn();
    mockIsGameWon = jest.fn();

    GameLogic.mockImplementation(() => ({
      towers,
      moveDisk: mockMoveDisk,
      isGameWon: mockIsGameWon,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('updates towers and does not set messages on a valid move', () => {
    renderWithProvider();

    mockMoveDisk.mockImplementation(() => {
      towers[1].push(towers[0].pop());
    });

    // Perform a valid move
    fireEvent.click(screen.getByTestId('tower-0'));
    fireEvent.click(screen.getByTestId('tower-1'));

    // Validate towers are updated and no messages are set
    expect(towers).toEqual([[3, 2], [1], []]);
    expect(screen.queryByText(/Invalid move!/i)).toBeNull();
    expect(screen.queryByText(/Congratulations!/i)).toBeNull();
  });

  test('sets victory message when game is won', () => {
    renderWithProvider();

    mockMoveDisk.mockImplementation(() => {
      towers[1].push(towers[0].pop());
    });

    mockIsGameWon.mockReturnValueOnce(true);

    // Perform the winning move
    fireEvent.click(screen.getByTestId('tower-0'));
    fireEvent.click(screen.getByTestId('tower-1'));

    // Validate victory message is set
    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
  });

  test('sets invalid move message on an invalid move', () => {
    renderWithProvider();

    mockMoveDisk.mockImplementation(() => {
      throw new Error('Invalid move!');
    });

    // Perform an invalid move (Error is thrown by mockMoveDisk above)
    fireEvent.click(screen.getByTestId('tower-0'));
    fireEvent.click(screen.getByTestId('tower-1'));

    // Validate invalid move message is set
    expect(screen.getByText(/Invalid move!/i)).toBeInTheDocument();
  });
});
