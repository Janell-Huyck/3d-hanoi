import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tower.css';
import Disk from './Disk';
import TowerSpike from './TowerSpike';

const Tower = ({ disks, maxDiskSize }) => {
  const towerClass = `tower-max-${maxDiskSize}`;

  return (
    <div className={`tower ${towerClass}`}>
      <TowerSpike />
      {disks.map((disk, index) => (
        <Disk key={index} size={disk} maxSize={maxDiskSize} />
      ))}
    </div>
  );
};

Tower.propTypes = {
  disks: PropTypes.arrayOf(PropTypes.number).isRequired,
  maxDiskSize: PropTypes.number.isRequired,
};

export default Tower;
