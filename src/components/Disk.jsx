import React from 'react';
import PropTypes from 'prop-types';
import { useGame, useDndContext } from '../context';

const Disk = ({ size, towerIndex }) => {
  const { towers } = useGame();
  const { useDiskDrag } = useDndContext();
  const { isDragging, drag } = useDiskDrag(size, towerIndex);

  const isTopDisk = towers[towerIndex].indexOf(size) === towers[towerIndex].length - 1;

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  const colorClass = colors[(size - 1) % colors.length];
  const sizeClass = `size-${size}`;

  return (
    <div
      ref={drag}
      className={`disk ${colorClass} ${sizeClass}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isTopDisk ? 'grab' : 'not-allowed',
      }}
    >
      {size}
    </div>
  );
};

Disk.propTypes = {
  size: PropTypes.number.isRequired,
  towerIndex: PropTypes.number.isRequired,
};

export default Disk;
