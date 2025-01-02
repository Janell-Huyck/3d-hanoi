import React from 'react';
import { useGame } from '@contexts';

const MoveCounter = () => {
  const { moveCount, game } = useGame();
  const minimumMoves = game.calculateMinimumMoves();

  return (
    <div className="move-counter">
      <h2 className="move-count" data-testid="move-count">
        Move Count: {moveCount}
      </h2>
      <h2 className="minimum-moves" data-testid="minimum-moves">
        Minimum Moves: {minimumMoves}
      </h2>
    </div>
  );
};

export default MoveCounter;
