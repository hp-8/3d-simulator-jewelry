import React, { Suspense } from 'react';
import Simulator3D from './pages/Simulator3D';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Ring Configurator</h1>
        <p>Drag to rotate · pick a metal &amp; gemstone · save or share your design</p>
      </header>
      <Suspense fallback={<div className="app-loading">Loading 3D scene…</div>}>
        <Simulator3D />
      </Suspense>
    </div>
  );
};

export default App;
