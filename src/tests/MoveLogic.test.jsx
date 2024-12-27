import TowerOfHanoi from '../logic/TowerOfHanoi';

test('Valid move to empty tower', () => {
  const game = new TowerOfHanoi(3);
  expect(game.isMoveValid(1, 1)).toBe(true); // Move disk 1 to an empty tower
});

test('Valid move to a tower with a larger disk', () => {
  const game = new TowerOfHanoi(3);
  game.moveDisk(0, 1); // Move disk 1 to tower 1
  game.moveDisk(0, 2); // Move disk 2 to tower 2
  expect(game.isMoveValid(1,2)).toBe(true); // Move disk 1 to tower 2 (larger disk on tower 2)
});

test('Invalid move to a tower with a smaller disk', () => {
  const game = new TowerOfHanoi(3);
  game.moveDisk(0, 1); // Move disk 1 to tower 1
  expect(game.isMoveValid(3, 1)).toBe(false); // Disk 3 cannot be placed on disk 1
});

test('Moving a disk to the same tower does nothing but does not throw an error', () => {
  const game = new TowerOfHanoi(3);

  // Check initial state of the first tower
  const initialTower = [...game.towers[0]];

  // Attempt to move a disk to the same tower
  expect(() => game.moveDisk(0, 0)).not.toThrow();

  // Ensure the state of the tower is unchanged
  expect(game.towers[0]).toEqual(initialTower);
});

test('Moving a disk to the same tower does nothing for other towers as well', () => {
  const game = new TowerOfHanoi(3);

  // Move a disk to another tower to set up a scenario
  game.moveDisk(0, 1);

  // Attempt to move the disk back to the same tower
  expect(() => game.moveDisk(1, 1)).not.toThrow();

  // Verify that the state of the tower is unchanged
  expect(game.towers[1]).toEqual([1]); // Tower 1 should still contain the disk
});

