import { useGame } from '@contexts';
import { useRestartGame } from '@hooks';

jest.mock('@contexts', () => ({
  useGame: jest.fn(),
}));

describe('useRestartGame', () => {
  let resetGame;

  beforeEach(() => {
    resetGame = jest.fn();
    useGame.mockReturnValue({ resetGame });
  });

  it('calls resetGame with user input', () => {
    jest.spyOn(window, 'prompt').mockReturnValue('3'); // Simulate user input

    const restartGame = useRestartGame();
    restartGame();

    expect(resetGame).toHaveBeenCalledWith(3);
    window.prompt.mockRestore();
  });

  it('does not call resetGame if input is invalid', () => {
    jest.spyOn(window, 'prompt').mockReturnValue('invalid'); // Simulate invalid input

    const restartGame = useRestartGame();
    restartGame();

    expect(resetGame).not.toHaveBeenCalled();
    window.prompt.mockRestore();
  });
});
