import React, { Suspense, useState } from 'react';
import Landing from './pages/Landing';
import Simulator3D from './pages/Simulator3D';
import './App.css';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'configurator'>('landing');

  return (
    <div className="app">
      {view === 'landing' ? (
        <Landing onEnter={() => setView('configurator')} />
      ) : (
        <Suspense fallback={<div className="app-loading">Loading the configurator…</div>}>
          <Simulator3D onBack={() => setView('landing')} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
