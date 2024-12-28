import GameLogic from '../logic/gameLogic';

test('Towers initialize with correct number of disks', () => {
  const game = new GameLogic(3);
  expect(game.towers[0]).toEqual([3, 2, 1]); // Tower 0 should have all disks
  expect(game.towers[1]).toEqual([]); // Other towers should be empty
  expect(game.towers[2]).toEqual([]);
});

test('Moving disk updates the source and destination towers', () => {
  const game = new GameLogic(3);
  game.moveDisk(0, 1); // Move disk 1 to tower 1
  expect(game.towers[0]).toEqual([3, 2]); // Disk 1 removed from tower 0
  expect(game.towers[1]).toEqual([1]); // Disk 1 added to tower 1
});

test('Invalid move throws error', () => {
  const game = new GameLogic(3);
  game.moveDisk(0, 1);
  expect(() => game.moveDisk(0, 1)).toThrow('Invalid move!');
});

test('Cannot move from an empty tower', () => {
  const game = new GameLogic(3);
  expect(() => game.moveDisk(1, 0)).toThrow('Invalid move!');
});


test('Disk count is consistent after moves', () => {
  const game = new GameLogic(3);
  game.moveDisk(0, 1);
  game.moveDisk(0, 2);
  const totalDisks = game.towers.flat().length;
  expect(totalDisks).toBe(3); // All 3 disks accounted for
});

test('Moving the last disk of a tower leaves it empty', () => {
  const game = new GameLogic(3);

  // Move all disks from tower 0 to tower 1
  game.moveDisk(0, 1); // Move disk 1 to tower 1
  game.moveDisk(0, 2); // Move disk 2 to tower 2
  game.moveDisk(1, 2); // Move disk 1 to tower 2
  game.moveDisk(0, 1); // Move disk 3 to tower 1
  expect(game.towers[0]).toEqual([]); // Tower 0 should be empty


  // Now move the last disk from tower 0 (which should leave it empty)
  game.moveDisk(2, 0);
  game.moveDisk(2, 1);
  expect(game.towers[2]).toEqual([]); // Tower 1 should be empty
});
