# HoneyPhone — video demo

Proyecto Remotion para montar el video de demostración de HoneyPhone. Incluye las capturas originales, una toma inicial segura, los recursos de marca, la narración ElevenLabs, la música y los subtítulos sincronizados.

## Contenido

- `src/HoneyPhoneDemo.tsx`: composición final y preview de estilo.
- `src/captions.ts` y `captions/eleven-labs/`: captions de la narración elegida.
- `public/media/raw/`: capturas originales de la aplicación.
- `public/media/edited/00-bienvenida-segura.mp4`: apertura sin formularios de acceso.
- `voice/eleven-labs/`: originales de audio ElevenLabs.
- `public/audio/voice/eleven-labs/`: copias usadas por Remotion.
- `public/audio/sfx/`, `public/audio/ambiente-honeyphone.wav`: efectos y cama ambiental.
- `public/brand/` y `references/`: logotipo, tipografías y referencias visuales.
- `docs/`: guion, plan de montaje e identidad visual.

## Requisitos

- Node.js 20.19 o posterior.
- FFmpeg y ffprobe para transcribir o inspeccionar medios.

Instala las dependencias y abre Remotion Studio:

```bash
npm install
npm run dev
```

Las composiciones son `HoneyPhoneDemo` (290 segundos, 1920×1080, 30 fps) y `HoneyPhonePreview` (27.27 segundos). Para renderizar la principal:

```bash
npx remotion render HoneyPhoneDemo exports/honeyphone-demo-final.mp4
```

Los previews y renders finales se guardan localmente en `renders/` y `exports/`; Git los ignora para evitar subir archivos de video grandes.

## Captions

Los SRT/VTT de `captions/eleven-labs/` corresponden a los audios de `voice/eleven-labs/`. Para regenerarlos se necesita instalar Whisper.cpp y el modelo multilingüe base localmente; el checkout de Whisper.cpp y sus binarios no se incluyen en este repositorio. El montaje puede renderizarse con los captions ya incluidos.

## Documentación

- [Guion](docs/guion-voz-ia.md)
- [Plan de montaje](docs/plan-montaje.md)
- [Identidad visual](docs/identidad-visual.md)
- [Recursos de movimiento](docs/recursos-movimiento-y-agentes.md)
- [Voz ElevenLabs](docs/voz-eleven-labs.md)
