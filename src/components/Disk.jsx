import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import '../styles/Disk.css';

const Disk = ({ size, towerIndex, isTopDisk }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'disk',
    item: { size, sourceTowerIndex: towerIndex },
    canDrag: isTopDisk, // Only allow dragging the top disk
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [isTopDisk]); // Reinitialize if `isTopDisk` changes

  useEffect(() => {
    if (preview) {
      preview(null); // Disable default drag preview for performance
    }
  }, [preview]);

  // Determine classes for size and color
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  const colorClass = colors[size - 1] || colors[colors.length - 1];
  const sizeClass = `size-${size}`;
  const diskClass = `disk ${colorClass} ${sizeClass}`;

  return (
    <div
      ref={drag} // Always assign ref, even for non-draggable disks
      className={diskClass}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isTopDisk ? 'grab' : 'not-allowed', // Show not-allowed cursor for non-top disks
      }}
    >
      {size}
    </div>
  );
};

Disk.propTypes = {
  size: PropTypes.number.isRequired,
  towerIndex: PropTypes.number.isRequired,
  isTopDisk: PropTypes.bool.isRequired, // Indicate if the disk is the top one
};

export default Disk;
