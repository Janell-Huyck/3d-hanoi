import React from 'react';
import { render } from '@testing-library/react';
import { useDiskDrag, useTowerDrop } from '@hooks';
import { useGame } from '@contexts';
import { resetSelection, clearMessages } from '@utils';

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
  clearMessages: jest.fn(),
}));

describe('useDragAndDrop hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before re-mocking
    const useDragMock = jest.requireMock('react-dnd').useDrag;
    useDragMock.mockImplementation(() => [{ isDragging: false }, jest.fn()]);

    useGame.mockReturnValue({
      setSelectedDisk: jest.fn(),
      setSelectedTower: jest.fn(),
      setInvalidMoveMessage: jest.fn(),
      setVictoryMessage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('useDiskDrag', () => {
    it('calls resetSelection and clearMessages with correct arguments', () => {
      const mockSetSelectedDisk = jest.fn();
      const mockSetSelectedTower = jest.fn();
      const mockSetInvalidMoveMessage = jest.fn();
      const mockSetVictoryMessage = jest.fn();

      // Mock useGame values
      useGame.mockReturnValue({
        setSelectedDisk: mockSetSelectedDisk,
        setSelectedTower: mockSetSelectedTower,
        setInvalidMoveMessage: mockSetInvalidMoveMessage,
        setVictoryMessage: mockSetVictoryMessage,
      });

      // Mock useDrag
      const useDragMock = jest.requireMock('react-dnd').useDrag;
      useDragMock.mockImplementation((config) => {
        config().item(); // Call item to trigger clearMessages and resetSelection
        return [{ isDragging: false }, jest.fn()];
      });

      // Invoke the hook
      useDiskDrag(3, 0, true);

      // Assert calls
      expect(clearMessages).toHaveBeenCalledWith(
        mockSetInvalidMoveMessage,
        mockSetVictoryMessage,
      );
      expect(resetSelection).toHaveBeenCalledWith(
        mockSetSelectedDisk,
        mockSetSelectedTower,
      );
    });

    it('returns isDragging from useDrag', () => {
      // Mock useDrag
      const mockDrag = jest.fn();
      const useDragMock = jest.requireMock('react-dnd').useDrag;
      useDragMock.mockImplementation(() => [{ isDragging: true }, mockDrag]);

      // Invoke the hook
      const { isDragging } = useDiskDrag(3, 0, true);

      // Assert isDragging state
      expect(isDragging).toBe(true);
    });

    it('sets canDrag to true only if isTopDisk is true', () => {
      const useDragMock = jest.requireMock('react-dnd').useDrag;
      useDragMock.mockImplementation((config) => {
        expect(config().canDrag).toBe(true); // Pass isTopDisk = true
        return [{ isDragging: false }, jest.fn()];
      });

      useDiskDrag(3, 0, true); // isTopDisk = true
    });

    it('returns the correct item object', () => {
      const useDragMock = jest.requireMock('react-dnd').useDrag;
      useDragMock.mockImplementation((config) => {
        expect(config().item()).toEqual({ size: 3, sourceTowerIndex: 0 });
        return [{ isDragging: false }, jest.fn()];
      });

      useDiskDrag(3, 0, true);
    });
    it('calls collect to monitor isDragging state', () => {
      const mockMonitor = { isDragging: jest.fn(() => true) };

      const useDragMock = jest.requireMock('react-dnd').useDrag;
      useDragMock.mockImplementation((config) => {
        const { collect } = config();
        expect(collect(mockMonitor)).toEqual({ isDragging: true }); // Verify collect behavior
        return [{ isDragging: true }, jest.fn()];
      });

      const { isDragging } = useDiskDrag(3, 0, true);

      expect(isDragging).toBe(true); // Ensure the state matches
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

    it('calls collect to monitor isOver state', () => {
      const mockMonitor = { isOver: jest.fn(() => true) };

      const useDropMock = jest.requireMock('react-dnd').useDrop;
      useDropMock.mockImplementation((config) => {
        const { collect } = config();
        expect(collect(mockMonitor)).toEqual({ isOver: true }); // Verify collect behavior
        return [{ isOver: true }, jest.fn()];
      });

      const { isOver } = useTowerDrop(1, jest.fn());

      expect(isOver).toBe(true); // Ensure the state matches
    });
  });
});
