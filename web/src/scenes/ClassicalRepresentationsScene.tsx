import { useState } from 'react'

const vocabulary = ['perro', 'gato', 'avión']
const methods = ['One-hot', 'Bag of Words', 'TF-IDF']

function OneHot() {
  const [word, setWord] = useState(0)
  return (
    <div className="method-layout">
      <div className="method-copy"><p className="eyebrow">UNA PALABRA → UNA POSICIÓN</p><h3>Una casilla para cada palabra.</h3><p>Elegimos un vocabulario: la lista de palabras que vamos a representar. Solo se enciende la casilla de la palabra elegida.</p><p>Se llama <strong>one-hot</strong>: una única posición activa.</p></div>
      <div className="method-visual">
        <p className="visual-label">VOCABULARIO DE JUGUETE · SOLO 3 PALABRAS</p>
        <div className="word-selector" aria-label="Palabra que quieres representar">{vocabulary.map((text, i) => <button key={text} aria-pressed={word === i} onClick={() => setWord(i)}>{text}</button>)}</div>
        <div className="vector" aria-live="polite" aria-label={`Representación de ${vocabulary[word]}`}>{vocabulary.map((text, i) => <div key={text}><span className={`vector-cell ${word === i ? 'active' : ''}`}>{word === i ? 1 : 0}</span><span>{text}</span></div>)}</div>
        <p className="visual-explanation">Cada palabra tiene su lugar, pero todas quedan igual de separadas. «Perro» no está más cerca de «gato» que de «avión».</p>
      </div>
      <div className="method-balance"><p><strong>Permitió</strong> distinguir palabras con una regla sencilla.</p><p><strong>Dejó fuera</strong> las relaciones entre sus significados.</p></div>
    </div>
  )
}

function BagOfWords() {
  const [reversed, setReversed] = useState(false)
  const [repeated, setRepeated] = useState(false)
  const counts = [repeated ? 2 : 1, 1, 0]
  return (
    <div className="method-layout">
      <div className="method-copy"><p className="eyebrow">UN TEXTO → UN RECUENTO</p><h3>¿Cuántas veces aparece cada palabra?</h3><p><strong>Bag of Words</strong> significa «bolsa de palabras». Guardamos cuántas veces aparece cada una, como si metiéramos las palabras en una bolsa.</p><p>Sirvió para comparar documentos por las palabras que compartían.</p></div>
      <div className="method-visual">
        <p className="visual-label">DOS TEXTOS PEQUEÑOS</p>
        <p className="sample-text" aria-live="polite">A · {reversed ? 'gato perro' : 'perro gato'}{repeated ? ' perro' : ''}</p>
        <p className="sample-text secondary-sample">B · perro avión</p>
        <div className="word-selector"><button aria-pressed={reversed} onClick={() => setReversed(!reversed)}>Cambiar el orden de A</button><button aria-pressed={repeated} onClick={() => setRepeated(!repeated)}>Repetir «perro» en A</button></div>
        <table className="count-table"><caption>Recuento por palabra</caption><thead><tr><th scope="col">Texto</th>{vocabulary.map(w => <th scope="col" key={w}>{w}</th>)}</tr></thead><tbody><tr><th scope="row">A</th>{counts.map((n, i) => <td key={i}><span className="count-value" key={n}>{n}</span></td>)}</tr><tr><th scope="row">B</th>{[1, 0, 1].map((n, i) => <td key={i}>{n}</td>)}</tr></tbody></table>
        <p className="visual-explanation" aria-live="polite">{reversed ? 'El orden cambió; los conteos no.' : 'Prueba a cambiar el orden: los conteos seguirán siendo los mismos.'} {repeated ? 'Repetir «perro» sí aumenta su frecuencia.' : 'Repetir una palabra sí cambia su conteo.'}</p>
      </div>
      <div className="method-balance"><p><strong>Conserva</strong> la frecuencia: cuántas veces aparece cada palabra.</p><p><strong>Pierde</strong> el orden. Sigue contando coincidencias, sin representar el significado.</p></div>
    </div>
  )
}

function TfIdf() {
  const [weighted, setWeighted] = useState(false)
  return (
    <div className="method-layout">
      <div className="method-copy"><p className="eyebrow">DEL RECUENTO A LA RELEVANCIA</p><h3>No todas las palabras dicen lo mismo sobre un texto.</h3><p>Damos más importancia a una palabra cuando aparece mucho en este texto, pero no aparece en todos los textos.</p><p><strong>TF-IDF</strong> viene de <span lang="en">Term Frequency – Inverse Document Frequency</span>: frecuencia en el texto y rareza en la colección.</p></div>
      <div className="method-visual">
        <p className="visual-label">NUESTRA COLECCIÓN · TRES TEXTOS</p>
        <ol className="document-lines"><li><span>A</span> el perro, el perro</li><li><span>B</span> el gato</li><li><span>C</span> el avión</li></ol>
        <button className="scene-button" aria-pressed={weighted} onClick={() => setWeighted(!weighted)}>{weighted ? 'Volver al recuento' : 'Dar peso a las palabras de A'} <span aria-hidden="true">↗</span></button>
        <div className="weight-comparison" data-weighted={weighted} aria-live="polite">
          <p className="visual-label">{weighted ? 'IMPORTANCIA EN A · ILUSTRATIVA' : 'RECUENTO EN A'}</p>
          <div className="weight-row"><span>el</span><span className="weight-track" aria-hidden="true"><span className="weight-bar common" /></span><span>{weighted ? 'menor' : '2 veces'}</span></div>
          <div className="weight-row"><span>perro</span><span className="weight-track" aria-hidden="true"><span className="weight-bar specific" /></span><span>{weighted ? 'mayor' : '2 veces'}</span></div>
        </div>
        <p className="visual-explanation">«El» aparece en los tres textos; ayuda poco a distinguirlos. «Perro» se repite en A y solo aparece allí: lo caracteriza mejor.</p>
        <p className="experiment-note">Pesos ilustrativos, sin cálculo de TF-IDF. La importancia depende de la colección que comparemos.</p>
      </div>
      <div className="method-balance"><p><strong>Aportó</strong> una forma útil de buscar y ordenar documentos por palabras distintivas.</p><p><strong>No resuelve</strong> que palabras diferentes puedan tener significados parecidos.</p></div>
    </div>
  )
}

export function ClassicalRepresentationsScene() {
  const [method, setMethod] = useState(0)
  return (
    <section className="learning-scene classical-scene" id="representaciones" aria-labelledby="classical-title">
      <header className="scene-heading"><p className="eyebrow">03 / LAS PRIMERAS RESPUESTAS</p><h2 id="classical-title">Identificar.<br />Contar. <em>Dar peso.</em></h2><p>Tres maneras clásicas de hacer calculable el texto. Cada una resuelve algo y deja algo fuera.</p></header>
      <div className="method-navigation" role="group" aria-label="Explorar representaciones clásicas">{methods.map((name, i) => <button key={name} aria-pressed={method === i} aria-controls="method-content" onClick={() => setMethod(i)}><span>0{i + 1}</span>{name}</button>)}</div>
      <div id="method-content" className="method-content" key={method}>{method === 0 ? <OneHot /> : method === 1 ? <BagOfWords /> : <TfIdf />}</div>
      <div className="method-progress"><span>{method + 1} / 3</span><button className="scene-button" onClick={() => setMethod((method + 1) % 3)}>{method < 2 ? `Explorar ${methods[method + 1]}` : 'Volver a One-hot'} <span aria-hidden="true">→</span></button></div>
      <a className="scene-bridge" href="#significado">Ya tenemos números. ¿Dónde está el significado? <span aria-hidden="true">↓</span></a>
    </section>
  )
}
