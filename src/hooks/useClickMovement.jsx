import { useState } from 'react';

const useClickMovement = (handleMoveDisk) => {
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null);

  const handleTowerClick = (towerIndex) => {
    if (selectedDisk === null) {
      setSelectedDisk(towerIndex); // Select the disk from the tower
      setSelectedTower(towerIndex); // Record the selected tower
    } else {
      handleMoveDisk(selectedTower, towerIndex); // Attempt to move the disk
      resetSelection(); // Clear selection
    }
  };

  const resetSelection = () => {
    setSelectedDisk(null);
    setSelectedTower(null);
  };

  return { handleTowerClick, resetSelection, selectedDisk, selectedTower };
};

export default useClickMovement;
