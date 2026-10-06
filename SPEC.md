# Especificación del Proyecto: Audio Trainer

## 1. Visión General
La aplicación ofrece un menú de juegos que tienen como objetivo entrenar auditivamente a estudiantes de música o de producción de audio

## 2. Stack Tecnológico
* **Frontend:** React (Vite)
* **Estilos:** Tailwind CSS 
* **Estado Global:** Zustand

## 3. Arquitectura de Componentes
* `App`: Contenedor principal.
* `Header`: Navegación.
* `Home`: Pantalla de bienvenida con selección de categoría o tema educativo. Por ahora solo hay dos categorías: Música y audio.
* `Juego: identifica el compás`:Juego en categoría de música. Juego con un embed de un fragmento de youtube, un conteo regresivo y unas respuestas de opción múltiple para que el usuario seleccione una opción donde solo una es correcta. Este juego podría tener una secuencia de 10 videos, cada uno con su pregunta y opciones de respuesta múltiple
* `Juego: identifica la frecuencia nivel básico`:Juego en categoría de audio. Juego con 2 niveles de dificultad. Habrá una lista de 5 preguntas, cada pregunta presenta dos veces el mismo audio, pero el audio viene la primera vez original y la segunda tiene un filtrado en alguna frecuencia. Para la dificultad fácil, el usuario debe elegir si se filtró: bajos, medios, agudos.
* `Juego: identifica la frecuencia nivel Medio`:Juego en categoría de audio. Juego con 2 niveles de dificultad. Habrá una lista de 5 preguntas, cada pregunta presenta dos veces el mismo audio, pero el audio viene la primera vez original y la segunda tiene un filtrado en alguna frecuencia. Para la dificultad Media, el usuario debe elegir En qué frecuencia se filtró dada una lista de 4 opciones tipo respuesta múltiple

## 4. Estado Global (Zustand / Context)
El estado global almacenará:
* `score`: Puntuación total acumulada.
* `currentLevel`: Nivel en el que se encuentra el jugador.

## 5. Historias de Usuario / Funcionalidades (Fase 1)
* [ ] Como usuario, quiero ingresar a la home para poder seleccionar una categoría y un juego y que al dar click me abra la página del juego con la opción de iniciar en cualquier momento
* [ ] Como usuario, quiero ingresar a la categoría música para poder jugar uno de los juegos disponibles
* [ ] Como usuario, quiero ingresar al juego identifica el compás en la categoría de música. y darle al botón iniciar juego, recibir una notificación antes de iniciar que invite a regular el volumen. Posteriormente iniciar el juego, escuchando el fragmento de youtube y poder clickear una de las opciones de respuesta múltiple del compás de la canción que sonó
* [ ] Como usuario, quiero Ver si acerté a la opción que seleccioné y si fallé quiero que se marque la que era correcta, sin embargo quiero poder continuar con el siguiente audio
* [ ] Como usuario, quiero una puntuación para identificar a cuantos audios le acerté en el juego

## 6. Criterios de Aceptación
* La aplicación debe ser responsive.
* Debe manejar estados de carga y error.