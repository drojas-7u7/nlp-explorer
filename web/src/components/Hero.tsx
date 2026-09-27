import { SemanticSpace } from './SemanticSpace'
import { TokenExample } from './TokenExample'

const steps = [
  { name: 'palabras', symbol: 'Aa', detail: 'El lenguaje que usamos' },
  { name: 'tokens', symbol: '▁', detail: 'Las piezas del texto' },
  { name: 'números', symbol: '01', detail: 'Una representación' },
  { name: 'significado', symbol: '↔', detail: 'Relaciones y contexto' },
]

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="small-line" /> EL LENGUAJE, BAJO OTRA MIRADA</p>
        <h1 id="hero-title">¿Cómo puede<br className="desktop-break" /> una máquina<br /> entender nuestro <span>lenguaje?</span></h1>
        <p className="hero-description">Para una máquina, las palabras son el principio.<br />Lo que importa son las relaciones entre ellas.</p>
      </div>
      <SemanticSpace />
      <TokenExample />
      <div className="journey-wrap">
        <p className="eyebrow journey-intro">DEL TEXTO<br />AL SIGNIFICADO</p>
        <ol className="journey" aria-label="Del lenguaje al significado">
          {steps.map((step) => (
            <li key={step.name}><span className="step-symbol" aria-hidden="true">{step.symbol}</span><div><span className="step-name">{step.name}</span><span className="step-detail">{step.detail}</span></div></li>
          ))}
        </ol>
      </div>
    </section>
  )
}
