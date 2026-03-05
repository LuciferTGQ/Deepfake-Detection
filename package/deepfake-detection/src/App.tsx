import React, { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { MainApp } from './components/MainApp';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleConfirm = () => {
    setShowWelcome(false);
  };

  return (
    <div className="App">
      {showWelcome ? (
        <WelcomePage onConfirm={handleConfirm} />
      ) : (
        <MainApp />
      )}
    </div>
  );
}

export default App;
