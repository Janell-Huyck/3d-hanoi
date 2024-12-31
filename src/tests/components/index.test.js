import * as componentsIndex from '@components'; // Index file exports
import fs from 'fs';
import path from 'path';

describe('Components Index File', () => {
  test('all component files are exported from the index file', () => {
    const componentsDir = path.resolve(__dirname, '../../..', 'src/components'); // Path to components directory

    // Dynamically import each file and compare its exports with the index file
    const componentFiles = fs
      .readdirSync(componentsDir)
      .filter((file) => file.endsWith('.js') || file.endsWith('.jsx')) // Include both .js and .jsx files
      .filter((file) => file !== 'index.js'); // Exclude the index.js file

    const exportedKeys = Object.keys(componentsIndex);

    componentFiles.forEach((file) => {
      // Dynamically import each component file
      const componentFileExports = require(path.join(componentsDir, file));

      Object.entries(componentFileExports).forEach(([exportKey, exportValue]) => {
        if (exportKey === 'default') {
          // Check if the default export is re-exported under an expected named key
          const expectedExportName = `${file.replace(/\.(js|jsx)$/, '').charAt(0).toUpperCase()}${file
            .replace(/\.(js|jsx)$/, '')
            .slice(1)}`;
          expect(exportedKeys).toContain(expectedExportName);
          expect(componentsIndex[expectedExportName]).toBe(exportValue);
        } else {
          // Check if named exports are re-exported correctly
          expect(exportedKeys).toContain(exportKey);
          expect(componentsIndex[exportKey]).toBe(exportValue);
        }
      });
    });
  });
});
