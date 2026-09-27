import { useState } from 'react'

export function NumbersScene() {
  const [encoded, setEncoded] = useState(false)
  return (
    <section className="learning-scene numbers-scene" id="conceptos" aria-labelledby="numbers-title">
      <header className="scene-heading">
        <p className="eyebrow">02 / DEL LENGUAJE AL CÁLCULO</p>
        <h2 id="numbers-title">El ordenador<br />necesita <em>números.</em></h2>
        <p>Tú lees «perro» y piensas en un animal. Para operar con esa palabra, un ordenador necesita que la representemos con números.</p>
      </header>
      <div className="number-experiment">
        <div className="number-flow">
          <div><span className="visual-label">LO QUE LEEMOS</span><span className="large-word">perro</span></div>
          <span className="flow-connector" aria-hidden="true">→</span>
          <div><span className="visual-label">UNA REGLA POSIBLE</span><span className="rule-text">Asignar un<br />identificador</span></div>
          <span className="flow-connector" aria-hidden="true">→</span>
          <div className="number-result" aria-live="polite"><span className="visual-label">LO QUE GUARDAMOS</span><span className="large-word numeric" key={String(encoded)}>{encoded ? '01' : '?'}</span><span className="visual-label">{encoded ? 'ETIQUETA NUMÉRICA' : 'POR DECIDIR'}</span></div>
        </div>
        <button className="scene-button" onClick={() => setEncoded(!encoded)} aria-pressed={encoded}>{encoded ? 'Volver a la palabra' : 'Asignar un número'} <span aria-hidden="true">↗</span></button>
        <p className="experiment-note">Ejemplo inventado: 01 solo identifica «perro». Podríamos haber elegido otro número.</p>
      </div>
      <div className="scene-takeaway"><span aria-hidden="true">≠</span><p><strong>Identificar no es representar significado.</strong> Una etiqueta permite distinguir palabras; no dice cuáles se parecen.</p></div>
      <a className="scene-bridge" href="#representaciones">¿Cómo convertimos palabras en números útiles? <span aria-hidden="true">↓</span></a>
    </section>
  )
}
