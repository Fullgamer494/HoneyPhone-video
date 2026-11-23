# Guion de voz en off — demo de HoneyPhone

**Duración de imagen objetivo:** 4:50.

**Locución:** español claro y natural, ritmo conversacional, voz serena y segura.

**Voz final:** ElevenLabs, en español. Los diez MP3 definitivos están en `voice/eleven-labs/`; para sus duraciones y subtítulos consulta la [guía de ElevenLabs](voz-eleven-labs.md).

**Tratamiento:** cálido y claro, con pausas breves al cambiar de sección; evitar tono de anuncio exagerado.

El guion está dividido en diez segmentos y ya cuenta con las tomas finales de ElevenLabs. No regeneres ni sustituyas esos audios durante la edición. La pantalla de acceso y los formularios se omiten; no se muestran ni narran datos personales.

## 01 — Bienvenida

Una red Wi-Fi puede parecer segura y estable, aunque sus señales cuenten otra historia. HoneyPhone ayuda a observar lo que ocurre alrededor: la conexión, las redes cercanas y la actividad que llega a un señuelo local. En este recorrido veremos cómo reúne esas señales en una sola herramienta, desde el teléfono y con resultados fáciles de interpretar.

## 02 — Lectura Wi-Fi

La vista principal reúne los datos esenciales de la conexión actual. Aquí podemos revisar el nombre de la red, la banda, el canal, la frecuencia y la intensidad expresada en dBm. También aparecen indicadores de recepción y transmisión, junto con el estado de acceso a Internet. Una señal fuerte describe la conexión inalámbrica; por sí sola, no garantiza que Internet esté disponible. Por eso HoneyPhone separa las mediciones de radio de las comprobaciones de conectividad.

## 03 — Detalle de señales

Al abrir una señal encontramos una evaluación más completa. La aplicación combina la información visible de la red con comprobaciones controladas de acceso, DNS y HTTPS. Cada resultado aporta una pieza distinta: cómo se presenta la red, si se resuelven nombres y si una conexión cifrada puede establecerse. Estas verificaciones ayudan a contextualizar el estado observado, sin convertir una medición aislada en un diagnóstico absoluto.

## 04 — Simulaciones

Las simulaciones permiten explorar la interfaz con escenarios de ejemplo. Podemos comparar un resultado normal, una discrepancia y una lectura incompleta, sin depender de que esas condiciones existan en la red real. HoneyPhone las guarda identificadas como ejemplos. Así sirven para practicar la lectura de resultados y entender los avisos antes de revisar una conexión de verdad.

## 05 — Actividad e historial

En Actividad se consulta el historial de revisiones y su estado de sincronización. Los filtros ayudan a encontrar registros por fecha y la vista reúne la información local con la disponible en el servidor.

## 06 — Envío a la API

Una revisión nueva se conserva primero en el teléfono; desde aquí decidimos si la enviamos a la API. Al confirmar, el registro queda marcado como enviado. Así controlamos qué lecturas de red compartimos.

## 07 — Señuelo local

HoneyPhone también puede levantar un señuelo HTTP dentro del dispositivo. Sus páginas parecen servicios conocidos y están diseñadas para observar solicitudes de prueba, no para recopilar contraseñas. En este recorrido se consultan rutas usando métodos como GET, HEAD, POST, PUT, PATCH, DELETE y OPTIONS. El servidor responde según la ruta y registra datos técnicos de cada petición, como método, recurso, código y hora. El cuerpo de las solicitudes POST se deja sin leer.

## 08 — Métricas del señuelo

La pestaña de actividad del señuelo resume las solicitudes y las sesiones observadas. Las gráficas permiten comparar métodos HTTP, clases de respuesta y evolución de eventos. En este ejemplo aparecen peticiones GET y POST, junto con otros métodos y respuestas de distintas familias. La sesión puede permanecer guardada localmente y sincronizar sus eventos con la API cuando hay conexión. El historial ayuda a revisar qué ocurrió sin confundirlo con una lectura Wi-Fi.

## 09 — Cuenta y conexión

En la vista de cuenta se puede comprobar si la API está disponible, qué dispositivo está conectado y si hay otras instalaciones registradas. Las tareas periódicas mantienen actualizados los datos pendientes cuando vuelve la conectividad. Las señales Wi-Fi se envían desde Actividad cuando el usuario lo decide; los eventos del señuelo usan sincronización automática con reintento. Cada flujo conserva su propio estado para que resulte claro qué llegó al servidor.

## 10 — Cierre

HoneyPhone reúne observación Wi-Fi, comprobaciones controladas y un señuelo local con métricas revisables. El resultado es una forma práctica de explorar lo que pasa en una red, desde el teléfono y con control sobre los datos que se comparten. HoneyPhone: observa la señal. Entiende lo que ocurre.

## Notas de edición

- El clip `00-bienvenida.mp4` es el único que debe comenzar desde la apertura de la app.
- Usa `voice/eleven-labs/pista-fondo.mp3` como música principal, por debajo de la voz. Reduce su nivel durante la narración; consulta la guía de voz si necesitas extenderla hasta cubrir 4:50.
- Conserva cada MP3 completo y deja el aire visual indicado en `plan-montaje.md`; no recortes palabras para cuadrar la duración.
- El montaje apunta a 4:50. No aceleres la voz. Ajusta el aire visual, el montaje y las transiciones al ritmo de las tomas existentes.
- Mantén fuera de cuadro correos, tokens y cualquier dato personal. No incorpores pantallas de login o registro.
