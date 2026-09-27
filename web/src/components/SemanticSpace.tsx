import { useId } from 'react'
import { useReducedMotion } from 'motion/react'

export function SemanticSpace({ mode = 'preview' }: { mode?: 'preview' | 'identity' | 'meaning' }) {
  const id = useId()
  const identity = mode === 'identity'
  const reducedMotion = useReducedMotion()
  return (
    <figure data-motion={reducedMotion || mode !== 'preview' ? 'reduced' : 'full'} className="semantic-space" aria-labelledby={`${id}-caption`}>
      <div className="figure-heading"><span className="eyebrow">{identity ? 'DISTINTAS, IGUAL DE SEPARADAS' : 'EL SIGNIFICADO ES RELACIÓN'}</span><span className="figure-index">{mode === 'preview' ? 'FIG. 01' : 'FIG. 04'}</span></div>
      {identity ? <svg className="identity-space" viewBox="0 0 600 470" role="img" aria-labelledby={`${id}-identity-title ${id}-identity-desc`}>
        <title id={`${id}-identity-title`}>Perro, gato y avión: igual separación en one-hot.</title>
        <desc id={`${id}-identity-desc`}>Triángulo con tres lados iguales. Cada palabra activa una posición diferente; ninguna pareja es más cercana. Esquema de igualdad de distancias, no ejes medidos.</desc>
        <path className="identity-links" d="M150 340 450 340 300 80Z" />
        <g className="node-label"><text x="110" y="390">perro</text><text x="412" y="390">gato</text><text x="258" y="48">avión</text></g>
        <g className="identity-vectors"><text x="105" y="425">[1, 0, 0]</text><text x="405" y="425">[0, 1, 0]</text><text x="255" y="116">[0, 0, 1]</text></g>
        <circle className="node-ring" cx="150" cy="340" r="9" /><circle className="node-ring" cx="450" cy="340" r="9" /><circle className="node-ring" cx="300" cy="80" r="9" />
        <text className="relation-detail" x="300" y="270" textAnchor="middle">Ninguna pareja destaca</text>
      </svg> : <svg className={mode === 'meaning' ? 'meaning-reveal' : undefined} viewBox="0 0 600 470" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Perro y gato: próximos en significado. Avión: más separado.</title>
        <desc id={`${id}-desc`}>Un plano conceptual conecta perro y gato en una región compartida. Avión ocupa una región separada. No hay ejes ni valores medidos.</desc>
        <defs>
          <linearGradient id={`${id}-plane`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#7f9faa" stopOpacity=".04" /><stop offset="1" stopColor="#bbccd0" stopOpacity=".22" /></linearGradient>
          <linearGradient id={`${id}-region`}><stop stopColor="#a6d5d7" stopOpacity=".2" /><stop offset="1" stopColor="#a6d5d7" stopOpacity=".03" /></linearGradient>
        </defs>
        <g className="semantic-scaffold" aria-hidden="true">
          <path fill={`url(#${id}-plane)`} d="M30 315 217 92 574 168 387 401Z" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => <path key={`a${i}`} d={`M${30 + i * 59.5} ${315 + i * 14.33} l187 -223`} />)}
          {[0, 1, 2, 3, 4, 5].map(i => <path key={`b${i}`} d={`M${30 + i * 37.4} ${315 - i * 44.6} l357 86`} />)}
          <path className="plane-edge" d="M30 315 387 401 574 168 M30 329 387 415 574 182" />
        </g>
        <path className="semantic-region" style={{ fill: `url(#${id}-region)` }} d="M93 278 Q123 192 231 209 Q330 225 348 283 L293 349 Q170 377 93 278Z" />
        <path className="region-outline" d="M79 280 Q121 175 241 195 Q352 219 362 286 L299 363 Q156 396 79 280Z" />
        <path className="distant-connection" d="M283 260 C336 259 370 185 456 160" />
        <g className="projection-lines" aria-hidden="true"><path d="M164 296v37m119-73v46m173-146v43" /><path d="m155 333 9 3 9-3m101-27 9 3 9-3m164-103 9 3 9-3" /></g>
        <g className="semantic-pair">
          <path className="close-connection" d="M164 296 Q211 259 283 260" />
          <circle className="node-ring" cx="164" cy="296" r="17" /><circle className="close-node" cx="164" cy="296" r="6" />
          <text className="node-label" x="105" y="269">perro</text>
          <circle className="node-ring" cx="283" cy="260" r="17" /><circle className="close-node" cx="283" cy="260" r="6" />
          <text className="node-label" x="268" y="224">gato</text>
        </g>
        <path className="far-ring" d="m456 140 20 20-20 20-20-20Z" /><circle className="far-node" cx="456" cy="160" r="5" />
        <text className="node-label" x="442" y="121">avión</text>
        <text className="difference-label" x="397" y="75">más separado</text><path className="annotation-line" d="M430 83v16" />
        <path className="annotation-line" d="M193 365v33h-60" /><text className="relation-label" x="76" y="428">perro ↔ gato</text><text className="relation-detail" x="76" y="451">significados próximos</text>
      </svg>}
      <figcaption id={`${id}-caption`}><span className="caption-mark" aria-hidden="true">↔</span><div>{identity ? 'La identidad no expresa afinidad de significado.' : 'La cercanía expresa afinidad de significado.'}<br /><span>Representación conceptual · no es la salida de un modelo.</span></div></figcaption>
    </figure>
  )
}
