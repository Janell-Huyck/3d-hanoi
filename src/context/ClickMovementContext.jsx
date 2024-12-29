import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useGame } from './';
import { useClickMovement } from '../hooks';

const ClickMovementContext = createContext();

export const useClickMovementContext = () => useContext(ClickMovementContext);

export const ClickMovementProvider = ({ children }) => {
  const { handleMoveDisk } = useGame();
  const { handleTowerClick, resetSelection, selectedDisk, selectedTower } = useClickMovement(handleMoveDisk);

  const value = {
    handleTowerClick,
    resetSelection,
    selectedDisk,
    selectedTower,
  };

  return (
    <ClickMovementContext.Provider value={value}>
      {children}
    </ClickMovementContext.Provider>
  );
};

ClickMovementProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClickMovementContext;
