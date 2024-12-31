import * as hooksIndex from '@hooks'; // Index file exports
import fs from 'fs';
import path from 'path';

describe('Hooks Index File', () => {
  test('all hooks are exported from the index file', () => {
    const hooksDir = path.resolve(__dirname, '../../..', 'src/hooks'); // Path to hooks directory

    // Dynamically import each file and compare its exports with the index file
    const hookFiles = fs
      .readdirSync(hooksDir)
      .filter((file) => file.endsWith('.js') && file !== 'index.js');

    const exportedKeys = Object.keys(hooksIndex);

    hookFiles.forEach((file) => {
      // Dynamically import each hook file
      const hookFileExports = require(path.join(hooksDir, file));

      Object.entries(hookFileExports).forEach(([exportKey, exportValue]) => {
        if (exportKey === 'default') {
          // Check if the default export is re-exported under an expected named key
          const expectedExportName = `${file.replace('.js', '').charAt(0).toUpperCase()}${file
            .replace('.js', '')
            .slice(1)}`;
          expect(exportedKeys).toContain(expectedExportName);
          expect(hooksIndex[expectedExportName]).toBe(exportValue);
        } else {
          // Check if named exports are re-exported correctly
          expect(exportedKeys).toContain(exportKey);
          expect(hooksIndex[exportKey]).toBe(exportValue);
        }
      });
    });
  });
});
