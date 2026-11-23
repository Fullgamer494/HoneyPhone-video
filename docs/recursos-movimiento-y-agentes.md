# Recursos de movimiento, agentes y audio para HoneyPhone

## Dirección visual

Mantener Remotion como compositor y renderer final. El demo debe ser ágil, gráfico y fácil de seguir: movimiento de cámara controlado, acercamientos legibles, títulos con presencia, partículas ambientales, llamadas breves y cortes que sigan la narración.

- Base de identidad: negro, blanco y grises. Ámbar HoneyPhone solo en pocos indicadores activos; evitar títulos amarillos, reglas largas y acentos cian/magenta por sección.
- Usar Unbounded para títulos, Plus Jakarta Sans para cuerpo y JetBrains Mono para datos técnicos.
- Mover la atención entre el teléfono, recortes de pantalla, datos y rótulos. El patrón fijo título a la izquierda/teléfono a la derecha queda rechazado. Un zoom de 1–4 % no cuenta como movimiento suficiente.
- Partículas pequeñas en capas de profundidad, con baja opacidad, movimiento lento y semillas fijas por sección. La animación debe ser reproducible por frame.
- Eliminar encabezados fijos, líneas decorativas, pies de página y progreso persistente. Variar layout y posición del texto entre escenas. Usar titulares de 82–120 px y subtítulos de 36–52 px en 1920×1080. Mantener una acción gráfica dominante y dejar respirar las métricas.

## Skills disponibles

`.agents/skills/` incluye las skills de Remotion: `remotion-best-practices`, `remotion-markup`, `remotion-captions`, `remotion-render`, `remotion-studio`, `remotion-docs`, entre otras. La skill local `$honeyphone-motion-direction` define las reglas visuales de este proyecto.

Referencias oficiales: [Remotion Agent Skills](https://github.com/remotion-dev/skills) y [CLI de skills](https://www.remotion.dev/docs/cli/skills).

## Complementos instalados

Remotion está fijado en **4.0.545**. Las nuevas dependencias se instalaron con esa misma versión exacta:

| Paquete | Uso |
|---|---|
| `@remotion/transitions` | `TransitionSeries`, transiciones entre escenas y overlays de transición. |
| `@remotion/effects` | Efectos breves para barridos, grano, luz, textura y revelado. |
| `@remotion/motion-blur` | Desenfoque selectivo en movimientos rápidos. |
| `@remotion/captions` | Utilidades para subtítulos temporizados y palabras destacadas. |
| `@remotion/lottie` | Animaciones vectoriales Lottie dentro de Remotion. |
| `@remotion/shapes` | Flechas, círculos, marcos y acentos vectoriales animables. |
| `@remotion/sfx` | Referencias a efectos de sonido disponibles en Remotion. |

Estas herramientas están instaladas, listas para importarse desde la composición. Consulta las guías oficiales antes de usar una API concreta: [transiciones](https://www.remotion.dev/docs/transitions/transitionseries), [efectos](https://www.remotion.dev/docs/effects), [motion blur](https://www.remotion.dev/docs/motion-blur), [captions](https://www.remotion.dev/docs/captions), [Lottie](https://www.remotion.dev/docs/lottie/lottie), [shapes](https://www.remotion.dev/docs/shapes) y [SFX](https://www.remotion.dev/docs/sfx).

## Banco local de efectos de sonido

Los efectos listos para usar están en `public/audio/sfx/`:

| Archivo | Uso sugerido | Fuente y licencia |
|---|---|---|
| `mouse-click.wav` | Tap/clic sincronizado con una acción visible. | Remotion SFX; CC0, atribuido a Pixeliota. [Ficha](https://www.remotion.dev/docs/sfx/mouse-click) |
| `switch.wav` | Cambio de filtro, vista o estado. | Remotion SFX; CC0, Kenney. [Ficha](https://www.remotion.dev/docs/sfx/ui-switch) |
| `page-turn.wav` | Desplazamiento o entrada de tarjeta/panel. | Remotion SFX; CC0, Kenney. [Ficha](https://www.remotion.dev/docs/sfx/page-turn) |
| `whoosh.wav` | Barrido suave de transición. | Remotion SFX; CC0, atribuido a 1bob. [Ficha](https://www.remotion.dev/docs/sfx/whoosh) |
| `whip.wav` | Barrido más rápido, reservado para cambios fuertes. | Remotion SFX; CC0, atribuido a JW_Audio. [Ficha](https://www.remotion.dev/docs/sfx/whip) |
| `glass-slide.mp3` | Foley de un objeto deslizándose sobre una superficie. | “Glass plate slide”, Mixkit, Mixkit License. [Ficha y licencia](https://mixkit.co/free-sound-effects/slide/) |

Los efectos deben acompañar una interacción o un movimiento específico. No los repitas mecánicamente en cada corte. Manténlos discretos bajo la voz y distribúyelos a lo largo del montaje.

## Locución y música elegidas

Usa los diez MP3 de ElevenLabs y `pista-fondo.mp3` en `public/audio/voice/eleven-labs/`; los originales siguen en `voice/eleven-labs/`. Consulta [`voz-eleven-labs.md`](voz-eleven-labs.md) para las duraciones, la generación de subtítulos y la diferencia entre la duración de la música (2:56.27) y el video (4:50).

## Flujo para la próxima edición

1. Lee `docs/identidad-visual.md`, `docs/plan-montaje.md`, `docs/voz-eleven-labs.md` y esta guía.
2. Carga `$honeyphone-motion-direction` con `remotion-markup`, `remotion-captions`, `remotion-studio` y `remotion-render`.
3. Reemplaza la estructura de diapositivas por movimientos de cámara/producto, cambios de encuadre y transiciones visibles ligados a la narración. Usa de verdad los paquetes instalados en el código.
4. Regenera subtítulos a partir de ElevenLabs; verifica los términos técnicos.
5. Previsualiza en Remotion Studio y revisa el MP4 exportado en imagen y sonido.

## Recursos externos

- [Remotion transitions](https://www.remotion.dev/docs/transitions/transitionseries)
- [Remotion effects](https://www.remotion.dev/docs/effects)
- [Remotion motion blur](https://www.remotion.dev/docs/motion-blur)
- [Remotion captions](https://www.remotion.dev/docs/captions)
- [Remotion Lottie](https://www.remotion.dev/docs/lottie/lottie)
- [Remotion Three.js](https://www.remotion.dev/docs/three)
- [Kenney Interface Sounds — CC0](https://kenney.nl/assets/interface-sounds)
- [Mixkit free slide sound effects](https://mixkit.co/free-sound-effects/slide/)
