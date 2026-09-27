import { useState } from 'react'

const examples = [
  { word: 'perro', pieces: ['▁per', 'ro'] },
  { word: 'perros', pieces: ['▁per', 'ros'] },
  { word: 'perrito', pieces: ['▁per', 'rito'] },
  { word: 'perritos', pieces: ['▁per', 'rito', 's'] },
  { word: 'antidesestabilización', pieces: ['▁anti', 'des', 'e', 'stabil', 'ización'] },
]
const merges = [
  { pieces: ['p', 'e', 'r', 'r', 'o'], note: 'Partimos de caracteres: una posible elección de unidades pequeñas. Otras implementaciones pueden partir de bytes.' },
  { pieces: ['pe', 'r', 'r', 'o'], note: 'Si «p + e» es el par más frecuente en el corpus de aprendizaje, se fusiona en «pe».' },
  { pieces: ['per', 'r', 'o'], note: 'Tras volver a contar, si «pe + r» es el par más frecuente, se fusiona en «per». Repetimos hasta el límite de vocabulario elegido.' },
]

function Piece({ text }: { text: string }) {
  return <span className="subword-piece">{text.startsWith('▁') ? <><span className="boundary-mark">▁</span>{text.slice(1)}</> : text}</span>
}

export function TokenizationScene() {
  const [stage, setStage] = useState(0)
  const [merge, setMerge] = useState(0)
  return (
    <section className="learning-scene" id="tokenizacion" aria-labelledby="tokenization-title">
      <header className="scene-heading"><p className="eyebrow">07 / LA PUERTA DE ENTRADA</p><h2 id="tokenization-title">Texto que se convierte<br />en <em>piezas reutilizables.</em></h2><p>Antes de obtener representaciones, un tokenizador divide el texto en unidades llamadas tokens y busca sus identificadores en un vocabulario.</p></header>
      <ol className="token-steps" aria-label="Pasos de entrada del texto">{['Texto', 'Tokenización', 'Tokens', 'IDs'].map(label => <li key={label}>{label}</li>)}</ol>
      <div className="token-lab"><p className="visual-label">EJEMPLO REAL / PERRITOS</p><div className="token-stage" aria-live="polite" aria-atomic="true">{stage === 0 ? <p className="token-whole">perritos</p> : <div className="subword-row">{examples[3].pieces.map((piece, index) => <div className="subword-unit" key={piece}><Piece text={piece}/>{stage === 2 && <span className="revealed-id"><span aria-hidden="true">↓</span><span className="visual-label">ID</span>{[117, 40880, 7][index]}</span>}</div>)}</div>}</div><div className="word-selector" role="group" aria-label="Etapa de tokenización">{['1. Texto', '2. Dividir en tokens', '3. Mostrar IDs'].map((label, index) => <button key={label} aria-pressed={stage === index} onClick={() => setStage(index)}>{label}</button>)}</div><p className="experiment-note">{stage === 0 ? 'Texto original, antes de dividirlo.' : stage === 1 ? 'Tres tokens. Los IDs todavía no se muestran.' : '117, 40880 y 7 identifican entradas del vocabulario. No son medidas de significado ni de cercanía.'}</p></div>
      <div className="scene-takeaway"><span aria-hidden="true">≠</span><p><strong>Token ID ≠ embedding.</strong> El token es una unidad de texto. Su ID identifica una entrada del vocabulario; el embedding es una representación numérica aprendida. El número 117 no contiene el significado de «▁per».</p></div>
      <div className="lesson-block"><h3>Ni una palabra distinta para todo, ni letra a letra.</h3><div className="paired-explanations"><div><h4>Una palabra = un token</h4><p>Exigiría un vocabulario enorme para cubrir cada forma y dejaría palabras nuevas fuera.</p></div><div><h4>Un carácter = un token</h4><p>Permite combinar letras, pero alarga las secuencias y obliga a construir palabras a partir de piezas muy pequeñas.</p></div></div><p>Los <strong>subwords</strong> son un punto intermedio: piezas de palabras reutilizables. También pueden conservar palabras completas.</p></div>
      <div className="segmentation-list" aria-label="Segmentaciones reales del tokenizador">{examples.map(example => <div className="segmentation-row" key={example.word}><span>{example.word}</span><span aria-hidden="true">→</span><div className="subword-row">{example.pieces.map((piece, index) => <Piece text={piece} key={`${piece}-${index}`}/>)}</div></div>)}</div>
      <p className="experiment-note model-provenance">Resultados reales del tokenizador asociado a <span className="model-name">sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2</span>. No son segmentaciones universales.</p>
      <p className="visual-explanation"><span className="boundary-mark">▁</span> no es «_». En este tokenizador indica aproximadamente un comienzo de palabra / espacio previo. Las piezas siguientes continúan la palabra. No todos los tokenizadores usan esta convención.</p>
      <p className="visual-explanation">Fíjate en «antidesestabilización»: «e» y «stabil» son piezas útiles para este tokenizador, no necesariamente raíces o sufijos lingüísticos perfectos.</p>
      <div className="lesson-block"><p className="eyebrow">BPE / BYTE PAIR ENCODING</p><h3>Las combinaciones frecuentes se quedan juntas.</h3><p>Una forma de construir ese vocabulario es empezar con unidades pequeñas, contar pares vecinos y fusionar los más frecuentes. Así se aprenden fragmentos que pueden reutilizarse.</p><p className="visual-label">EJEMPLO CONCEPTUAL / FUSIONES HIPOTÉTICAS, NO RESULTADOS DEL TOKENIZADOR ANTERIOR</p><div className="bpe-pieces subword-row" aria-live="polite" aria-atomic="true" key={merge}>{merges[merge].pieces.map((piece, index) => <Piece text={piece} key={index}/>)}</div><p className="visual-explanation" aria-live="polite">{merges[merge].note}</p><div className="word-selector" role="group" aria-label="Pasos del ejemplo conceptual de BPE">{['1. Unidades pequeñas', '2. Fusionar p + e', '3. Fusionar pe + r'].map((label, index) => <button key={label} aria-pressed={merge === index} onClick={() => setMerge(index)}>{label}</button>)}</div><p><strong>Aprender y aplicar son momentos distintos.</strong> Primero se aprende el vocabulario con muchos textos. Después, al recibir un texto nuevo, el tokenizador aplica las fusiones aprendidas; no vuelve a entrenarse con cada frase.</p><p className="experiment-note">Este ejemplo explica BPE. No identifica el algoritmo del tokenizador del modelo seleccionado.</p></div>
      <div className="paired-explanations alternatives"><div><h3>WordPiece</h3><p>También trabaja con piezas de palabras; selecciona fragmentos útiles según su propio criterio de construcción.</p></div><div><h3>Unigram</h3><p>Parte de un conjunto amplio de piezas candidatas y va eliminando las menos útiles.</p></div></div>
      <div className="scene-takeaway"><span aria-hidden="true">→</span><p><strong>Texto → tokens → unidades que procesa el modelo.</strong> Es el mismo concepto base de «tokens» que aparece al hablar del consumo de un LLM. Dividir e identificar el texto prepara la entrada; no resuelve por sí solo su significado.</p></div>
    </section>
  )
}
