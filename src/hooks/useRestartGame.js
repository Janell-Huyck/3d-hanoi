import { useGame } from '@contexts';

export const useRestartGame = () => {
  const { resetGame } = useGame();

  const restartGame = () => {
    const newNumDisks = prompt('Enter the number of disks for the new game:');
    if (newNumDisks && !isNaN(newNumDisks)) {
      resetGame(Number(newNumDisks));
    }
  };

  return restartGame;
};
