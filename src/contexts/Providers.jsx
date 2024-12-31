import React from 'react';
import PropTypes from 'prop-types';
import { GameProvider, DndProviderContext } from '@contexts';

const Providers = ({ children, numDisks = 2 }) => (
  <GameProvider numDisks={numDisks}>
    <DndProviderContext>{children}</DndProviderContext>
  </GameProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  numDisks: PropTypes.number,
};

export default Providers;
