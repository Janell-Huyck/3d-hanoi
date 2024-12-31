import { getDiskColor } from '@utils/diskUtils';

describe('getDiskColor', () => {
  test('returns the correct color for valid sizes', () => {
    expect(getDiskColor(1)).toBe('red'); // First color
    expect(getDiskColor(2)).toBe('orange'); // Second color
    expect(getDiskColor(3)).toBe('yellow'); // Third color
    expect(getDiskColor(4)).toBe('green'); // Fourth color
    expect(getDiskColor(5)).toBe('blue'); // Fifth color
    expect(getDiskColor(6)).toBe('indigo'); // Sixth color
    expect(getDiskColor(7)).toBe('violet'); // Seventh color
  });

  test('loops through colors when size exceeds the number of colors', () => {
    expect(getDiskColor(8)).toBe('red'); // Same as 1
    expect(getDiskColor(9)).toBe('orange'); // Same as 2
    expect(getDiskColor(10)).toBe('yellow'); // Same as 3
  });

  test('throws an error for sizes less than 1', () => {
    expect(() => getDiskColor(0)).toThrow('Disk size must be greater than or equal to 1.');
    expect(() => getDiskColor(-1)).toThrow('Disk size must be greater than or equal to 1.');
  });
});
