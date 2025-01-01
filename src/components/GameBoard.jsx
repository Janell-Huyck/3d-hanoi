import React from 'react';
import { Tower, Base } from '@components';

const GameBoard = () => {
  const numberOfTowers = 3;

  return (
    <div className="game-board">
      {Array.from({ length: numberOfTowers }).map((_, index) => (
        <Tower key={index} towerIndex={index} data-testid={`tower-${index}`} />
      ))}
      <Base />
    </div>
  );
};

export default GameBoard;
