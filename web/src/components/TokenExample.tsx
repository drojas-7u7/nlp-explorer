import { useReducedMotion } from 'motion/react'

const example = [{ text: '▁per', id: 117 }, { text: 'rito', id: 40880 }, { text: 's', id: 7 }]

export function TokenExample() {
  const reducedMotion = useReducedMotion()
  return (
    <section data-motion={reducedMotion ? 'reduced' : 'full'} className="token-example" id="exploraciones" aria-labelledby="token-title">
      <div className="token-heading"><span className="figure-index">01 /</span><h2 id="token-title">Una palabra. Varias piezas.</h2></div>
      <div className="token-demonstration">
        <div className="token-source">perritos<span>palabra</span></div>
        <span className="split-arrow" aria-hidden="true">→</span>
        <div className="token-row" aria-label="Tokens e IDs de vocabulario">
          {example.map((token) => <div className="token-unit" key={token.text}>
            <span className="token-piece">{token.text}</span>
            <span className="token-stem" aria-hidden="true">↓</span>
            <span className="token-id">{token.id}</span>
          </div>)}
        </div>
        <span className="token-legend">tokens<br /><span>↓</span><br />IDs</span>
      </div>
      <p className="marker-note"><span className="marker">▁</span> En este tokenizador, marca el comienzo de palabra / espacio previo. <span className="continuation">«rito» y «s» continúan la misma palabra.</span></p>
      <details className="token-note"><summary>Sobre este ejemplo real</summary><p>Segmentación e IDs obtenidos con el tokenizador de <span className="model-name">sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2</span>. La marca y los IDs dependen del tokenizador; no son universales ni indican similitud.</p></details>
    </section>
  )
}
