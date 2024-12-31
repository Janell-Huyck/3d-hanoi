import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('main.jsx', () => {
  test('renders the app correctly', () => {
    // Mock the DOM element
    document.body.innerHTML = '<div id="root"></div>';
    const rootElement = document.getElementById('root');

    // Import main.jsx
    require('../../main');

    // Ensure createRoot is called with the correct DOM element
    expect(createRoot).toHaveBeenCalledWith(rootElement);

    // Ensure the render method is called with <App />
    const mockRoot = createRoot.mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalledWith(<App />);
  });
});
