import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { useClickMovementContext } from './ClickMovementContext';

const DndContext = createContext();

export const useDndContext = () => useContext(DndContext);

export const DndProviderContext = ({ children }) => {
  const useDiskDrag = (size, towerIndex, isTopDisk) => {
    const { resetSelection } = useClickMovementContext();
  
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'disk',
      item: () => {
        resetSelection();
        return { size, sourceTowerIndex: towerIndex };
      },
      canDrag: isTopDisk,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }), [isTopDisk, resetSelection]);
  
    return { isDragging, drag };
  };
  

  const useTowerDrop = (towerIndex, onDiskDrop) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: 'disk',
      drop: (item) => onDiskDrop(item.sourceTowerIndex, towerIndex),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return { isOver, drop };
  };

  const value = {
    useDiskDrag,
    useTowerDrop
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DndContext.Provider value={value}>
        {children}
      </DndContext.Provider>
    </DndProvider>
  );
};

DndProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DndContext;
