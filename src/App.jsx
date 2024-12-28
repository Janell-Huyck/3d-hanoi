import React from 'react';
import './styles/App.css'
import TowerOfHanoi from './components/TowerOfHanoi';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Tower of Hanoi</h1>
      <TowerOfHanoi numDisks={2} />
    </div>
  );
}

export default App;
