import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Disk.css';

const Disk = ({ size }) => {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  const colorClass = colors[size - 1] || colors[colors.length - 1];
  const sizeClass = `size-${size}`;

  return <div className={`disk ${colorClass} ${sizeClass}`} />;
};

Disk.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Disk;
