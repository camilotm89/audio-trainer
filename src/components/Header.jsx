import { useGameStore } from '../store/useGameStore'

function Header() {
  const score = useGameStore((state) => state.score)

  return (
    <header className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white shadow-md">
      <h1 className="text-xl font-bold tracking-tight">Audio Trainer</h1>
      <div className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-1.5 text-sm font-medium">
        <span className="text-slate-400">Puntuación</span>
        <span className="font-bold text-emerald-400">{score}</span>
      </div>
    </header>
  )
}

export default Header
