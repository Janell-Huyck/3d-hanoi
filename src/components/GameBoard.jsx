import React from 'react';
import { Tower, Base } from './';

const GameBoard = () => {
  const numberOfTowers = 3;

  return (
    <div className="game-board">
      {Array.from({ length: numberOfTowers }).map((_, index) => (
        <Tower key={index} towerIndex={index} />
      ))}
      <Base />
    </div>
  );
};

export default GameBoard;
