import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@app';
import { useGame } from '@contexts/GameContext';

// Mock necessary components and hooks
jest.mock('@contexts/GameContext', () => ({
  useGame: jest.fn(),
}));

jest.mock('@contexts/Providers', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => (
    <div data-testid="providers">{children}</div>
  )),
}));

jest.mock('@components/GameMessages', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="game-messages">Game Messages</div>),
}));

jest.mock('@components/MoveCounter', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="move-counter">Move Counter</div>),
}));

jest.mock('@components/RestartButton', () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="restart-button">Restart Button</div>
  )),
}));

jest.mock('@components/GameBoard', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="game-board">Game Board</div>),
}));

describe('App', () => {
  beforeEach(() => {
    // Mock `useGame` to provide default values
    useGame.mockReturnValue({
      victoryMessage: '',
      invalidMoveMessage: '',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Tower of Hanoi')).toBeInTheDocument();
  });

  it('renders GameMessages', () => {
    render(<App />);
    expect(screen.getByTestId('game-messages')).toBeInTheDocument();
  });

  it('renders MoveCounter', () => {
    render(<App />);
    expect(screen.getByTestId('move-counter')).toBeInTheDocument();
  });

  it('renders RestartButton', () => {
    render(<App />);
    expect(screen.getByTestId('restart-button')).toBeInTheDocument();
  });

  it('renders GameBoard', () => {
    render(<App />);
    expect(screen.getByTestId('game-board')).toBeInTheDocument();
  });

  it('wraps all components inside Providers', () => {
    render(<App />);
    const appContainer = screen.getByRole('main');
    expect(appContainer).toContainElement(screen.getByTestId('game-messages'));
    expect(appContainer).toContainElement(screen.getByTestId('move-counter'));
    expect(appContainer).toContainElement(screen.getByTestId('restart-button'));
    expect(appContainer).toContainElement(screen.getByTestId('game-board'));
  });
});
