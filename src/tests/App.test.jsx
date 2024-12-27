import React from 'react';
import { render, screen } from '@testing-library/react'; // Import render and screen
import App from '../App'; // Adjust path to your App component


test('App renders without crashing', () => {
  render(<App />);
  expect(screen.getByText('Tower of Hanoi')).toBeInTheDocument();
});
