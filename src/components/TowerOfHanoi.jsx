import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './GameBoard';
import GameLogic from '../logic/gameLogic';

const TowerOfHanoi = ({ numDisks }) => {
  const [game] = useState(new GameLogic(numDisks)); // Game logic instance
  const [towers, setTowers] = useState([...game.towers]); // Tower state
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null);

  // Update the towers state after any move
  const updateTowersState = () => {
    setTowers([...game.towers]);
    setSelectedDisk(null); // Clear any selected disk
    setSelectedTower(null); // Clear any selected tower
  };

  const handleTowerClick = (towerIndex) => {
    if (selectedDisk === null) {
      const tower = towers[towerIndex];
      if (tower.length > 0) {
        setSelectedDisk(tower[tower.length - 1]);
        setSelectedTower(towerIndex);
      }
    } else {
      try {
        game.moveDisk(selectedTower, towerIndex);
        updateTowersState(); // Update state after the move
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleDiskDrop = (sourceTowerIndex, targetTowerIndex) => {
    try {
      game.moveDisk(sourceTowerIndex, targetTowerIndex);
      updateTowersState(); // Update state after the move
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <GameBoard
        towers={towers}
        selectedTower={selectedTower}
        selectedDisk={selectedDisk}
        onTowerClick={handleTowerClick}
        onDiskDrop={handleDiskDrop}
      />
    </DndProvider>
  );
};

TowerOfHanoi.propTypes = {
  numDisks: PropTypes.number.isRequired,
};

export default TowerOfHanoi;
