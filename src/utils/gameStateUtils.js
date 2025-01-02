export const resetSelection = (setSelectedDisk, setSelectedTower) => {
  setSelectedDisk(null);
  setSelectedTower(null);
};

export const isTopDisk = (towers, towerIndex, size) => {
  const diskIndex = towers[towerIndex].indexOf(size);
  return diskIndex !== -1 && diskIndex === towers[towerIndex].length - 1;
};

export const clearMessages = (setInvalidMoveMessage, setVictoryMessage) => {
  setInvalidMoveMessage('');
  setVictoryMessage('');
};

export const incrementMoveCount = (setMoveCount) => {
  setMoveCount((prevCount) => prevCount + 1);
};
