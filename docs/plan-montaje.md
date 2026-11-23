# Plan de montaje — HoneyPhone

Duración objetivo: **4:50 (290 s)**, a 1920×1080 y 30 fps. Remotion conserva la composición final. La base actual necesita movimiento, transiciones, subtítulos sincronizados y mezcla final.

Las diez locuciones ElevenLabs suman aproximadamente **4:31.76**. El plan reserva alrededor de **18.24 s** para respiraciones visuales, pausas y transiciones. Todas las tomas raw son lo bastante largas para las duraciones propuestas.

| Inicio | Duración | Voz | Clip de aplicación | Duración de voz | Aire visual aproximado |
|---:|---:|---|---|---:|---:|
| 00:00 | 00:24 | `01-bienvenida.mp3` | `00-bienvenida.mp4` o `00-bienvenida-segura.mp4` | 22.13 s | 1.87 s |
| 00:24 | 00:35 | `02-lectura-wifi.mp3` | `01-wifi-lectura.mp4` | 33.07 s | 1.93 s |
| 00:59 | 00:36 | `03-detalles-de-señales.mp3` | `02-senales-detalle.mp4` | 34.43 s | 1.57 s |
| 01:35 | 00:28 | `04-simulaciones.mp3` | `03-simulaciones.mp4` | 25.73 s | 2.27 s |
| 02:03 | 00:22 | `05-actividad-historial.mp3` | `04-actividad-api.mp4` | 20.35 s | 1.65 s |
| 02:25 | 00:21 | `06-envío-manejo-de-lecturas.mp3` | `05-envio-api.mp4` | 19.23 s | 1.77 s |
| 02:46 | 00:34 | `07-señuelo.mp3` | `06-honeypot-local.mp4` | 32.21 s | 1.79 s |
| 03:20 | 00:42 | `08-solicitudes-métricas.mp3` | `07-actividad-honeypot.mp4` | 39.81 s | 2.19 s |
| 04:02 | 00:31 | `09-cuenta-conexión.mp3` | `08-cuenta-api.mp4` | 28.60 s | 2.40 s |
| 04:33 | 00:17 | `10-cierre.mp3` | `09-cierre.mp4` | 16.20 s | 0.80 s |
| **Total** | **04:50** |  |  | **04:31.76** | **00:18.24** |

## Tratamiento visual

- La animación de apertura de la app aparece solo en la bienvenida. No repetirla en otras escenas.
- Alternar el teléfono completo con encuadres cercanos de la interfaz, detalles de métricas, rótulos y algunos planos de pantalla sin marco.
- Dar a cada sección dos o más cambios visuales intencionales, pero dejar pausas cuando un dato necesita leerse.
- Mantener un campo sutil de partículas/esporas y pulsos de señal en segundo plano. Usar semillas deterministas y capas con baja opacidad.
- Usar títulos Unbounded, cuerpo Plus Jakarta Sans y datos JetBrains Mono; respetar negro, blanco y ámbar.
- Combinar cortes directos y transiciones breves. No dejar una escena entera como un teléfono quieto con video raw.
- No cubrir controles, texto ni métricas de la app con partículas, llamadas o subtítulos.

## Audio y subtítulos

- Voz: archivos originales en `voice/eleven-labs/`, accesibles desde Remotion en `public/audio/voice/eleven-labs/`.
- Música: `pista-fondo.mp3` dura 176.27 s. Debe acompañar el video completo; loop solo si la unión se escucha natural. Si no, mezclar por secciones con `public/audio/ambiente-honeyphone.wav`.
- Efectos: `public/audio/sfx/`. Elegir cada efecto por una acción concreta y conservar la voz como foco.
- La voz supera la duración asignada en varias escenas del montaje antiguo; usa este reparto actualizado y no trunques los MP3.
- Regenera subtítulos con `scripts/transcribe-audio.sh` usando los archivos ElevenLabs. Los tiempos de `src/captions.ts` pertenecen al montaje anterior hasta que se revisen contra estas voces.

## Recursos

- Clips originales: `public/media/raw/`.
- Bienvenida editada: `public/media/edited/00-bienvenida-segura.mp4`.
- Marca y tipografías: `public/brand/` y `references/brand/`.
- Capturas de referencia: `references/screens/`.
