import React from 'react';
import { useGame } from '@contexts';

const GameMessages = () => {
  const { victoryMessage, invalidMoveMessage } = useGame();

  return (
    <div className="game-messages">
      <h2
        className="victory-message"
        style={{ visibility: victoryMessage ? 'visible' : 'hidden' }}
      >
        {victoryMessage}
      </h2>
      <h3
        className="error-message"
        style={{ visibility: invalidMoveMessage ? 'visible' : 'hidden' }}
      >
        {invalidMoveMessage}
      </h3>
    </div>
  );
};

export default GameMessages;
