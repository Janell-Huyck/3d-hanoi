import React from 'react';
import { render, screen } from '@testing-library/react';
import Providers from '@contexts/Providers';

describe('Providers', () => {
  it('renders children correctly', () => {
    render(
      <Providers>
        <div data-testid="test-child">Test Child</div>
      </Providers>,
    );

    // Validate that the child is rendered within Providers
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
