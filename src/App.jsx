import React, { useState } from 'react';
import TowerOfHanoi from './logic/TowerOfHanoi';

const App = () => {
  const [game, setGame] = useState(new TowerOfHanoi(3));
  const [towers, setTowers] = useState(game.towers);

  const handleMove = (fromTower, toTower) => {
    try {
      game.moveDisk(fromTower, toTower);
      setTowers([...game.towers]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Tower of Hanoi</h1>
      {/* Render Towers and Controls */}
    </div>
  );
};

export default App;
