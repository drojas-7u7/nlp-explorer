import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { NumbersScene } from './scenes/NumbersScene'
import { ClassicalRepresentationsScene } from './scenes/ClassicalRepresentationsScene'
import { MeaningProblemScene } from './scenes/MeaningProblemScene'
import { EmbeddingsScene } from './scenes/EmbeddingsScene'
import { ContextScene } from './scenes/ContextScene'
import { TokenizationScene } from './scenes/TokenizationScene'
import { PipelineScene } from './scenes/PipelineScene'
import { SemanticSimilarityScene } from './scenes/SemanticSimilarityScene'
import { ClosingScene } from './scenes/ClosingScene'
import './styles/scenes.css'
import './styles/second-arc.css'
import './styles/closing-arc.css'
import './styles/closing-scene.css'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="page-shell">
        <Navigation />
        <main id="contenido">
          <Hero />
          <NumbersScene />
          <ClassicalRepresentationsScene />
          <MeaningProblemScene />
          <EmbeddingsScene />
          <ContextScene />
          <TokenizationScene />
          <PipelineScene />
          <SemanticSimilarityScene />
          <ClosingScene />
        </main>
        <footer id="recursos" className="footer">
          <span>NLP EXPLORER <span className="footer-divider">/</span> Un primer vistazo al lenguaje</span>
          <span id="pdf">Recursos y PDF · Próximamente</span>
        </footer>
      </div>
    </>
  )
}
