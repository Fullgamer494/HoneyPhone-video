# Voz de la edición — ElevenLabs

ElevenLabs es la locución elegida para el video demostrativo. Los MP3 entregados por el usuario son la fuente final de voz: no regenerarlos ni cambiar su texto. Se conservan en `voice/eleven-labs/` y se copiaron a `public/audio/voice/eleven-labs/` para que Remotion pueda referenciarlos con `staticFile()`.

| Escena | Archivo | Duración |
|---:|---|---:|
| 01 | `01-bienvenida.mp3` | 22.13 s |
| 02 | `02-lectura-wifi.mp3` | 33.07 s |
| 03 | `03-detalles-de-señales.mp3` | 34.43 s |
| 04 | `04-simulaciones.mp3` | 25.73 s |
| 05 | `05-actividad-historial.mp3` | 20.35 s |
| 06 | `06-envío-manejo-de-lecturas.mp3` | 19.23 s |
| 07 | `07-señuelo.mp3` | 32.21 s |
| 08 | `08-solicitudes-métricas.mp3` | 39.81 s |
| 09 | `09-cuenta-conexión.mp3` | 28.60 s |
| 10 | `10-cierre.mp3` | 16.20 s |
| **Total locución** |  | **271.76 s (4:31.76)** |

## Música

La pista elegida es `pista-fondo.mp3` (**176.27 s / 2:56.27**), ubicada en `voice/eleven-labs/` y copiada a `public/audio/voice/eleven-labs/`. El video previsto dura 290 s. Escucha el punto de repetición; si no forma un loop limpio, intercala la pista por bloques y prolonga el fondo con `public/audio/ambiente-honeyphone.wav`. Baja la música durante el habla y evita que los efectos compitan con la narración.

## Subtítulos

Los subtítulos existentes no deben tomarse como sincronizados con esta voz. Para generar referencias SRT/VTT por segmento:

```bash
mkdir -p captions/eleven-labs
for audio in public/audio/voice/eleven-labs/0*.mp3; do
  scripts/transcribe-audio.sh "$audio" captions/eleven-labs
done
```

Revisa manualmente nombres propios, términos técnicos y puntuación antes de animar palabra por palabra. Mantén los subtítulos dentro de márgenes seguros y fuera de las zonas de lectura de la app.

El guion aprobado está en [`guion-voz-ia.md`](guion-voz-ia.md). El reparto que protege la locución completa está en [`plan-montaje.md`](plan-montaje.md).
