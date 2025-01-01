import * as gameConstants from '@constants';

describe('gameConstants', () => {
  it('should define VICTORY_MESSAGE, INVALID_MOVE_MESSAGE, and NUMBER_OF_TOWERS with correct types', () => {
    expect(gameConstants.VICTORY_MESSAGE).toBeDefined();
    expect(typeof gameConstants.VICTORY_MESSAGE).toBe('string');

    expect(gameConstants.INVALID_MOVE_MESSAGE).toBeDefined();
    expect(typeof gameConstants.INVALID_MOVE_MESSAGE).toBe('string');

    expect(gameConstants.NUMBER_OF_TOWERS).toBeDefined();
    expect(typeof gameConstants.NUMBER_OF_TOWERS).toBe('number');
    expect(Number.isInteger(gameConstants.NUMBER_OF_TOWERS)).toBe(true);
  });
});
