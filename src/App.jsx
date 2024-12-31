import React from 'react';
import { GameBoard } from '@components';
import { Providers } from '@contexts';

function App() {
  return (
    <React.StrictMode>
      <div className="app-container">
        <h1 className="app-title">Tower of Hanoi</h1>
        <Providers>
          <GameBoard />
        </Providers>
      </div>
    </React.StrictMode>
  );
}

export default App;
