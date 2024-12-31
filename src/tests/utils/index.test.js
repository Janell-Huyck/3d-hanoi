import * as utilsIndex from '@utils'; // Index file exports
import fs from 'fs';
import path from 'path';

describe('Utils Index File', () => {
  test('all utility files are exported from the index file', () => {
    const utilsDir = path.resolve(__dirname, '../../..', 'src/utils'); // Path to utils directory

    // Dynamically import each file and compare its exports with the index file
    const utilFiles = fs
      .readdirSync(utilsDir)
      .filter((file) => file.endsWith('.js') && file !== 'index.js');

    const exportedKeys = Object.keys(utilsIndex);

    utilFiles.forEach((file) => {
      // Dynamically import each utility file
      const utilFileExports = require(path.join(utilsDir, file));

      Object.entries(utilFileExports).forEach(([exportKey, exportValue]) => {
        if (exportKey === 'default') {
          // Check if the default export is re-exported under an expected named key
          const expectedExportName = `${file.replace('.js', '').charAt(0).toUpperCase()}${file
            .replace('.js', '')
            .slice(1)}`;
          expect(exportedKeys).toContain(expectedExportName);
          expect(utilsIndex[expectedExportName]).toBe(exportValue);
        } else {
          // Check if named exports are re-exported correctly
          expect(exportedKeys).toContain(exportKey);
          expect(utilsIndex[exportKey]).toBe(exportValue);
        }
      });
    });
  });
});
