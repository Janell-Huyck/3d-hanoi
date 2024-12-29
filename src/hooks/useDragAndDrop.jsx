import { useDrag, useDrop } from 'react-dnd';
import { useClickMovementContext } from '../context';

export const useDiskDrag = (size, towerIndex, isTopDisk) => {
  const { resetSelection } = useClickMovementContext();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'disk',
    item: { size, sourceTowerIndex: towerIndex },
    canDrag: isTopDisk,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => {
      resetSelection(); // Reset selection when drag begins
    },
  }), [isTopDisk]);

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
