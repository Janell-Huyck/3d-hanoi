import {
  resetSelection,
  isTopDisk,
  clearMessages,
} from '@utils/gameStateUtils';

describe('gameStateUtils', () => {
  describe('resetSelection', () => {
    test('resets selected disk and tower to null', () => {
      const mockSetSelectedDisk = jest.fn();
      const mockSetSelectedTower = jest.fn();

      resetSelection(mockSetSelectedDisk, mockSetSelectedTower);

      expect(mockSetSelectedDisk).toHaveBeenCalledWith(null);
      expect(mockSetSelectedTower).toHaveBeenCalledWith(null);
    });
  });

  describe('isTopDisk', () => {
    test('returns true when the disk is the top disk in the tower', () => {
      const towers = [[3, 2, 1], [], []];
      expect(isTopDisk(towers, 0, 1)).toBe(true); // Disk 1 is the top disk in tower 0
    });

    test('returns false when the disk is not the top disk in the tower', () => {
      const towers = [[3, 2, 1], [], []];
      expect(isTopDisk(towers, 0, 2)).toBe(false); // Disk 2 is not the top disk
    });

    test('returns false when the disk is not in the tower', () => {
      const towers = [[3, 2, 1], [], []];
      expect(isTopDisk(towers, 1, 1)).toBe(false); // Disk 1 is not in tower 1
    });

    test('handles empty towers gracefully', () => {
      const towers = [[], [], []];
      expect(isTopDisk(towers, 0, 1)).toBe(false); // No disk in tower 0
    });
  });

  describe('clearMessages', () => {
    it('resets invalidMoveMessage and victoryMessage to empty strings', () => {
      const setInvalidMoveMessage = jest.fn();
      const setVictoryMessage = jest.fn();

      clearMessages(setInvalidMoveMessage, setVictoryMessage);

      expect(setInvalidMoveMessage).toHaveBeenCalledWith('');
      expect(setVictoryMessage).toHaveBeenCalledWith('');
    });
  });
});
