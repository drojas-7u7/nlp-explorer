export function PipelineScene() {
  return (
    <section className="learning-scene" id="pipeline" aria-labelledby="pipeline-title">
      <header className="scene-heading">
        <p className="eyebrow">08 / UNIMOS LAS PIEZAS</p>
        <h2 id="pipeline-title">Una frase.<br /><em>Todo un recorrido.</em></h2>
        <p>Entonces, cuando escribimos una frase, ¿qué ocurre realmente? El texto se divide en tokens; ahora seguimos su viaje dentro del modelo.</p>
      </header>
      <div className="pipeline-source"><span className="visual-label">TEXTO ORIGINAL</span><p>Fui al <strong>banco</strong> a retirar dinero</p></div>
      <ol className="pipeline-route" aria-label="Del texto a las representaciones contextualizadas">
        <li><span className="pipeline-index">01 →</span><h3>Tokenización</h3><p>El tokenizador divide el texto en piezas de su vocabulario.</p><span className="pipeline-sample">Texto → piezas</span></li>
        <li><span className="pipeline-index">02 →</span><h3>Tokens</h3><p>Son las unidades de texto. Seguimos una de ellas:</p><span className="pipeline-sample">… | ▁banco | …</span></li>
        <li><span className="pipeline-index">03 →</span><h3>IDs</h3><p>Cada token tiene un identificador de vocabulario.</p><span className="pipeline-sample">▁banco → 66799</span></li>
        <li><span className="pipeline-index">04 →</span><h3>Representaciones iniciales</h3><p>Los IDs permiten buscar vectores aprendidos: listas de números con las que trabaja el modelo.</p><span className="pipeline-sample">ID → vector inicial</span></li>
        <li><span className="pipeline-index">05 →</span><h3>Transformer / contexto</h3><p>Procesa esas representaciones teniendo en cuenta las otras piezas de la frase.</p><span className="pipeline-sample">banco ↔ retirar ↔ dinero</span></li>
        <li><span className="pipeline-index">06 / SALIDA</span><h3>Embeddings contextualizados</h3><p>Una representación por token, enriquecida por el contexto de esta frase.</p><span className="pipeline-sample">vector inicial → contextual</span></li>
      </ol>
      <p className="experiment-note pipeline-provenance">Recorrido conceptual. Solo se destaca un token, no la segmentación completa. «▁banco» e ID 66799 están verificados para el tokenizador de la práctica; no son universales. Las relaciones ilustran el contexto, no pesos medidos.</p>
      <div className="scene-takeaway"><span aria-hidden="true">≠</span><p><strong>El ID identifica. El vector representa. El contexto enriquece.</strong>66799 no contiene por sí mismo el significado de «banco». Tras el Transformer, su representación incorpora pistas como «retirar» y «dinero».</p></div>
      <a className="scene-bridge" href="#similitud">¿Y si queremos representar una frase completa? <span aria-hidden="true">↓</span></a>
    </section>
  )
}
