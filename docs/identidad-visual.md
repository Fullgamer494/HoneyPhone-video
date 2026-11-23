# Guía visual — HoneyPhone

La edición toma como referencia los recursos reales y la interfaz Android del proyecto. La composición debe sentirse como una pieza de producto limpia y en movimiento, no como una presentación con un teléfono fijo y texto explicativo.

## Paleta

| Uso | Color |
|---|---|
| Fondo | `#000000` |
| Superficie | `#0B0B0B` |
| Texto principal | `#F4F4F4` |
| Texto secundario | `#B8B8B8` |
| Acento funcional | `#F5B700` |
| Bordes existentes de UI | `#292929` |

Negro, blanco y grises dominan. El ámbar se reserva para un indicador activo o un dato importante, con presencia visual escasa; no se usa para títulos permanentes, divisores largos ni fondos. No se asigna un color cian/magenta diferente a cada escena.

## Tipografía y marca

- **Unbounded:** titulares grandes, cortos y con peso.
- **Plus Jakarta Sans:** subtítulos y texto de apoyo.
- **JetBrains Mono:** métricas y etiquetas técnicas cuando aportan contexto.
- **Doto:** detalles digitales puntuales.
- Usar `logo_sin_fondo.png` en momentos de marca para evitar el bloque negro del logo rasterizado.
- En una composición 1920×1080, usar titulares de 82–120 px, apoyo de 28–38 px y subtítulos de 36–52 px. Evitar microtexto decorativo y rótulos permanentes.

## Movimiento y composición

- Variar encuadres y composición dentro de cada sección: acercamiento, desplazamiento, cambio de escala, entrada/salida del teléfono, recorte de pantalla a sangre y alternancia entre producto y detalle de UI.
- Evitar mantener el mockup fijo a la derecha mientras aparecen titulares del lado izquierdo.
- No añadir encabezados permanentes, líneas que dividan el cuadro, pies de página ni progreso decorativo.
- Animar subtítulos por grupos breves de palabras y colocarlos donde no tapen la app.
- El fondo puede tener esporas y señales sutiles con movimiento lento y determinista; mantenerlas detrás de la interfaz.
- Reservar las transiciones bruscas para los cambios de idea, pantalla o ritmo. Mantener legibles las métricas.

## Referencias

Las referencias de marca y fotogramas de la app están en `references/brand/` y `references/screens/`.
