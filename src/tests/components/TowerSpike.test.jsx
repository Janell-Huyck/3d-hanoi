import React from 'react';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { TowerSpike } from '@components';

describe('TowerSpike Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<TowerSpike />);
    expect(container).toBeInTheDocument();
  });

  test('has the correct className', () => {
    const { container } = render(<TowerSpike />);
    const spikeElement = container.firstChild;
    expect(spikeElement).toHaveClass('tower-spike');
  });

  test('does not introduce accessibility violations', async () => {
    const { container } = render(<TowerSpike />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
