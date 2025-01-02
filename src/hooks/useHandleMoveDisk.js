import { useCallback, useRef } from 'react';
import { incrementMoveCount } from '@utils';
import { VICTORY_MESSAGE, INVALID_MOVE_MESSAGE } from '@constants';

export const useHandleMoveDisk = ({
  game,
  setTowers,
  setMoveCount,
  setVictoryMessage,
  setInvalidMoveMessage,
}) => {
  const gameRef = useRef(game);
  gameRef.current = game;

  const handleMoveDisk = useCallback(
    (fromTower, toTower) => {
      try {
        gameRef.current.moveDisk(fromTower, toTower);
        setTowers([...gameRef.current.towers]); // Update the towers state
        incrementMoveCount(setMoveCount); // Increment move count
        if (gameRef.current.isGameWon()) {
          setVictoryMessage(VICTORY_MESSAGE);
        }
      } catch {
        setInvalidMoveMessage(INVALID_MOVE_MESSAGE);
      }
    },
    [game, setTowers, setMoveCount, setVictoryMessage, setInvalidMoveMessage], // Dependencies
  );

  return handleMoveDisk;
};
