export default class GameLogic {
  constructor(numDisks) {
    this.numDisks = numDisks;
    this.towers = [[], [], []];
    for (let i = numDisks; i > 0; i--) {
      this.towers[0].push(i);
    }
  }

  moveDisk(fromTower, toTower) {
    if (fromTower === toTower) return;

    const disk = this.towers[fromTower].pop();
    if (!this.isMoveValid(disk, toTower)) {
      this.towers[fromTower].push(disk);
      throw new Error('Invalid move!');
    }
    this.towers[toTower].push(disk);
  }

  isMoveValid(disk, toTower) {
    const targetTower = this.towers[toTower];
    return (
      targetTower.length === 0 || disk < targetTower[targetTower.length - 1]
    );
  }

  isGameWon() {
    return (
      this.towers[1].length === this.numDisks ||
      this.towers[2].length === this.numDisks
    );
  }
}
