import React from 'react';
import PropTypes from 'prop-types';
import Tower from './Tower';
import Base from './Base'
import '../styles/GameBoard.css';

const GameBoard = ({
  towers,
  selectedTower,
  selectedDisk,
  onTowerClick,
  onDiskDrop,
}) => {
  return (
    <div className="game-board">
      {towers.map((tower, towerIndex) => (
        <Tower
          key={towerIndex}
          towerIndex={towerIndex}
          disks={tower}
          isSelected={selectedTower === towerIndex}
          selectedDisk={selectedDisk}
          onTowerClick={onTowerClick}
          onDiskDrop={onDiskDrop}
        />
      ))}
      <Base />
    </div>
  );
};

GameBoard.propTypes = {
  towers: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectedTower: PropTypes.number,
  selectedDisk: PropTypes.number,
  onTowerClick: PropTypes.func.isRequired,
  onDiskDrop: PropTypes.func.isRequired,
};

export default GameBoard;
