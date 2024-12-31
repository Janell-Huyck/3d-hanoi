import { useGame } from '@contexts';
import { resetSelection } from '@utils';

const useClickMovement = () => {
  const {
    selectedDisk,
    setSelectedDisk,
    selectedTower,
    setSelectedTower,
    handleMoveDisk,
    towers,
  } = useGame();

  const handleTowerClick = (towerIndex) => {
    const isEmptyTower = towers[towerIndex].length === 0;

    if (selectedDisk === null) {
      if (isEmptyTower) {
        // Clicking on an empty tower without a selected disk should reset the selection
        resetSelection(setSelectedDisk, setSelectedTower);
      } else {
        // Select the disk from the tower
        setSelectedDisk(towerIndex);
        setSelectedTower(towerIndex);
      }
    } else {
      if (isEmptyTower && selectedTower === towerIndex) {
        // Clicking the same empty tower after selecting should reset the selection
        resetSelection(setSelectedDisk, setSelectedTower);
      } else {
        // Attempt to move the disk
        handleMoveDisk(selectedTower, towerIndex);
        resetSelection(setSelectedDisk, setSelectedTower);
      }
    }
  };

  return { handleTowerClick, selectedDisk, selectedTower };
};

export default useClickMovement;
