import { useDrag, useDrop } from 'react-dnd';
import { useGame } from '@contexts';
import { resetSelection } from '@utils';

export const useDiskDrag = (size, towerIndex, isTopDisk) => {
  const { setSelectedDisk, setSelectedTower } = useGame();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'disk',
    item: () => {
      resetSelection(setSelectedDisk, setSelectedTower); // Reset selection when drag starts
      return { size, sourceTowerIndex: towerIndex };
    },
    canDrag: isTopDisk,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [isTopDisk, towerIndex, setSelectedDisk, setSelectedTower]);

  return { isDragging, drag };
};

export const useTowerDrop = (towerIndex, onDiskDrop) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'disk',
    drop: (item) => onDiskDrop(item.sourceTowerIndex, towerIndex),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return { isOver, drop };
};
