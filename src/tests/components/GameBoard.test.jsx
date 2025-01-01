import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { GameBoard } from '@components';

jest.mock('@components/Tower', () => ({
  __esModule: true, // Ensures it can be imported as an ES module
  default: jest.fn(() => <div data-testid="tower-mock"></div>),
}));

jest.mock('@components/Base', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="base-mock"></div>),
}));

jest.mock('@contexts', () => ({
  useGame: jest.fn(() => ({
    towers: [[], [], []],
    handleMoveDisk: jest.fn(),
  })),
}));

describe('GameBoard Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<GameBoard />);
    expect(container).toBeInTheDocument();
  });

  test('renders the correct number of Tower components', () => {
    const { getAllByTestId } = render(<GameBoard />);
    const towers = getAllByTestId('tower-mock');
    expect(towers).toHaveLength(3); // GameBoard has 3 towers
  });

  test('renders the Base component', () => {
    const { getByTestId } = render(<GameBoard />);
    const base = getByTestId('base-mock');
    expect(base).toBeInTheDocument();
  });

  test('has the correct structure and className', () => {
    const { container } = render(<GameBoard />);
    const gameBoard = container.firstChild;

    expect(gameBoard).toHaveClass('game-board');
    expect(gameBoard.childNodes).toHaveLength(4); // 3 Towers + Base
  });

  test('does not introduce accessibility violations', async () => {
    const { container } = render(<GameBoard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
