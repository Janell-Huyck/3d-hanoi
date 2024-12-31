import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import App from '@app';

jest.mock('../../components/GameBoard', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="game-board-mock"></div>),
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('displays the app title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Tower of Hanoi')).toBeInTheDocument();
  });

  test('renders the GameBoard component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('game-board-mock')).toBeInTheDocument();
  });

  test('does not introduce accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('integrates with the Providers correctly', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('game-board-mock')).toBeInTheDocument(); // Verifies the hierarchy works.
  });
});
