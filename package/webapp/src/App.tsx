import React, { useState } from 'react'
import WelcomePage from './components/WelcomePage'
import MainApp from './components/MainApp'
import './styles/globals.css'

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'main'>('welcome')

  const handleStartApp = () => {
    setCurrentView('main')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {currentView === 'welcome' ? (
        <WelcomePage onStartApp={handleStartApp} />
      ) : (
        <MainApp />
      )}
    </div>
  )
}

export default App