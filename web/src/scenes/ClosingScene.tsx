const applications = [
  ['Búsqueda semántica', 'Encontrar información por significado, aunque no use exactamente las mismas palabras.'],
  ['Recomendaciones', 'Encontrar elementos parecidos según sus representaciones.'],
  ['Agrupación / clustering', 'Agrupar automáticamente elementos similares.'],
  ['Clasificación', 'Ayudar a asignar categorías a los textos.'],
  ['RAG', 'Recuperar información relevante antes de que un modelo genere una respuesta.'],
]

const journey = ['Texto', 'Tokens', 'IDs', 'Representaciones numéricas', 'Contexto', 'Embeddings', 'Comparación semántica', 'Aplicaciones reales']

export function ClosingScene() {
  return (
    <section className="learning-scene closing-scene" id="cierre" aria-labelledby="closing-title">
      <header className="scene-heading">
        <p className="eyebrow">10 / DE LA PRÁCTICA AL MUNDO REAL</p>
        <h2 id="closing-title">Ya lo has ejecutado.<br /><em>Ahora, ¿para qué sirve?</em></h2>
        <p>En el reto, dos formas de pedir una devolución quedaron más próximas entre sí que a una pregunta sobre el tiempo. Hemos comparado algo más que palabras idénticas.</p>
      </header>

      <section className="closing-block" aria-labelledby="closing-applications">
        <p className="eyebrow">APLICACIONES</p>
        <h3 id="closing-applications">¿Para qué sirve todo esto fuera de este ejemplo?</h3>
        <dl className="closing-applications">
          {applications.map(([name, description]) => <div key={name}><dt>{name}</dt><dd>{description}</dd></div>)}
        </dl>
      </section>

      <section className="closing-block" aria-labelledby="closing-limits">
        <p className="eyebrow">LÍMITES Y USO RESPONSABLE</p>
        <h3 id="closing-limits">Similitud semántica<br /><em>no significa verdad.</em></h3>
        <p className="closing-lead">Un embedding es una representación aprendida, no una comprensión humana perfecta. Una puntuación alta no garantiza que una respuesta, un documento o una decisión sean correctos.</p>
        <div className="closing-considerations">
          <section aria-labelledby="closing-context">
            <h4 id="closing-context">El modelo y el contexto importan</h4>
            <p>Dos frases pueden obtener una puntuación inesperada. El resultado depende del modelo, del contexto y del dominio: un umbral de similitud no es una verdad universal.</p>
          </section>
          <section aria-labelledby="closing-bias">
            <h4 id="closing-bias">Los datos dejan huella</h4>
            <p>Los modelos aprenden de datos. Si contienen sesgos o representaciones desequilibradas, esos patrones pueden reflejarse también en las representaciones y los resultados.</p>
          </section>
          <section aria-labelledby="closing-privacy">
            <h4 id="closing-privacy">Antes de procesar textos reales</h4>
            <ul>
              <li>¿Contienen datos personales?</li>
              <li>¿Tenemos permiso para utilizarlos?</li>
              <li>¿Dónde se ejecuta el modelo?</li>
              <li>¿Qué datos se almacenan o comparten?</li>
            </ul>
            <p>En nuestra práctica descargamos el modelo y calculamos los embeddings en el entorno de ejecución de Colab, sin una API comercial de embeddings. En un sistema real hay que revisar su propio recorrido de datos.</p>
          </section>
          <section aria-labelledby="closing-cost">
            <h4 id="closing-cost">Representar también tiene coste</h4>
            <p>Representaciones más potentes también tienen coste: tiempo de cálculo, memoria, almacenamiento de embeddings y latencia —el tiempo de espera—. A escala, también hace falta infraestructura.</p>
            <p>Nuestro modelo compacto y tres frases cuestan poco de ejecutar. Millones de documentos y muchos usuarios cambian el problema.</p>
          </section>
        </div>
        <div className="closing-decision">
          <h4>Una puntuación no debería convertirse automáticamente en una decisión sensible sin validación.</h4>
          <p>Evalúa con datos reales del caso de uso, comprueba errores y define criterios adecuados. Mantén revisión humana cuando las consecuencias lo requieran, especialmente si afectan a personas.</p>
        </div>
        <aside className="closing-ethics" aria-labelledby="closing-ethics-title">
          <h4 id="closing-ethics-title">Ética en la práctica</h4>
          <p>Los embeddings permiten comparar y organizar lenguaje de forma potente, pero heredan limitaciones de los datos y del modelo. Su uso responsable exige evaluar errores y sesgos, proteger los datos personales, comprender el contexto de uso y evitar convertir una puntuación de similitud en una decisión automática sin validación adecuada, especialmente cuando pueda afectar a personas.</p>
        </aside>
      </section>

      <section className="closing-block closing-finale" aria-labelledby="closing-recap">
        <p className="eyebrow">LA CADENA COMPLETA</p>
        <h3 id="closing-recap">¿Cómo puede un ordenador trabajar con nuestro lenguaje?</h3>
        <p className="closing-lead">Empezamos con esta pregunta. Ahora hemos recorrido la idea y la hemos hecho funcionar.</p>
        <ol className="closing-journey" aria-label="Del texto a las aplicaciones reales">
          {journey.map((step, index) => <li key={step}>{step}{index < journey.length - 1 && <span aria-hidden="true"> →</span>}</li>)}
        </ol>
        <ol className="closing-conclusions">
          <li><strong>Tokenizar no es comprender.</strong><span>La tokenización divide el texto en piezas y les asigna identificadores.</span></li>
          <li><strong>Un embedding representa mediante números.</strong><span>Intenta recoger información útil sobre significado y relaciones.</span></li>
          <li><strong>Comparar exige interpretar.</strong><span>La similitud semántica es útil, pero es una medida del modelo que debemos interpretar y validar.</span></li>
        </ol>
        <p className="closing-last">Del texto a los números. De los números a una comparación que ya sabes interpretar.</p>
      </section>
    </section>
  )
}
