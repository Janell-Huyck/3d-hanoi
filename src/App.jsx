import React from 'react';
import {
  GameBoard,
  GameMessages,
  MoveCounter,
  RestartButton,
} from '@components';
import { Providers } from '@contexts';

function App() {
  return (
    <React.StrictMode>
      <div className="app-container">
        <Providers>
          <h1 className="app-title">Tower of Hanoi</h1>
          <main>
            <GameMessages />
            <MoveCounter />
            <RestartButton />
            <GameBoard />
          </main>
        </Providers>
      </div>
    </React.StrictMode>
  );
}

export default App;
