# NLP Explorer

Fundamentos de NLP moderno: tokenización avanzada y embeddings semánticos. El material combina una web conceptual y visual, live coding, un reto y soluciones de referencia. Esta guía sirve para preparar y recuperar la práctica; las explicaciones conceptuales están en la web.

## Materiales y orden de uso

| Material | Para qué sirve |
|---|---|
| [PDF de estudio](pdf/NLP_Explorer.pdf) | Material autónomo de consulta y repaso; se abre con un lector PDF. |
| [web/](web/) | Experiencia conceptual y visual. Sus diagramas semánticos son ilustrativos, no distancias medidas. |
| [live-coding.ipynb](notebooks/live-coding.ipynb) | Notebook guiado para la demostración, con huecos deliberados que se completan durante la práctica. |
| [live-coding-solution.ipynb](notebooks/live-coding-solution.ipynb) | Código completo del live coding, como referencia y apoyo para recuperación. |
| [challenge.ipynb](notebooks/challenge.ipynb) | Ejercicio del alumnado con tareas `To-Do` y pistas. |
| [challenge-solution.ipynb](notebooks/challenge-solution.ipynb) | Referencia completa para comprobar y corregir el reto. |

1. Recorre NLP Explorer.
2. Abre `live-coding.ipynb` en Google Colab y completa y ejecuta sus celdas en orden.
3. Realiza `challenge.ipynb`.
4. Consulta las soluciones para comprobar, corregir o recuperarte de una incidencia.
5. Utiliza el PDF para repasar y profundizar después de la práctica.

Cada notebook es independiente: no des por compartidos la instalación, el runtime, las variables ni el modelo cargado entre pestañas o notebooks. No hace falta empezar por las soluciones.

## Requisitos para los notebooks

Necesitas un navegador moderno, una cuenta o acceso normal a Google Colab y conexión a Internet para instalar la librería y descargar el modelo. Una CPU es suficiente.

No necesitas GPU, API key, `HF_TOKEN`, Google Drive, Conda ni un entorno local para practicar en Colab.

- Librería: `sentence-transformers==6.1.0`, instalada por la primera celda.
- Modelo: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`.

La carga utiliza `device="cpu"`; en el guiado debes completar esa instrucción. Es intencionado para no depender de una GPU: no cambies el runtime a GPU. Esto no implica que una CPU siempre sea más rápida.

## Preparación en Google Colab

1. Descarga el archivo `.ipynb` que vas a utilizar de los enlaces de materiales.
2. Abre Google Colab y utiliza la opción de abrir/subir un notebook para seleccionar ese archivo; no necesitas guardarlo en Drive.
3. Conecta el entorno de ejecución (*runtime*), donde se ejecutará el código.
4. Lee, completa cuando corresponda y ejecuta las celdas de arriba abajo. Espera a que cada celda termine antes de continuar.

La instalación y la primera carga se hacen durante la práctica, en directo. Pueden tardar más porque descargan archivos; no hay un tiempo garantizado.

La primera vez el modelo necesita descargarse. En ejecuciones posteriores puede haber archivos en caché (ya descargados en ese entorno), pero no debes contar con ello. Un runtime nuevo puede necesitar descargarlos otra vez.

## Incidencias y recuperación

### Aviso de Hugging Face sobre token o autenticación

Para este modelo público, un aviso de ausencia de `HF_TOKEN` no significa por sí solo que la ejecución haya fallado. Comprueba si la descarga continúa, si la celda termina y si aparece realmente una excepción o error. No necesitas crear un token para resolver un aviso que no bloquea la práctica.

### `NameError` o variable no definida

Normalmente falta ejecutar o completar una celda anterior, o el runtime se ha reiniciado. El orden del live coding es:

**instalación → imports y modelo → tokenizer → sentences → embeddings → similitudes**.

El reto pasa de imports y modelo a `sentences`, sin el bloque de tokenización. Vuelve a la primera celda necesaria y ejecuta en orden. Si el entorno es nuevo, empieza por la instalación. En los notebooks guiados, completa primero los huecos o `To-Do`: ejecutar celdas con solo comentarios no crea variables. En las soluciones completas sí puedes utilizar «Ejecutar todas» (*Run all*).

### `IndentationError`

Python usa la indentación para indicar qué líneas pertenecen a un `for` o un `if`. Revisa los espacios al principio de las líneas, especialmente en los bucles de tokenización y de «banco». Mantén el mismo nivel para las instrucciones del mismo bloque; compara con la solución si es necesario.

### No aparece la pieza `▁banco`

El carácter `▁` no es el guion bajo normal `_`. Si escribes otro carácter en `if token == "▁banco":`, la comparación puede no encontrar la pieza esperada.

Comprueba primero la lista de tokens y copia de ella el token real. No sustituyas el cálculo por una salida escrita a mano. En las dos frases de la práctica («Me senté en un banco del parque» y «Fui al banco a retirar dinero») se validó `▁banco` → ID `66799`. Ese ID pertenece al modelo/tokenizador utilizado; no es una propiedad universal de la palabra «banco».

### Los resultados numéricos son diferentes

Puede haber pequeñas diferencias según el entorno y las versiones. No es necesario coincidir en todos los decimales: lo importante en estos ejemplos es que A↔B tenga mayor similitud que A↔C. Las referencias observadas están en la tabla de resultados de abajo.

Si esa relación cambia completamente, comprueba las frases exactas, el orden A/B/C, el modelo cargado y que hayas ejecutado las celdas correctas después de cualquier cambio.

### La forma del tensor (`shape`) es distinta

La referencia es `torch.Size([3, 384])`: tres frases y 384 valores por frase para **este modelo**. Si aparece otra forma, comprueba que `sentences` contiene exactamente `[A, B, C]` y que cargaste el modelo indicado. No todos los modelos generan embeddings de 384 dimensiones.

### La similitud es negativa

Un valor ligeramente negativo es un resultado posible de la similitud del coseno. No significa automáticamente antonimia, fallo del modelo ni un porcentaje negativo. Interprétalo comparativamente y según el caso de uso.

### El modelo no descarga

1. Comprueba la conexión a Internet.
2. Comprueba que la celda de instalación terminó sin error.
3. Vuelve a ejecutar la celda de carga una vez.
4. Lee el error real si vuelve a fallar.
5. Si el runtime quedó en mal estado, reinícialo y vuelve a ejecutar desde la preparación, en orden.

### Colab se desconecta o el runtime se reinicia

Un runtime reiniciado pierde las variables en memoria. El archivo del notebook sigue existiendo, pero debes recrear `model`, `tokenizer` (en el live coding) y `embeddings` ejecutando las celdas necesarias en orden. Conserva tus cambios descargando el notebook si necesitas recuperarlos después; no confundas el archivo con el estado del runtime.

### Sigo bloqueado

1. Lee el mensaje de error completo.
2. Comprueba la celda anterior y si terminó correctamente.
3. Consulta la sección correspondiente de esta guía.
4. Compara tu código con el notebook solución del mismo ejercicio.
5. Vuelve a ejecutar desde el último estado conocido correcto; si reiniciaste el runtime, empieza desde la preparación.

Si la descarga sigue impidiendo ejecutar, puedes continuar la comparación e interpretación con las referencias siguientes y el código de la solución. Son resultados de ejecuciones previas validadas, no una ejecución de tu entorno. Retoma la ejecución cuando se resuelva la incidencia.

## Resultados de referencia validados

Observados con `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` y `sentence-transformers==6.1.0`, en CPU. Las puntuaciones son aproximaciones de ejecuciones validadas, no constantes garantizadas.

| Comprobación | Referencia |
|---|---|
| `perro` | `['▁per', 'ro']` |
| `perros` | `['▁per', 'ros']` |
| `perrito` | `['▁per', 'rito']` |
| `perritos` | `['▁per', 'rito', 's']` |
| Pieza de «banco» en ambas frases | `▁banco` → ID `66799` |
| Embeddings de A/B/C | `torch.Size([3, 384])` |
| Live coding: A↔B / A↔C | ≈ `0.7471` / ≈ `-0.0577` |
| Reto: A↔B / A↔C | ≈ `0.7669` / ≈ `-0.0830` |

## Privacidad

La práctica no utiliza una API comercial de embeddings: el modelo se descarga y la inferencia se ejecuta en el runtime utilizado. En Colab, ese runtime es el entorno de Colab, no tu ordenador.

En proyectos reales, no introduzcas automáticamente datos personales o sensibles sin entender dónde se procesan, qué servicio utilizas, qué se almacena y qué permisos existen.

## Web local opcional

No necesitas ejecutar la web localmente para usar los notebooks en Colab. Si quieres lanzar la web desde una copia del proyecto, necesitas Node.js y npm. Desde la carpeta raíz:

```sh
cd web
npm ci
npm run dev
```

Abre la dirección local que indique Vite. La primera instalación necesita Internet para descargar las dependencias y las fuentes; se instalan dentro del proyecto.

Para validar la web, desde `web/`:

```sh
npm run build
npm run lint
```

Después de compilar, puedes previsualizarla con `npm run preview`. Estos comandos corresponden a los scripts de [web/package.json](web/package.json).

## Hosting estático

Desde `web/`, ejecuta `npm ci` y `npm run build`. Sirve el contenido de `web/dist/` en un hosting estático. La configuración usa rutas relativas (`base: './'`), por lo que admite una raíz o subcarpeta sin fijar dominio ni nombre de repositorio. `npm run preview` permite revisar el resultado localmente; no es un servidor de producción.

El PDF y los cuatro notebooks se distribuyen con este paquete, fuera del build de la web. Consérvalos junto con este README para que los enlaces de materiales funcionen.
