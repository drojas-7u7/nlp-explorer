const applications = [
  ['Búsqueda semántica', 'Buscar por significado, no solo por palabras exactas.'],
  ['Recomendaciones', 'Sugerir contenido con significado parecido.'],
  ['Clustering / agrupación', 'Reunir textos con temas similares.'],
  ['Clasificación', 'Asignar categorías a los textos.'],
  ['RAG', 'Recuperar información relevante antes de generar una respuesta.'],
]

export function SemanticSimilarityScene() {
  return (
    <section className="learning-scene" id="similitud" aria-labelledby="similarity-title">
      <header className="scene-heading">
        <p className="eyebrow">09 / DE PALABRAS A FRASES</p>
        <h2 id="similarity-title">Distintas palabras.<br /><em>Una idea parecida.</em></h2>
        <p>¿Y si queremos comparar el significado de frases completas? Un modelo preparado para ello puede obtener un embedding de frase: un vector que resume información semántica útil. También podemos representar documentos.</p>
      </header>
      <div className="similarity-layout">
        <div>
          <ol className="sentence-examples" aria-label="Frases de la práctica">
            <li><span>A</span><p>Quiero cambiar mi contraseña</p></li>
            <li><span>B</span><p>Necesito modificar mi clave de acceso</p></li>
            <li><span>C</span><p>Mañana va a llover</p></li>
          </ol>
          <p className="visual-explanation">A y B expresan una intención similar. C habla del tiempo.</p>
        </div>
        <figure className="sentence-directions">
          <svg viewBox="0 0 440 280" role="img" aria-labelledby="directions-title directions-desc">
            <title id="directions-title">Comparar la dirección de los vectores</title>
            <desc id="directions-desc">Tres flechas parten del mismo origen. A y B apuntan en direcciones muy parecidas hacia la derecha; C apunta hacia arriba. Es un esquema conceptual, no una proyección de embeddings reales.</desc>
            <defs><marker id="sentence-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" /></marker></defs>
            <path className="direction-guide" d="M65 225 H405 M65 225 V25" />
            <path className="sentence-arrow sentence-arrow-a" d="M65 225 L370 125" markerEnd="url(#sentence-arrow)" />
            <path className="sentence-arrow sentence-arrow-b" d="M65 225 L325 90" markerEnd="url(#sentence-arrow)" />
            <path className="sentence-arrow sentence-arrow-c" d="M65 225 L90 40" markerEnd="url(#sentence-arrow)" />
            <circle cx="65" cy="225" r="5" fill="var(--color-text)" />
            <text x="385" y="132">A</text><text x="333" y="77">B</text><text x="83" y="26">C</text>
          </svg>
          <figcaption>Esquema conceptual: direcciones ilustrativas, sin medidas reales.</figcaption>
        </figure>
      </div>
      <div className="cosine-explanation">
        <h3>¿Apuntan en una dirección parecida?</h3>
        <p>En lugar de preguntar si dos vectores están exactamente en el mismo punto, comparamos su dirección.</p>
        <div className="direction-key"><p><strong>A ↔ B · dirección muy parecida</strong>Similitud alta</p><p><strong>A ↔ C · dirección poco relacionada</strong>Similitud baja</p></div>
        <p>Esta comparación se llama <strong>similitud del coseno</strong>. Compara orientación; no mide la distancia entre los extremos de las flechas.</p>
      </div>
      <details className="semantic-applications"><summary>¿Para qué sirve comparar significados?</summary><dl>{applications.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></details>
      <div className="colab-handoff"><p className="eyebrow">DE LA INTUICIÓN A LA PRÁCTICA</p><h3>Ahora vamos a medirlo<br /><em>con un modelo real.</em></h3><p>En Google Colab obtendremos los embeddings de estas tres frases y calcularemos la similitud A–B y A–C. Veremos qué valores devuelve el modelo y cómo interpretarlos.</p></div>
    </section>
  )
}
