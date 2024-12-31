import React from 'react';
import { render } from '@testing-library/react';
import { useDiskDrag, useTowerDrop } from '@hooks';
import { useGame } from '@contexts';
import { resetSelection } from '@utils';

// Mock dependencies
jest.mock('react-dnd', () => ({
  useDrag: jest.fn(),
  useDrop: jest.fn(),
}));

jest.mock('@contexts', () => ({
  useGame: jest.fn(),
}));

jest.mock('@utils', () => ({
  resetSelection: jest.fn(),
}));

describe('useDragAndDrop hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useDiskDrag', () => {
    it('calls resetSelection and returns isDragging and drag properties', () => {
      const mockSetSelectedDisk = jest.fn();
      const mockSetSelectedTower = jest.fn();
      const mockDrag = jest.fn();
      const mockMonitor = { isDragging: jest.fn(() => true) };

      // Mock the return values of useDrag
      const useDragMock = jest.requireMock('react-dnd').useDrag;
      useDragMock.mockImplementation((config) => {
        const { item, canDrag, collect } = config();
        expect(canDrag).toBe(true);
        expect(item()).toEqual({ size: 3, sourceTowerIndex: 0 });
        collect(mockMonitor);
        return [{ isDragging: true }, mockDrag];
      });

      useGame.mockReturnValue({
        setSelectedDisk: mockSetSelectedDisk,
        setSelectedTower: mockSetSelectedTower,
      });

      // Simulate the hook being used inside a component
      const TestComponent = () => {
        const { isDragging, drag } = useDiskDrag(3, 0, true);
        return (
          <div>
            <div data-testid="dragging">
              {isDragging ? 'Dragging' : 'Not Dragging'}
            </div>
            <div data-testid="drag-ref" ref={drag}></div>
          </div>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      expect(getByTestId('dragging')).toHaveTextContent('Dragging');
      expect(resetSelection).toHaveBeenCalledWith(
        mockSetSelectedDisk,
        mockSetSelectedTower,
      );
    });
  });

  describe('useTowerDrop', () => {
    it('returns isOver and drop properties', () => {
      const mockDrop = jest.fn();
      const mockMonitor = { isOver: jest.fn(() => true) };
      const mockOnDiskDrop = jest.fn();

      // Mock the return values of useDrop
      const useDropMock = jest.requireMock('react-dnd').useDrop;
      useDropMock.mockImplementation((config) => {
        const { accept, drop, collect } = config();
        expect(accept).toBe('disk');
        drop({ sourceTowerIndex: 0 });
        collect(mockMonitor);
        return [{ isOver: true }, mockDrop];
      });

      // Simulate the hook being used inside a component
      const TestComponent = () => {
        const { isOver, drop } = useTowerDrop(1, mockOnDiskDrop);
        return (
          <div>
            <div data-testid="over">{isOver ? 'Over' : 'Not Over'}</div>
            <div data-testid="drop-ref" ref={drop}></div>
          </div>
        );
      };

      const { getByTestId } = render(<TestComponent />);

      expect(getByTestId('over')).toHaveTextContent('Over');
      expect(mockOnDiskDrop).toHaveBeenCalledWith(0, 1);
    });
  });
});
