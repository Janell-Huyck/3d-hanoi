import React, { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import GameLogic from "../logic/gameLogic";

// Create the context
const GameContext = createContext();

// Custom hook to use GameContext
export const useGame = () => {
  return useContext(GameContext);
};

// Provider component
const GameProvider = ({ numDisks, children }) => {
  const [game] = useState(new GameLogic(numDisks));
  const [towers, setTowers] = useState([...game.towers]);

  const handleMoveDisk = useCallback(
    (fromTower, toTower) => {
      try {
        game.moveDisk(fromTower, toTower);
        setTowers([...game.towers]);
      } catch (error) {
        alert(error.message);
      }
    },
    [game]
  );

  const value = {
    towers,
    handleMoveDisk,
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
