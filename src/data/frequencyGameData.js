// NOTA: audioUrl son rutas de ejemplo. Agregar los archivos reales de audio en
// /public/audio antes de producción (un solo archivo por pregunta; la versión
// "filtrada" se genera en vivo en el navegador con Web Audio API, no se
// necesita un segundo archivo pre-filtrado).
//
// filter.type determina qué banda se elimina del audio original:
//   'highpass' -> elimina graves    -> band: 'Bajos'
//   'lowpass'  -> elimina agudos    -> band: 'Agudos'
//   'notch'    -> elimina medios    -> band: 'Medios'
export const frequencyGameData = [
  {
    id: 1,
    audioUrl: '/audio/1106_Preview.mp3',
    band: 'Agudos',
    filter: { type: 'lowpass', frequency: 1200, label: '1200 Hz' },
    frequencyOptions: ['400 Hz', '1200 Hz', '3000 Hz', '8000 Hz'],
  },
  {
    id: 2,
    audioUrl: '/audio/CorineCorine_Full_Preview.mp3',
    band: 'Bajos',
    filter: { type: 'highpass', frequency: 500, label: '500 Hz' },
    frequencyOptions: ['200 Hz', '500 Hz', '1500 Hz', '5000 Hz'],
  },
  {
    id: 3,
    audioUrl: '/audio/QueensLight_Preview.mp3',
    band: 'Medios',
    filter: { type: 'notch', frequency: 1000, Q: 1.5, label: '1000 Hz' },
    frequencyOptions: ['300 Hz', '1000 Hz', '2500 Hz', '6000 Hz'],
  },
  {
    id: 4,
    audioUrl: '/audio/track4.mp3',
    band: 'Agudos',
    filter: { type: 'lowpass', frequency: 2500, label: '2500 Hz' },
    frequencyOptions: ['150 Hz', '800 Hz', '2500 Hz', '7000 Hz'],
  },
  {
    id: 5,
    audioUrl: '/audio/track5.mp3',
    band: 'Bajos',
    filter: { type: 'highpass', frequency: 350, label: '350 Hz' },
    frequencyOptions: ['350 Hz', '900 Hz', '2200 Hz', '6500 Hz'],
  },
  {
    id: 6,
    audioUrl: '/audio/PianoConcertoK414_Full_Preview.mp3',
    band: 'Agudos',
    filter: { type: 'lowpass', frequency: 1800, label: '1800 Hz' },
    frequencyOptions: ['300 Hz', '1000 Hz', '1800 Hz', '6000 Hz'],
  },
  {
    id: 7,
    audioUrl: '/audio/3DMARCoPianoSolo1_Full_Preview.mp3',
    band: 'Bajos',
    filter: { type: 'highpass', frequency: 400, label: '400 Hz' },
    frequencyOptions: ['250 Hz', '400 Hz', '1800 Hz', '5500 Hz'],
  },
  {
    id: 8,
    audioUrl: '/audio/TheSagaOfHarrisonCrabfeathers_Preview.mp3',
    band: 'Medios',
    filter: { type: 'notch', frequency: 1200, Q: 1.5, label: '1200 Hz' },
    frequencyOptions: ['350 Hz', '1200 Hz', '2800 Hz', '6200 Hz'],
  },
]
