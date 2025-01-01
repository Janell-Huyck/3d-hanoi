import React from 'react';
import { render, screen } from '@testing-library/react';
import GameMessages from '@components/GameMessages';
import { useGame } from '@contexts';

// Mock the `useGame` hook
jest.mock('@contexts', () => ({
  useGame: jest.fn(),
}));

describe('GameMessages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders victory and invalid move messages as hidden when no messages are provided', () => {
    useGame.mockReturnValue({
      victoryMessage: '',
      invalidMoveMessage: '',
    });

    render(<GameMessages />);

    const victoryMessage = screen.getByText('', {
      selector: 'h2.victory-message',
    });
    const invalidMoveMessage = screen.getByText('', {
      selector: 'h3.error-message',
    });

    // Ensure both messages exist but are hidden
    expect(victoryMessage).toBeInTheDocument();
    expect(victoryMessage).toHaveStyle('visibility: hidden');
    expect(invalidMoveMessage).toBeInTheDocument();
    expect(invalidMoveMessage).toHaveStyle('visibility: hidden');
  });

  it('renders a visible victory message when provided', () => {
    useGame.mockReturnValue({
      victoryMessage: 'You win!',
      invalidMoveMessage: '',
    });

    render(<GameMessages />);

    const victoryMessage = screen.getByText('You win!', {
      selector: 'h2.victory-message',
    });

    // Ensure the victory message is visible
    expect(victoryMessage).toBeInTheDocument();
    expect(victoryMessage).toHaveStyle('visibility: visible');
  });

  it('renders a visible invalid move message when provided', () => {
    useGame.mockReturnValue({
      victoryMessage: '',
      invalidMoveMessage: 'Invalid move!',
    });

    render(<GameMessages />);

    const invalidMoveMessage = screen.getByText('Invalid move!', {
      selector: 'h3.error-message',
    });

    // Ensure the invalid move message is visible
    expect(invalidMoveMessage).toBeInTheDocument();
    expect(invalidMoveMessage).toHaveStyle('visibility: visible');
  });

  it('renders both messages as visible when both are provided', () => {
    useGame.mockReturnValue({
      victoryMessage: 'You win!',
      invalidMoveMessage: 'Invalid move!',
    });

    render(<GameMessages />);

    const victoryMessage = screen.getByText('You win!', {
      selector: 'h2.victory-message',
    });
    const invalidMoveMessage = screen.getByText('Invalid move!', {
      selector: 'h3.error-message',
    });

    // Ensure both messages are visible
    expect(victoryMessage).toBeInTheDocument();
    expect(victoryMessage).toHaveStyle('visibility: visible');
    expect(invalidMoveMessage).toBeInTheDocument();
    expect(invalidMoveMessage).toHaveStyle('visibility: visible');
  });
});
