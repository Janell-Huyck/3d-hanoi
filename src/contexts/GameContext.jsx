import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GameLogic } from '@logics';
import { useHandleMoveDisk } from '@hooks';

// Create the context
const GameContext = createContext();

// Custom hook to use GameContext
export const useGame = () => {
  return useContext(GameContext);
};

// Provider component
const GameProvider = ({ initialNumDisks = 3, children }) => {
  const [numDisks, setNumDisks] = useState(initialNumDisks);
  const [game, setGame] = useState(() => new GameLogic(numDisks));
  const [towers, setTowers] = useState([...game.towers]);
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null);
  const [victoryMessage, setVictoryMessage] = useState('');
  const [invalidMoveMessage, setInvalidMoveMessage] = useState('');
  const [moveCount, setMoveCount] = useState(0);

  const handleMoveDisk = useHandleMoveDisk({
    game,
    setTowers,
    setMoveCount,
    setVictoryMessage,
    setInvalidMoveMessage,
  });

  const resetGame = useCallback((newNumDisks) => {
    const newGame = new GameLogic(newNumDisks);
    setNumDisks(newNumDisks);
    setGame(newGame);
    setTowers([...newGame.towers]);
    setMoveCount(0);
    setVictoryMessage('');
    setInvalidMoveMessage('');
    setSelectedDisk(null);
    setSelectedTower(null);
  }, []);

  const value = {
    numDisks,
    setNumDisks,
    towers,
    handleMoveDisk,
    selectedDisk,
    setSelectedDisk,
    selectedTower,
    setSelectedTower,
    setVictoryMessage,
    victoryMessage,
    setInvalidMoveMessage,
    invalidMoveMessage,
    moveCount,
    isGameWon: game.isGameWon.bind(game),
    game,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialNumDisks: PropTypes.number,
};

export default GameProvider;
