import * as logicsIndex from '@logics'; // Index file exports
import fs from 'fs';
import path from 'path';

describe('Logics Index File', () => {
  test('all logic files are exported from the index file', () => {
    const logicsDir = path.resolve(__dirname, '../../..', 'src/logics'); // Path to logics directory

    // Dynamically import each file and compare its exports with the index file
    const logicFiles = fs
      .readdirSync(logicsDir)
      .filter((file) => file.endsWith('.js') && file !== 'index.js');

    const exportedKeys = Object.keys(logicsIndex);

    logicFiles.forEach((file) => {
      // Dynamically import each logic file
      const logicFileExports = require(path.join(logicsDir, file));

      Object.entries(logicFileExports).forEach(([exportKey, exportValue]) => {
        if (exportKey === 'default') {
          // Check if the default export is re-exported under an expected named key
          const expectedExportName = `${file.replace('.js', '').charAt(0).toUpperCase()}${file
            .replace('.js', '')
            .slice(1)}`;
          expect(exportedKeys).toContain(expectedExportName);
          expect(logicsIndex[expectedExportName]).toBe(exportValue);
        } else {
          // Check if named exports are re-exported correctly
          expect(exportedKeys).toContain(exportKey);
          expect(logicsIndex[exportKey]).toBe(exportValue);
        }
      });
    });
  });
});
