export const resetSelection = (setSelectedDisk, setSelectedTower) => {
  setSelectedDisk(null);
  setSelectedTower(null);
};

export const isTopDisk = (towers, towerIndex, size) => {
  const diskIndex = towers[towerIndex].indexOf(size);
  return diskIndex !== -1 && diskIndex === towers[towerIndex].length - 1;
};
