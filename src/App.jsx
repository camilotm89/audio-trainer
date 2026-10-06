import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import CompasGame from './components/CompasGame'
import FrequencyGame from './components/FrequencyGame'

const GAME_COMPONENTS = {
  'identifica-compas': CompasGame,
  'identifica-frecuencia': FrequencyGame,
}

function App() {
  const [activeGameId, setActiveGameId] = useState(null)
  const ActiveGame = activeGameId ? GAME_COMPONENTS[activeGameId] : null

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {ActiveGame ? (
        <ActiveGame onExit={() => setActiveGameId(null)} />
      ) : (
        <Home onSelectGame={setActiveGameId} />
      )}
    </div>
  )
}

export default App
