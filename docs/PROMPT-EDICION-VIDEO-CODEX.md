# Prompt maestro de edición — demo de HoneyPhone

Abre `/home/fullg/Videos/ffmpeg-codex/honeyphone-demo` en una nueva sesión de Codex. Copia el bloque completo que sigue y úsalo como instrucción principal de edición.

```text
Eres responsable de convertir los recursos de este directorio en el video final de demostración de HoneyPhone. Edita la composición de Remotion, construye el montaje, anima las escenas, mezcla los audios, renderiza el video y revisa lo que exportaste. No termines entregando únicamente un concepto, una lista de recomendaciones o un prompt nuevo.

# 1. Qué video quiero

Quiero un demo de producto de HoneyPhone que se sienta cuidado, claro, actual, seguro y con personalidad. Debe transmitir que la aplicación está activa y observando señales: la información aparece, se mueve, se conecta y cambia de estado a medida que la narración explica cada función.

El ritmo debe ser vivo, con cambios frecuentes de encuadre y transiciones con decisión. Mantén control visual: cada movimiento tiene una razón narrativa; no uses movimiento aleatorio, efectos por llenar espacio ni una estética de videojuego. El resultado debe sentirse como una pieza de producto editorial y cinematográfica, con tipografía atrevida y una identidad visual limpia.

La captura actual de referencia —barra fija arriba, línea divisoria, título y párrafo a la izquierda, teléfono quieto a la derecha, contadores y etiquetas pequeñas— está RECHAZADA. No la uses como plantilla para ninguna escena. El mockup del teléfono no puede quedarse anclado en el mismo lugar mostrando un video raw mientras solo cambian los títulos.

Mantén Remotion como compositor final y trabaja a 1920×1080, 30 fps, con duración objetivo cercana a 4:50. Conserva los videos originales y la locución exactamente como están.

# 2. Primero inspecciona el proyecto

Antes de tocar archivos:

1. Lee `README.md`, `docs/guion-voz-ia.md`, `docs/plan-montaje.md`, `docs/identidad-visual.md`, `docs/recursos-movimiento-y-agentes.md` y `docs/voz-eleven-labs.md`.
2. Carga `$honeyphone-motion-direction` y las skills `remotion-best-practices`, `remotion-markup`, `remotion-captions`, `remotion-studio` y `remotion-render`.
3. Revisa `src/HoneyPhoneDemo.tsx`, `src/captions.ts`, los diez clips en `public/media/raw/`, la bienvenida editada, los audios y las referencias en `references/`.
4. Comprueba duración y encuadre de los medios con `ffprobe` antes de asignarlos. No inventes valores ni contenido de la interfaz.
5. Si encuentras textos, clips o subtítulos que contradigan el audio o la captura real, corrige su sincronización y legibilidad sin cambiar el sentido del guion.

# 3. Dirección de arte: limpieza, contraste y jerarquía

## Paleta

El cuadro debe ser casi completamente negro, blanco y gris. El ámbar HoneyPhone es una chispa de atención, no el tema dominante de cada escena.

- Usa negro `#000000` y superficies muy oscuras como fondo.
- Usa blanco `#F4F4F4` para el contenido principal y grises claros para información secundaria.
- Limita el ámbar `#F5B700` a indicadores activos, un dato clave, una palabra destacada o un pulso de señal. Como referencia, que cubra menos del 5 % de la imagen en un momento dado.
- No pongas títulos amarillos, líneas amarillas largas, marcos amarillos repetidos, fondos amarillos ni bandas de color.
- No uses cian ni magenta como color que cambia con cada sección. Mantén los colores propios de las capturas reales de la app cuando aparezcan.

## Tipografía

La tipografía debe tener presencia y carácter, sin parecer una plantilla corporativa:

- **Unbounded** en titulares principales, frases breves y golpes tipográficos. Titulares de 82–120 px en el canvas 1920×1080.
- **Plus Jakarta Sans** para subtítulos y texto de apoyo, de 28–38 px.
- **JetBrains Mono** para métodos HTTP, dBm y etiquetas técnicas necesarias, con tamaño mínimo de 20 px.
- Subtítulos de 36–52 px, alto contraste, ritmo claro y palabras clave enfatizadas.
- No conviertas la escena en una diapositiva con un título largo, un párrafo explicativo, una etiqueta pequeña, un callout y una captura alineados a la vez. La voz explica; el texto en pantalla debe apoyar con frases concisas.
- No uses microtexto decorativo, lemas aleatorios, encabezados “DEMO DEL PRODUCTO”, contadores `01/10`, pies de página o etiquetas genéricas que no estén en el guion.

## Composición

Diseña cada escena como una composición audiovisual completa, no como una diapositiva:

- Varía libremente la ubicación del teléfono, el área que ocupa, el recorte y la dirección del movimiento. No mantengas la fórmula “texto a la izquierda + teléfono a la derecha”.
- Alterna entre el teléfono completo, acercamientos a la pantalla, pantalla a sangre sin marco, planos inclinados breves, datos flotando alrededor del producto y composiciones tipográficas que ocupen el cuadro.
- El teléfono debe entrar, salir, avanzar, retroceder o cambiar de posición de forma perceptible. Puede inclinarse ligeramente y usar profundidad/parallax; evita que flote sin motivo o tiemble continuamente.
- No mantengas una línea, rejilla, borde, cabecera, pie o barra de progreso en pantalla durante todo el video. Usa elementos gráficos cuando expliquen datos o sirvan a una transición.
- Deja espacios negativos. Evita llenar cada zona con tarjetas, captions, partículas y rótulos simultáneos.
- Conserva el logo real transparente `public/brand/logo_sin_fondo.png`. Úsalo como motivo de apertura y/o cierre y en momentos puntuales de marca, no como pequeña marca fija en cada escena.

# 4. Movimiento: requisito principal

La sensación de movimiento debe leerse de inmediato incluso viendo el video sin sonido. Un fondo con partículas, un cursor que aparece o un zoom casi imperceptible no son suficientes.

En cada una de las diez escenas crea al menos **tres beats visuales distintos** y enlázalos con la narración. Incluye, como mínimo:

1. Un movimiento visible de cámara o teléfono: acercamiento, alejamiento, desplazamiento apreciable, inclinación o cambio de plano.
2. Una acción de interfaz o un dato que se revele, se dibuje, se desplace o cambie de estado de acuerdo con la función mostrada.
3. Un cambio de composición: por ejemplo pasar de teléfono completo a pantalla a sangre, mover el bloque tipográfico, entrar en split-screen, comparar tarjetas o volver al producto.

Como pauta de intensidad, busca cambios de escala de alrededor de 8–18 %, desplazamientos de alrededor del 8–15 % del cuadro o giros breves de 2–5 grados. No es necesario aplicar las tres medidas en cada toma; sí es necesario que el espectador perciba que la cámara y el producto se están moviendo. Protege la legibilidad: cuando un valor importante ocupe el cuadro, estabiliza el plano mientras se lee.

Mantén una composición sin cambios como máximo unos 2–3 segundos, salvo una pausa intencional para leer una métrica. Dentro de una pausa, conserva vida ambiental sutil. No uses movimiento por segundo de forma mecánica: sincroniza los golpes fuertes con palabras, acciones o transiciones de idea.

## Fondo vivo

Crea un campo ambiental de esporas, partículas y señales de profundidad:

- Combina unas pocas partículas grandes y difusas con otras pequeñas, finas y más lejanas.
- Hazlas derivar lentamente con ligeras variaciones de foco, dirección y brillo. Añade un pulso de señal o expansión de ondas solo en momentos clave.
- Usa semillas deterministas y el frame de Remotion. No uses `Math.random()` cambiante, timers ni animaciones dependientes del reloj real.
- El fondo debe ser perceptible en movimiento, pero permanecer detrás del teléfono, la interfaz y los subtítulos. No añadas una cuadrícula de líneas ni conviertas el fondo en una nube amarilla.
- Cambia densidad, velocidad y dirección entre momentos para que no parezca un loop uniforme.

## Teléfono e interfaz

- Reencuadra el clip real según lo que se narra. Muestra controles y métricas con suficiente tamaño para entenderlos.
- Usa movimiento de cámara para conectar tomas: push-in hacia un dato, paneo que revela una vista, transición a pantalla a sangre y alejamiento para recuperar el contexto.
- Puedes separar visualmente el contenido de pantalla del marco del teléfono, pero mantén la misma captura real; no redibujes la app ni inventes una vista que no existe.
- Resalta con máscaras, contornos breves, flechas o un cursor/tap solamente el control relacionado con la locución.
- La pantalla puede ocupar la mayoría del encuadre durante la explicación de una función. No es obligatorio mostrar siempre el borde completo del celular.

# 5. Recorrido visual escena por escena

Usa esta propuesta como dirección de arte y conserva el orden, el audio y los hechos del guion. Adapta las duraciones exactas a `docs/plan-montaje.md`.

## 01 — Bienvenida · 00:00–00:24

Empieza con negro y una presencia ambiental sutil. Revela el logo de HoneyPhone con partículas/señal y conecta ese pulso con la animación de apertura de la app. El teléfono puede entrar desde fuera del cuadro y acercarse; después, empuja la cámara hasta que la app ocupe más espacio. La apertura de la aplicación aparece solo aquí. Coloca la frase principal con una entrada tipográfica decidida y limpia, y despeja la pantalla antes de pasar a Wi-Fi. No muestres un título y párrafo inmóviles durante los 24 segundos.

## 02 — Lectura Wi-Fi · 00:24–00:59

Cambia el encuadre con un corte al movimiento de señal. Lleva al frente la vista real de Red Wi-Fi y enfatiza el valor de dBm, la banda/canal o la velocidad únicamente cuando se mencione en la voz y aparezca en el clip. Deja que una onda o pulso conecte esos elementos. Alterna el teléfono completo con acercamientos legibles a los valores. El ámbar puede señalar el indicador activo; el resto queda blanco y gris.

## 03 — Detalle de señales · 00:59–01:35

Transforma la lectura en un recorrido breve por indicadores: protección Wi-Fi, portal de acceso, DNS y HTTPS según el contenido de la toma y el guion. Revela cada comprobación por separado mediante un trazo, nodo o cambio de foco. Usa un plano cercano y luego abre el encuadre para mostrar cómo los indicadores pertenecen al mismo informe. No añadas un encabezado permanente ni una lista de términos técnicos diminutos.

## 04 — Simulaciones · 01:35–02:03

Haz que las tarjetas o estados de ejemplo entren desde direcciones distintas y puedan compararse: normal, discrepante y lectura incompleta si esas opciones aparecen en la app. Usa capas, profundidad y cambios de escala. La palabra “simulación” debe ser clara para no confundir esos ejemplos con lecturas reales. Termina con un corte o desplazamiento que transforme las tarjetas en historial.

## 05 — Actividad e historial · 02:03–02:25

Convierte el historial en una secuencia dinámica de registros que avanza, se ordena o se desplaza. Destaca fecha, categoría y estado de sincronización solo si aparecen en pantalla. Cambia el encuadre de lista completa a una tarjeta concreta y vuelve a abrir el plano. Diferencia visualmente las lecturas Wi-Fi y las sesiones del señuelo sin inventar un estado.

## 06 — Envío a la API · 02:25–02:46

Representa el envío decidido por el usuario como un trayecto: el registro sale del teléfono, recorre una línea/paquete de datos y llega a un indicador genérico de API. El indicador se confirma en sincronía con la acción real del clip. Muestra que el usuario controla el envío. No dibujes tokens, direcciones privadas ni respuestas inventadas.

## 07 — Señuelo local · 02:46–03:20

Revela el señuelo local como una pequeña escena dentro de la escena: el teléfono muestra el servicio, los métodos HTTP aparecen como piezas tipográficas en movimiento y una ruta/localización conecta con la petición observada. Usa GET, HEAD, POST, PUT, PATCH, DELETE y OPTIONS solo si aparecen en el guion o en las tomas. Mantén visible la idea de observación técnica sin mostrar el cuerpo de un POST. No introduzcas credenciales ni escribas en formularios.

## 08 — Métricas del señuelo · 03:20–04:02

Anima las gráficas de la aplicación desde sus valores y categorías reales: barras que crecen, categorías que entran secuencialmente, una ruta que se recorre o eventos que se conectan en una línea temporal. Empieza con un plano de la vista completa y avanza a los detalles; luego cambia a una composición donde la gráfica gane protagonismo. Los rótulos de método/código deben ser grandes y legibles. No inventes cantidades para llenar el gráfico ni cubras sus ejes con subtítulos.

## 09 — Cuenta y conexión · 04:02–04:33

Muestra únicamente una vista segura de estado del servicio, dispositivo o conexión que esté en las capturas. Un movimiento de ida y vuelta puede vincular el teléfono con la API. La locución puede mencionar que hay acceso con correo o Google disponible; si aparece esa idea, usa un rótulo breve como “Acceso disponible” y vuelve al producto. No muestres pantallas de inicio de sesión, registro, formularios, correos, identificadores o datos de cuenta.

## 10 — Cierre · 04:33–04:50

Reduce el ruido visual y reúne el motivo de señal con el teléfono y la marca. Haz que el teléfono se aleje o salga con un movimiento limpio y que el pulso termine en el logo/tagline. Deja el cierre breve, con gran contraste, tipografía sólida y una última pausa para leer. No regreses al encabezado de producto ni añadas información nueva.

# 6. Transiciones: decididas, variadas y conectadas

No uses el mismo fade y wipe en rotación durante todas las escenas. En las diez secciones hay nueve cambios principales: crea al menos cinco familias visualmente distintas y reserva algunas entradas para cortes secos al movimiento.

Combina con intención, según la acción:

- match cut entre una onda, línea o círculo de la app y el motivo de señal;
- push/zoom rápido hacia la pantalla y salida desde otro detalle;
- whip-pan horizontal o vertical con motion blur breve;
- máscara animada, wipe geométrico o apertura/cierre de iris con `@remotion/shapes`;
- tarjeta/panel que cruza el cuadro y revela la siguiente vista;
- destello corto blanco o negro en un acento, no en cada cambio;
- corte seco cuando el golpe de voz o el cambio de función lo pida.

Cada transición debe sostener continuidad de dirección, forma o movimiento. No apiles glitch, blur, destello y partículas en el mismo corte. Los cambios son audaces, pero la interfaz debe seguir entendiéndose.

# 7. Uso obligatorio de las herramientas ya instaladas

No basta con que las dependencias estén en `package.json`. Deben cambiar el resultado que aparece en pantalla. Revisa la documentación oficial de cada API antes de importarla.

- Usa `@remotion/transitions` para las transiciones entre escenas y elige presentaciones variadas.
- Usa `@remotion/motion-blur` en los push, paneos o barridos más rápidos; no lo dejes activo durante una lectura.
- Usa `@remotion/effects` en acentos cortos que tengan motivo narrativo, no como filtro permanente.
- Usa `@remotion/shapes` para máscaras, trazos, llamadas o elementos de señal que se dibujan/mueven.
- Usa `@remotion/captions` en el flujo real de captions y resaltado temporal de palabras.
- Puedes usar `@remotion/lottie` si una animación vectorial concreta mejora el logo o un símbolo. Comprueba su procedencia y licencia.

Usa `useCurrentFrame()`, `useVideoConfig()`, `interpolate()` y `spring()` para la animación sincronizada. Si un paquete resulta realmente inadecuado para una toma, explica el motivo y utiliza otro componente de Remotion con efecto visible; no lo menciones como si se hubiera usado.

# 8. Locución, música, captions y efectos

## Locución ElevenLabs

Trabaja con los MP3 ya descargados; son la única locución de esta edición. Los originales están en `voice/eleven-labs/` y la copia preparada para `staticFile()` está en `public/audio/voice/eleven-labs/`.

Usa completos, en este orden:

1. `01-bienvenida.mp3` — 22.13 s
2. `02-lectura-wifi.mp3` — 33.07 s
3. `03-detalles-de-señales.mp3` — 34.43 s
4. `04-simulaciones.mp3` — 25.73 s
5. `05-actividad-historial.mp3` — 20.35 s
6. `06-envío-manejo-de-lecturas.mp3` — 19.23 s
7. `07-señuelo.mp3` — 32.21 s
8. `08-solicitudes-métricas.mp3` — 39.81 s
9. `09-cuenta-conexión.mp3` — 28.60 s
10. `10-cierre.mp3` — 16.20 s

No generes otra voz, no sustituyas estos MP3 y no aceleres su reproducción. La duración sumada es 4:31.76; respeta cada palabra y adapta las pausas y el montaje a los audios.

## Música

La pista elegida por el usuario es `voice/eleven-labs/pista-fondo.mp3`, copiada en `public/audio/voice/eleven-labs/pista-fondo.mp3`. Dura aproximadamente 2:56 y el video objetivo 4:50.

Escúchala antes de decidir cómo cubrir el video completo. Si la unión con el inicio es musicalmente limpia, crea un loop con crossfade y oculta la repetición mediante cambios de sección. Si no, distribuye la pista en bloques donde aporte y completa los espacios con `public/audio/ambiente-honeyphone.wav`, también con fundidos suaves. Mantén la música por debajo de la voz; automatiza su volumen durante el diálogo y deja silencios o menos música para algunos impactos y cambios de sección. No cortes la pista de golpe.

## Subtítulos

Los captions existentes pueden no corresponder a estos MP3. Ejecuta `scripts/transcribe-audio.sh` para cada voz dentro de `captions/eleven-labs/`, revisa nombres, términos técnicos y signos, y sincroniza la composición con esas transcripciones.

No uses una caja idéntica fija durante toda la película. Anima grupos cortos de 2–6 palabras, resalta una palabra activa y cambia la ubicación entre escenas para respetar el área que ocupa la app. Usa principalmente blanco; reserva el ámbar para una palabra puntual cuando añada énfasis. No pongas subtítulos sobre métricas importantes.

## Efectos

Usa los efectos que ya están en `public/audio/sfx/` y sincronízalos con una acción visual concreta:

- `mouse-click.wav` para taps visibles;
- `switch.wav` para un cambio real de estado o vista;
- `page-turn.wav` o `glass-slide.mp3` para tarjeta/panel que se desplaza;
- `whoosh.wav` y `whip.wav` para movimiento de cámara y transiciones rápidas.

No uses un sonido en cada corte. Mantén los efectos suaves, breves y por debajo de la narración. La mezcla debe sentirse táctil y precisa, no como una interfaz llena de clics.

# 9. Duración, archivos y restricciones de contenido

Sigue el reparto de `docs/plan-montaje.md`, con objetivo 4:50, 1920×1080 y 30 fps. Las transiciones que se solapen no deben cortar audios ni bajar la duración final; ajusta frames/aire visual al terminar.

Usa `public/media/raw/` y `public/media/edited/00-bienvenida-segura.mp4`. Solo el primer clip muestra la apertura de la app. No vuelvas a grabar la aplicación ni modifiques el proyecto Android.

No muestres ni rellenes formularios de login/registro. No muestres correos, tokens, contraseñas, credenciales, códigos de autorización, IDs privados ni datos personales. En las tomas de páginas señuelo, no escribas credenciales y no expongas texto introducido. Usa solo la parte visual necesaria para explicar la función.

Conserva los medios originales. No elimines ni alteres `/home/fullg/Projects/honeyphone/material/video-edicion/`. Renderiza las pruebas en `renders/previews/`; no sustituyas el MP4 existente hasta haber validado el render final.

# 10. Prueba de estilo, aceptación y entrega

Antes del render de 4:50, produce un preview de 20–30 segundos que contenga el cierre de bienvenida, su transición a Wi-Fi y un tramo de una escena de actividad. Obsérvalo en movimiento en Remotion Studio. Si aún parece una diapositiva o un mockup fijo, rediseña antes de renderizar el resto.

Rechaza y corrige el montaje si aparece cualquiera de estas condiciones:

- El teléfono se queda en el mismo lugar y tamaño durante una sección, o solo tiene un zoom que casi no se nota.
- La mayoría de escenas repite “texto a la izquierda + teléfono a la derecha”.
- Hay una cabecera fija, líneas divisorias, contadores, pie, barra de progreso o marcos ornamentales que ocupan el video sin explicar nada.
- Predomina el amarillo, aparecen títulos amarillos o se asigna cian/magenta a escenas completas.
- Los textos explicativos forman párrafos, se ven como diapositivas, o los subtítulos son pequeños y permanecen en una barra fija.
- Las partículas ocultan la app, se convierten en polvo uniforme o no cambian de movimiento.
- Las transiciones son fades/wipes repetidos, no acompañan el movimiento o se acumulan efectos.
- Los paquetes figuran instalados, pero no se ve en la composición el efecto de sus exports.
- La voz, los efectos y la música compiten; se corta una palabra; o una métrica inventada aparece en pantalla.

Antes de reemplazar `exports/honeyphone-demo-final.mp4`:

1. Renderiza una hoja de contacto con fotogramas repartidos por las diez escenas y verifica que cambian composición, tamaño/posición del teléfono y jerarquía del texto.
2. Reproduce el MP4 completo y revisa las transiciones, los subtítulos, la mezcla y los finales de cada segmento.
3. Comprueba duración cercana a 4:50, 1920×1080, 30 fps y audio íntegro.
4. Si algún criterio falla, corrige la composición y vuelve a revisar el render.

Guarda el resultado validado en `exports/honeyphone-demo-final.mp4`. Al terminar, informa la ruta, duración, resolución/fps, qué herramientas de animación usaste realmente en el código y qué comprobaste del archivo final.
```
