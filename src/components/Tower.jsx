import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import Disk from './Disk';
import TowerSpike from './TowerSpike';
import '../styles/Tower.css';

const Tower = ({ towerIndex, disks, isSelected, onTowerClick, onDiskDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'disk',
    drop: (item) => onDiskDrop(item.sourceTowerIndex, towerIndex),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`tower ${isSelected ? 'selected' : ''} ${isOver ? 'hovered' : ''}`}
      onClick={() => onTowerClick(towerIndex)}
    >
      <TowerSpike />
      {disks.map((disk, index) => (
        <Disk
          key={index}
          size={disk}
          towerIndex={towerIndex}
          isTopDisk={index === disks.length - 1} // Only the last disk in the array is draggable
        />
      ))}
    </div>
  );
};

Tower.propTypes = {
  towerIndex: PropTypes.number.isRequired,
  disks: PropTypes.arrayOf(PropTypes.number).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onTowerClick: PropTypes.func.isRequired,
  onDiskDrop: PropTypes.func.isRequired,
};

export default Tower;
