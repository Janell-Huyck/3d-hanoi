import React from 'react';
import { useRestartGame } from '@hooks';

const RestartButton = () => {
  const restartGame = useRestartGame();

  return <button onClick={restartGame}>Restart Game</button>;
};

export default RestartButton;
