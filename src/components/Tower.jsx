import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '@contexts';
import { Disk, TowerSpike } from '@components';
import { useClickMovement, useTowerDrop } from '@hooks';

const Tower = ({ towerIndex, ...props }) => {
  const { towers, handleMoveDisk, selectedTower } = useGame();
  const { handleTowerClick } = useClickMovement();
  const { isOver, drop } = useTowerDrop(towerIndex, handleMoveDisk);

  return (
    <div
      ref={drop}
      className={`tower ${selectedTower === towerIndex ? 'selected' : ''} ${
        isOver ? 'hovered' : ''
      }`}
      {...props}
      onClick={() => handleTowerClick(towerIndex)}
    >
      <TowerSpike key={towerIndex} />
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
