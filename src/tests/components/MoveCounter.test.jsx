import React from 'react';
import { render, screen } from '@testing-library/react';
import { useGame } from '@contexts';
import MoveCounter from '@components/MoveCounter';

// Mock gameContext
jest.mock('@contexts', () => ({
  useGame: jest.fn(),
}));

describe('MoveCounter Component', () => {
  beforeEach(() => {
    useGame.mockReturnValue({
      moveCount: 3,
      game: {
        calculateMinimumMoves: jest.fn(() => 7),
      },
    });
  });

  it('renders correctly with provided props', () => {
    render(<MoveCounter />);

    // Check that the move count is displayed correctly
    expect(screen.getByText('Move Count: 3')).toBeInTheDocument();

    // Check that the minimum moves is displayed correctly
    expect(screen.getByText('Minimum Moves: 7')).toBeInTheDocument();
  });
});
