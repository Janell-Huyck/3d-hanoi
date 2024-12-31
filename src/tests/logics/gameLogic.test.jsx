import GameLogic from '@logics/gameLogic';

describe('GameLogic', () => {
  let game;

  beforeEach(() => {
    game = new GameLogic(3); // Initialize a new game with 3 disks
  });

  describe('Initialization', () => {
    test('initializes towers correctly', () => {
      expect(game.towers).toEqual([[3, 2, 1], [], []]);
    });

    test('sets numDisks correctly', () => {
      expect(game.numDisks).toBe(3);
    });
  });

  describe('moveDisk', () => {
    test('moves a disk between towers', () => {
      game.moveDisk(0, 1);
      expect(game.towers).toEqual([[3, 2], [1], []]);
    });

    test('throws an error for invalid moves', () => {
      expect(() => {
        game.moveDisk(0, 2); // Move disk 1 to tower 2
        game.moveDisk(0, 2); // Attempt to move disk 2 on top of disk 1
      }).toThrow('Invalid move!');
    });

    test('does not allow moving a disk to the same tower', () => {
      game.moveDisk(0, 0);
      expect(game.towers).toEqual([[3, 2, 1], [], []]);
    });

    test('restores the disk to its original position after invalid move', () => {
      expect(() => {
        game.moveDisk(0, 2); // Valid move: [1] from tower 0 to 2
        game.moveDisk(0, 2); // Invalid move: [2] cannot go on top of [1]
      }).toThrow('Invalid move!');

      expect(game.towers).toEqual([[3, 2], [], [1]]); // Correct expected state
    });
  });

  describe('isMoveValid', () => {
    test('returns true for valid moves', () => {
      expect(game.isMoveValid(1, 1)).toBe(true); // Moving disk 1 to an empty tower
      game.moveDisk(0, 2); // Move disk 1 to tower 2
      expect(game.isMoveValid(2, 2)).toBe(false); // Moving disk 2 on top of disk 1 (invalid)
    });

    test('returns false for invalid moves', () => {
      game.moveDisk(0, 2); // Move disk 1 to tower 2
      expect(game.isMoveValid(3, 2)).toBe(false); // Cannot place disk 3 on disk 1
    });
  });

  describe('isGameWon', () => {
    test('returns false when the game is not won', () => {
      expect(game.isGameWon()).toBe(false);
    });

    test('returns true when all disks are on the second tower', () => {
      game.moveDisk(0, 2); // Move disk 1 to tower 2
      game.moveDisk(0, 1); // Move disk 2 to tower 1
      game.moveDisk(2, 1); // Move disk 1 to tower 1
      game.moveDisk(0, 2); // Move disk 3 to tower 2
      game.moveDisk(1, 0); // Move disk 1 to tower 0
      game.moveDisk(1, 2); // Move disk 2 to tower 2
      expect(game.isGameWon()).toBe(false);
      game.moveDisk(0, 2); // Move disk 1 to tower 2
      expect(game.isGameWon()).toBe(true);
    });

    test('returns true when all disks are on the third tower', () => {
      game.moveDisk(0, 2); // Move disk 1 to tower 2
      game.moveDisk(0, 1); // Move disk 2 to tower 1
      game.moveDisk(2, 1); // Move disk 1 to tower 1
      game.moveDisk(0, 2); // Move disk 3 to tower 2
      game.moveDisk(1, 0); // Move disk 1 to tower 0
      game.moveDisk(1, 2); // Move disk 2 to tower 2
      game.moveDisk(0, 2); // Move disk 1 to tower 2
      expect(game.isGameWon()).toBe(true);
    });
  });
});
