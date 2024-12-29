import React from 'react';
import { GameBoard } from './components';
import { GameProvider, ClickMovementProvider, DndProviderContext } from './context';

function App() {
  return (
     <React.StrictMode>
      <div className="app-container">
        <h1 className="app-title">Tower of Hanoi</h1>
         <GameProvider numDisks={2}>
           <ClickMovementProvider>
             <DndProviderContext>
               <GameBoard />
             </DndProviderContext>
           </ClickMovementProvider>
         </GameProvider>
       </div>
     </React.StrictMode>
  );
}

export default App;
