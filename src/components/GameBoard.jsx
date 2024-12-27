import React from 'react';
import '../styles/GameBoard.css';
import Tower from './Tower';
import Base from './Base'

const GameBoard = () => {
  const initialConfiguration = [
    [7, 6, 5, 4, 3, 2, 1], // Disks on Tower 1
    [],        // Tower 2 is empty
    []         // Tower 3 is empty
  ];

  const maxDiskSize = initialConfiguration.reduce(
    (max, disks) => Math.max(max, ...disks),
    0
  );

  return (
    <div className="game-board">
      <div className="tower-container">
        {initialConfiguration.map((towerDisks, index) => (
          <Tower
            key={index}
            disks={towerDisks}
            towerIndex={index + 1}
            maxDiskSize={maxDiskSize}
          />
        ))}
      </div>
      <Base />
    </div>
  );
};

export default GameBoard;
