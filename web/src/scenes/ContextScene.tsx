import { useState } from 'react'

export function ContextScene() {
  const [contextual, setContextual] = useState(false)
  return (
    <section className="learning-scene" id="contexto" aria-labelledby="context-title">
      <header className="scene-heading"><p className="eyebrow">06 / LA MISMA PALABRA, OTRO SENTIDO</p><h2 id="context-title">«Banco» necesita <em>su frase.</em></h2><p>La palabra escrita es la misma. Pero ¿nos sentamos o retiramos dinero?</p></header>
      <div className="context-pair" data-contextual={contextual}>
        <div><p className="visual-label">01 / EN EL PARQUE</p><p className="context-sentence">Me senté en un <strong>banco</strong> del <span className={contextual ? 'context-clue' : ''}>parque</span></p><div className="context-result"><span aria-hidden="true">↓</span><span className="representation">{contextual ? 'banco + parque → asiento' : 'banco → representación A'}</span></div></div>
        <div><p className="visual-label">02 / AL RETIRAR DINERO</p><p className="context-sentence">Fui al <strong>banco</strong> a <span className={contextual ? 'context-clue' : ''}>retirar dinero</span></p><div className="context-result"><span aria-hidden="true">↓</span><span className="representation">{contextual ? 'banco + retirar + dinero → entidad financiera' : 'banco → representación A'}</span></div></div>
      </div>
      <button className="scene-button" aria-pressed={contextual} onClick={() => setContextual(!contextual)}>{contextual ? 'Volver a la representación estática' : 'Incorporar el contexto'} <span aria-hidden="true">↔</span></button>
      <p className="visual-explanation" aria-live="polite">{contextual ? 'Dos usos, dos representaciones según la frase. Las palabras subrayadas muestran pistas relevantes; «asiento» y «entidad financiera» describen los sentidos, no son vectores ni salidas de un modelo.' : 'Un embedding estático asigna una sola representación a «banco». Por sí solo, no distingue estos dos usos.'}</p>
      <div className="lesson-block"><p className="eyebrow">DEL PROBLEMA A LA HERRAMIENTA</p><h3>Mirar las otras palabras para interpretar esta.</h3><p>Necesitamos una <strong>representación contextual</strong>. Los <strong>Transformers</strong> permiten calcular la representación de una palabra teniendo en cuenta las demás palabras de la secuencia.</p><p>Su mecanismo de <strong>atención</strong> permite que cada palabra se fije en otras partes de la frase para decidir qué información es relevante.</p><div className="paired-explanations attention-links"><p>banco ↔ parque</p><p>banco ↔ retirar ↔ dinero</p></div><p className="experiment-note">Conexiones ilustrativas, no pesos de atención medidos. BERT es un ejemplo importante de representaciones contextuales basadas en Transformer. Tener contexto ayuda; no garantiza interpretar todo correctamente.</p></div>
      <div className="paired-explanations static-comparison"><div><h3>Embedding estático</h3><p>banco → una representación</p><p className="experiment-note">La misma en las dos frases.</p></div><div><h3>Embedding contextual</h3><p>banco + contexto → una representación según la frase</p><p className="experiment-note">La escritura coincide; la representación puede cambiar.</p></div></div>
      <a className="scene-bridge" href="#tokenizacion">Antes de representar: ¿cómo entra el texto al modelo? <span aria-hidden="true">↓</span></a>
    </section>
  )
}
