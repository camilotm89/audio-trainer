import { useState } from 'react'

const categories = [
  {
    id: 'musica',
    title: 'Música',
    description: 'Entrena tu oído para reconocer compases y estructuras musicales.',
    icon: '🎵',
    games: [
      {
        id: 'identifica-compas',
        title: 'Identifica el compás',
        description: 'Escucha un fragmento y adivina en qué compás está escrito.',
      },
    ],
  },
  {
    id: 'audio',
    title: 'Audio',
    description: 'Aprende a identificar frecuencias y filtros en el sonido.',
    icon: '🎧',
    games: [
      {
        id: 'identifica-frecuencia',
        title: 'Identifica la frecuencia',
        description: 'Compara un audio original y uno filtrado, y adivina qué frecuencia cambió.',
      },
    ],
  },
]

function Home({ onSelectGame }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId)

  if (selectedCategory) {
    return (
      <main className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 py-16">
        <div className="w-full">
          <button
            type="button"
            onClick={() => setSelectedCategoryId(null)}
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            ← Volver a categorías
          </button>
        </div>

        <div className="text-center">
          <span className="text-4xl">{selectedCategory.icon}</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">{selectedCategory.title}</h2>
          <p className="mt-2 text-slate-500">Elige un juego para comenzar</p>
        </div>

        {selectedCategory.games.length === 0 ? (
          <p className="text-slate-400">Próximamente más juegos en esta categoría.</p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {selectedCategory.games.map((game) => (
              <button
                key={game.id}
                type="button"
                onClick={() => onSelectGame?.(game.id)}
                className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
              >
                <span className="text-xl font-semibold text-slate-900">{game.title}</span>
                <span className="text-sm text-slate-500">{game.description}</span>
              </button>
            ))}
          </div>
        )}
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Elige una categoría</h2>
        <p className="mt-2 text-slate-500">
          Selecciona el área en la que quieres entrenar tu oído
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategoryId(category.id)}
            className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
          >
            <span className="text-4xl">{category.icon}</span>
            <span className="text-xl font-semibold text-slate-900">{category.title}</span>
            <span className="text-sm text-slate-500">{category.description}</span>
          </button>
        ))}
      </div>
    </main>
  )
}

export default Home
