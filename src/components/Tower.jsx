import React from 'react';
import PropTypes from 'prop-types';
import { useGame, useClickMovementContext, useDndContext } from '../context';
import { Disk, TowerSpike } from './';

const Tower = ({ towerIndex }) => {
  const { towers, handleMoveDisk } = useGame();
  const { handleTowerClick, selectedTower } = useClickMovementContext();
  const { useTowerDrop } = useDndContext();
  const { isOver, drop } = useTowerDrop(towerIndex, handleMoveDisk);

  return (
    <div
      ref={drop}
      className={`tower ${selectedTower === towerIndex ? 'selected' : ''} ${
        isOver ? 'hovered' : ''
      }`}
      onClick={() => handleTowerClick(towerIndex)}
    >
      <TowerSpike key={ towerIndex } />
      {towers[towerIndex].map((disk) => (
        <Disk key={disk} size={disk} towerIndex={towerIndex} />
      ))}
    </div>
  );
};

Tower.propTypes = {
  towerIndex: PropTypes.number.isRequired,
};

export default Tower;
