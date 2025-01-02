import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RestartButton } from '@components';
import { useRestartGame } from '@hooks';

jest.mock('@hooks', () => ({
  useRestartGame: jest.fn(),
}));

describe('RestartButton Component', () => {
  it('renders the restart button', () => {
    useRestartGame.mockReturnValue(jest.fn());
    render(<RestartButton />);

    expect(screen.getByText('Restart Game')).toBeInTheDocument();
  });

  it('calls restartGame when clicked', () => {
    const mockRestartGame = jest.fn();
    useRestartGame.mockReturnValue(mockRestartGame);

    render(<RestartButton />);
    fireEvent.click(screen.getByText('Restart Game'));

    expect(mockRestartGame).toHaveBeenCalled();
  });
});
