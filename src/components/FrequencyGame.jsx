import { useEffect, useRef, useState } from 'react'
import { frequencyGameData } from '../data/frequencyGameData'
import { useGameStore } from '../store/useGameStore'

const POINTS_PER_CORRECT_ANSWER = 10
const BAND_OPTIONS = ['Bajos', 'Medios', 'Agudos']

function FrequencyGame({ onExit }) {
  const addScore = useGameStore((state) => state.addScore)

  const [difficulty, setDifficulty] = useState(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isFinished, setIsFinished] = useState(false)

  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const filterNodeRef = useRef(null)

  const totalQuestions = frequencyGameData.length
  const currentQuestion = frequencyGameData[currentIndex]
  const hasAnswered = selectedOption !== null
  const options = difficulty === 'medio' ? currentQuestion.frequencyOptions : BAND_OPTIONS
  const correctOption = difficulty === 'medio' ? currentQuestion.filter.label : currentQuestion.band

  useEffect(() => {
    if (!hasStarted) return undefined

    const AudioContextClass = window.AudioContext || window['webkitAudioContext']
    const audioContext = new AudioContextClass()
    const source = audioContext.createMediaElementSource(audioRef.current)
    const filterNode = audioContext.createBiquadFilter()

    source.connect(filterNode)
    filterNode.connect(audioContext.destination)

    audioContextRef.current = audioContext
    filterNodeRef.current = filterNode

    return () => {
      audioContext.close()
    }
  }, [hasStarted])

  const playAudio = async (mode) => {
    const audio = audioRef.current
    const filterNode = filterNodeRef.current
    const audioContext = audioContextRef.current
    if (!audio || !filterNode || !audioContext) return

    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }

    if (mode === 'original') {
      filterNode.type = 'allpass'
    } else {
      filterNode.type = currentQuestion.filter.type
      filterNode.frequency.value = currentQuestion.filter.frequency
      filterNode.Q.value = currentQuestion.filter.Q ?? 1
    }

    audio.currentTime = 0
    audio.play()
  }

  const handleSelectOption = (option) => {
    if (hasAnswered) return
    setSelectedOption(option)
    if (option === correctOption) {
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
    const base = 'flex-1 basis-40 rounded-lg border px-4 py-3 text-center font-medium transition'

    if (!hasAnswered) {
      return `${base} border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50`
    }
    if (option === correctOption) {
      return `${base} border-emerald-500 bg-emerald-100 text-emerald-700`
    }
    if (option === selectedOption) {
      return `${base} border-red-500 bg-red-100 text-red-700`
    }
    return `${base} border-slate-200 bg-white opacity-60`
  }

  if (!difficulty) {
    return (
      <main className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-16 text-center">
        <button
          type="button"
          onClick={onExit}
          className="self-start text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          ← Volver al menú
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Identifica la frecuencia</h1>
        <p className="text-slate-500">Elige un nivel de dificultad para comenzar.</p>

        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setDifficulty('facil')}
            className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
          >
            <span className="text-lg font-semibold text-slate-900">Fácil</span>
            <p className="mt-1 text-sm text-slate-500">Identifica si se filtraron bajos, medios o agudos.</p>
          </button>
          <button
            type="button"
            onClick={() => setDifficulty('medio')}
            className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
          >
            <span className="text-lg font-semibold text-slate-900">Medio</span>
            <p className="mt-1 text-sm text-slate-500">Elige la frecuencia exacta que fue filtrada.</p>
          </button>
        </div>
      </main>
    )
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
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Identifica la frecuencia</h1>
        <p className="mt-2 text-slate-500">
          Escucharás el mismo audio dos veces: original y luego filtrado. Nivel{' '}
          {difficulty === 'facil' ? 'fácil' : 'medio'}, 5 preguntas.
        </p>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <span className="text-3xl">🔊</span>
            <h2 className="mt-2 text-lg font-bold text-slate-900">Antes de comenzar</h2>
            <p className="mt-2 text-sm text-slate-500">
              Regula el volumen de tu dispositivo a un nivel cómodo. Necesitarás distinguir
              diferencias sutiles de frecuencia.
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
        <p className="text-slate-500">
          Completaste las {totalQuestions} preguntas en nivel {difficulty === 'facil' ? 'fácil' : 'medio'}.
        </p>
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

      <h2 className="text-xl font-bold text-slate-900">
        {difficulty === 'facil' ? '¿Qué banda de frecuencia se filtró?' : '¿En qué frecuencia se filtró el audio?'}
      </h2>

      <audio ref={audioRef} src={currentQuestion.audioUrl} preload="auto" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => playAudio('original')}
          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50"
        >
          ▶ Escuchar original
        </button>
        <button
          type="button"
          onClick={() => playAudio('filtered')}
          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50"
        >
          ▶ Escuchar filtrado
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
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
              selectedOption === correctOption
                ? 'font-medium text-emerald-700'
                : 'font-medium text-red-700'
            }
          >
            {selectedOption === correctOption
              ? '¡Correcto! 🎉'
              : `Incorrecto. La respuesta correcta era ${correctOption}.`}
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

export default FrequencyGame
