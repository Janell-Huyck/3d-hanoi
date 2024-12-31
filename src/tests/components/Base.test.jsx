import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Base } from '@components';

describe('Base Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Base />);
    expect(container).toBeInTheDocument();
  });

  test('has the correct className', () => {
    const { container } = render(<Base />);
    const baseElement = container.firstChild;
    expect(baseElement).not.toBeNull();
    expect(baseElement).toHaveClass('base'); // Class still applied until migration
  });

  test('does not introduce accessibility violations', async () => {
    const { container } = render(<Base />);
    const results = await axe(container);
    expect(results).toHaveNoViolations('The Base component must be accessible.');
  });
});
