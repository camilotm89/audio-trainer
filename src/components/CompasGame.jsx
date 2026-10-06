import { useState } from 'react'
import { compasGamesData } from '../data/compasGamesData'
import { useGameStore } from '../store/useGameStore'

const POINTS_PER_CORRECT_ANSWER = 10

function CompasGame({ onExit }) {
  const addScore = useGameStore((state) => state.addScore)

  const [hasStarted, setHasStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isFinished, setIsFinished] = useState(false)

  const totalQuestions = compasGamesData.length
  const currentQuestion = compasGamesData[currentIndex]
  const hasAnswered = selectedOption !== null

  const handleSelectOption = (option) => {
    if (hasAnswered) return
    setSelectedOption(option)
    if (option === currentQuestion.correctOption) {
      addScore(POINTS_PER_CORRECT_ANSWER)
    }
  }

  const handleNext = () => {
    if (currentIndex === totalQuestions - 1) {
      setIsFinished(true)
      return
    }
    setCurrentIndex((index) => index + 1)
    setSelectedOption(null)
  }

  const getOptionClasses = (option) => {
    const base = 'w-full rounded-lg border px-4 py-3 text-left font-medium transition'

    if (!hasAnswered) {
      return `${base} border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50`
    }
    if (option === currentQuestion.correctOption) {
      return `${base} border-emerald-500 bg-emerald-100 text-emerald-700`
    }
    if (option === selectedOption) {
      return `${base} border-red-500 bg-red-100 text-red-700`
    }
    return `${base} border-slate-200 bg-white opacity-60`
  }

  if (!hasStarted) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-10">
        <button
          type="button"
          onClick={onExit}
          className="text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          ← Volver al menú
        </button>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Identifica el compás</h1>
        <p className="mt-2 text-slate-500">
          Escucha cada fragmento musical y adivina en qué compás está escrito. Son 10 preguntas.
        </p>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <span className="text-3xl">🔊</span>
            <h2 className="mt-2 text-lg font-bold text-slate-900">Antes de comenzar</h2>
            <p className="mt-2 text-sm text-slate-500">
              Regula el volumen de tu dispositivo a un nivel cómodo antes de iniciar el juego.
            </p>
            <button
              type="button"
              onClick={() => setHasStarted(true)}
              className="mt-5 w-full rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            >
              Iniciar juego
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (isFinished) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">¡Juego terminado!</h2>
        <p className="text-slate-500">Completaste las {totalQuestions} preguntas.</p>
        <button
          type="button"
          onClick={onExit}
          className="rounded-full bg-emerald-500 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
        >
          Volver al menú
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onExit}
          className="text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          ← Volver al menú
        </button>
        <span className="text-sm font-medium text-slate-400">
          Pregunta {currentIndex + 1} / {totalQuestions}
        </span>
      </div>

      <h2 className="text-xl font-bold text-slate-900">{currentQuestion.title}</h2>

      <div className="aspect-video w-full overflow-hidden rounded-xl shadow-sm">
        <iframe
          key={currentQuestion.id}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${currentQuestion.youtubeId}`}
          title={currentQuestion.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelectOption(option)}
            disabled={hasAnswered}
            className={getOptionClasses(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {hasAnswered && (
        <div className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
          <p
            className={
              selectedOption === currentQuestion.correctOption
                ? 'font-medium text-emerald-700'
                : 'font-medium text-red-700'
            }
          >
            {selectedOption === currentQuestion.correctOption
              ? '¡Correcto! 🎉'
              : `Incorrecto. La respuesta correcta era ${currentQuestion.correctOption}.`}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-emerald-500 px-6 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            {currentIndex === totalQuestions - 1 ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      )}
    </main>
  )
}

export default CompasGame
