import * as contextsIndex from '@contexts'; // Index file exports
import fs from 'fs';
import path from 'path';

describe('Contexts Index File', () => {
  test('all context files are exported from the index file', () => {
    const contextsDir = path.resolve(__dirname, '../../..', 'src/contexts'); // Path to contexts directory

    // Dynamically import each file and compare its exports with the index file
    const contextFiles = fs
      .readdirSync(contextsDir)
      .filter((file) => file.endsWith('.js') && file !== 'index.js');

    const exportedKeys = Object.keys(contextsIndex);

    contextFiles.forEach((file) => {
      // Dynamically import each context file
      const contextFileExports = require(path.join(contextsDir, file));

      Object.entries(contextFileExports).forEach(([exportKey, exportValue]) => {
        if (exportKey === 'default') {
          // Check if the default export is re-exported under an expected named key
          const expectedExportName = `${file.replace('.js', '').charAt(0).toUpperCase()}${file
            .replace('.js', '')
            .slice(1)}`;
          expect(exportedKeys).toContain(expectedExportName);
          expect(contextsIndex[expectedExportName]).toBe(exportValue);
        } else {
          // Check if named exports are re-exported correctly
          expect(exportedKeys).toContain(exportKey);
          expect(contextsIndex[exportKey]).toBe(exportValue);
        }
      });
    });
  });
});
