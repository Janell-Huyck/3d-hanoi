import React from 'react';
import './styles/App.css'
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Tower of Hanoi</h1>
      <GameBoard />
    </div>
  );
}

export default App;
