import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GameLogic } from '@logics';

// Create the context
const GameContext = createContext();

// Custom hook to use GameContext
export const useGame = () => {
  return useContext(GameContext);
};

// Provider component
const GameProvider = ({ numDisks, children }) => {
  const [game] = useState(() => new GameLogic(numDisks));
  const [towers, setTowers] = useState([...game.towers]);
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null);
  const [victoryMessage, setVictoryMessage] = useState('');
  const [invalidMoveMessage, setInvalidMoveMessage] = useState('');

  const handleMoveDisk = useCallback(
    (fromTower, toTower) => {
      try {
        game.moveDisk(fromTower, toTower);
        setTowers([...game.towers]);

        if (game.isGameWon()) {
          setVictoryMessage('Congratulations! You have won the game!');
        }
      } catch (error) {
        setInvalidMoveMessage(error.message);
      }
    },
    [game], // Dependency on `game`
  );

  const value = {
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
    isGameWon: game.isGameWon.bind(game),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Define prop types for GameProvider
GameProvider.propTypes = {
  numDisks: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default GameProvider;
