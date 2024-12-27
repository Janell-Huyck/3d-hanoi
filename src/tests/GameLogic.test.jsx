import GameLogic from '../logic/gameLogic';


test('Game is won when all disks are on a single tower', () => {
  const game = new GameLogic(3);
  game.moveDisk(0, 2);
  game.moveDisk(0, 1);
  game.moveDisk(2, 1);
  game.moveDisk(0, 2);
  game.moveDisk(1, 0);
  game.moveDisk(1, 2);
  game.moveDisk(0, 2);
  expect(game.isGameWon()).toBe(true); // All disks are on tower 2
});
