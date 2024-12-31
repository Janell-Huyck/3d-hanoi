import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '@contexts';
import { useDiskDrag } from '@hooks';
import { isTopDisk, getDiskColor } from '@utils';

const Disk = ({ size, towerIndex }) => {
  const { towers } = useGame(); // Access towers from GameContext
  const topDisk = isTopDisk(towers, towerIndex, size); // Use utility function

  const { isDragging, drag } = useDiskDrag(size, towerIndex, topDisk);

  const colorClass = getDiskColor(size); // Get color from utility
  const sizeClass = `size-${size}`;

  return (
    <div
      ref={drag}
      className={`disk ${colorClass} ${sizeClass}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: topDisk ? 'grab' : 'not-allowed',
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
