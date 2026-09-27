import { useState } from 'react'
import { SemanticSpace } from '../components/SemanticSpace'

export function MeaningProblemScene() {
  const [related, setRelated] = useState(false)
  return (
    <section className="learning-scene meaning-scene" id="significado" aria-labelledby="meaning-title">
      <header className="scene-heading"><p className="eyebrow">04 / LO QUE LOS CONTEOS NO VEN</p><h2 id="meaning-title">Distintas palabras.<br /><em>Algo en común.</em></h2><p>¿Qué pareja pondrías más cerca por su significado?</p></header>
      <div className="meaning-layout">
        <div className="meaning-copy"><p className="meaning-state">{related ? '02 / Nuestra intuición' : '01 / Solo identidades'}</p><h3>{related ? 'Perro y gato comparten algo.' : 'Tres posiciones. Ninguna afinidad.'}</h3><p>{related ? 'Ambos son animales. Para una persona, tienen más relación entre sí que con un avión. Esa relación de significado es lo que llamamos relación semántica.' : 'En one-hot, cada palabra tiene su propia casilla. Las tres están igual de separadas, aunque nosotros veamos una relación entre dos de ellas.'}</p><button className="scene-button" aria-pressed={related} onClick={() => setRelated(!related)}>{related ? 'Volver a las identidades' : 'Mostrar la relación que esperamos'} <span aria-hidden="true">↗</span></button><p className="experiment-note">Comparación conceptual: no transformamos estos conteos en un mapa ni calculamos similitudes.</p></div>
        <SemanticSpace mode={related ? 'meaning' : 'identity'} />
      </div>
      <div className="scene-takeaway"><span aria-hidden="true">↔</span><p><strong>Contar coincidencias fue útil. Relacionar significados pide algo más.</strong> One-hot, Bag of Words y TF-IDF no incorporan por sí solos que «perro» y «gato» están relacionados.</p></div>
      <div className="next-question"><p className="eyebrow">UNA PREGUNTA PARA SEGUIR</p><p>¿Y si la posición de una palabra<br />reflejara algo de su <em>significado?</em></p><span className="open-line" aria-hidden="true">↓</span></div>
    </section>
  )
}
