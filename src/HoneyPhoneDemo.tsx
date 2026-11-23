import type { Caption, TikTokPage } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { glow } from "@remotion/effects/glow";
import { Audio, Video } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import { Circle } from "@remotion/shapes";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { cube } from "@remotion/transitions/cube";
import { fade } from "@remotion/transitions/fade";
import { flip } from "@remotion/transitions/flip";
import { iris } from "@remotion/transitions/iris";
import { pushCut } from "@remotion/transitions/push-cut";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Arrow } from "@remotion/shapes";
import { sceneCaptions } from "./captions";

loadFont({ family: "Plus Jakarta Sans", url: staticFile("brand/fonts/plus_jakarta_sans_variable.ttf"), weight: "400" });
loadFont({ family: "Plus Jakarta Sans", url: staticFile("brand/fonts/plus_jakarta_sans_variable.ttf"), weight: "500" });
loadFont({ family: "Plus Jakarta Sans", url: staticFile("brand/fonts/plus_jakarta_sans_variable.ttf"), weight: "700" });
loadFont({ family: "Unbounded", url: staticFile("brand/fonts/unbounded_variable.ttf"), weight: "700" });
loadFont({ family: "JetBrains Mono", url: staticFile("brand/fonts/jetbrains_mono_variable.ttf"), weight: "400" });

type DeviceMode = "phone" | "screen" | "close";
type Anchor = "left" | "right" | "top" | "bottom";
type Layout = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly rotation: number;
  readonly zoom: number;
  readonly mode: DeviceMode;
  readonly focus: string;
  readonly heroSide: Anchor | "none";
  readonly captionSide: Anchor;
};
type Beat = { readonly frame: number; readonly layout: Layout; readonly cueIndex: number };

type KineticSceneProps = {
  readonly sceneIndex: number;
  readonly source: string;
  readonly voiceSource: string;
  readonly durationInFrames: number;
  readonly visualTrimBeforeSeconds?: number;
  readonly voiceTrimBeforeSeconds?: number;
  readonly voiceDelayInFrames?: number;
  readonly voiceDurationInFrames?: number;
  readonly captionOffsetSeconds?: number;
};

const SCENE_STARTS = [0, 712 / 30, 1756 / 30, 2828 / 30, 3662 / 30, 4322 / 30, 4944 / 30, 5954 / 30, 7206 / 30, 8130 / 30] as const;
const VOICE_LENGTHS = [22.1257, 33.071, 34.4294, 25.7306, 20.3494, 19.2261, 32.2089, 39.8106, 28.6041, 16.1959] as const;
const CAPTIONS = sceneCaptions as readonly (readonly Caption[])[];
const KEYWORDS: readonly (readonly string[])[] = [
  ["RED WI-FI", "PREGUNTAS", "HONEY PHONE", "SEÑUELO WEB", "DESDE EL TELÉFONO", "RESULTADOS"],
  ["RED WI-FI", "ETIQUETA", "LECTURA", "ESTÁNDAR", "RECEPCIÓN · ENVÍO", "INTERNET", "dBm", "MÁS CERCA DE CERO", "VELOCIDAD DEL ENLACE"],
  ["EL INFORME", "PROTECCIÓN WI-FI", "PORTAL DE ACCESO", "DNS", "HTTPS", "SIN DATOS", "NO ES UNA PUNTUACIÓN", "CONTEXTO"],
  ["EJEMPLOS", "SIN DIFERENCIAS", "SEÑALES", "INFORMACIÓN INCOMPLETA", "SIMULACIÓN", "INFORMES"],
  ["ACTIVIDAD", "LECTURAS WI-FI", "SESIONES DEL SEÑUELO", "FECHA", "SINCRONIZACIÓN"],
  ["EN EL TELÉFONO", "API", "COMPARTIR", "PENDIENTES", "SERVIDOR"],
  ["SEÑUELO LOCAL", "PORTAL", "CONSOLA", "RUTA LOCAL", "SOLICITUDES", "SIN CREDENCIALES", "HTTP"],
  ["GET · HEAD", "POST", "PUT · PATCH", "DELETE · OPTIONS", "HTTP", "SESIONES", "MÉTRICAS", "API"],
  ["CUENTA", "API", "DISPOSITIVOS", "ESCANEOS AUTOMÁTICOS", "WI-FI · INTERNET"],
  ["WI-FI", "EJEMPLOS", "HISTORIAL", "SEÑUELO LOCAL", "OBSERVA", "ENTIENDE"],
];

const LAYOUTS: Record<string, Layout> = {
  phoneLeft: { x: 170, y: 55, width: 520, height: 980, rotation: -2.2, zoom: 1.02, mode: "phone", focus: "50% 50%", heroSide: "right", captionSide: "right" },
  phoneRight: { x: 1230, y: 70, width: 520, height: 960, rotation: 2.1, zoom: 1.02, mode: "phone", focus: "50% 50%", heroSide: "left", captionSide: "left" },
  phoneCenter: { x: 700, y: 40, width: 540, height: 1000, rotation: -0.6, zoom: 1.03, mode: "phone", focus: "50% 50%", heroSide: "left", captionSide: "right" },
  phoneMiniLeft: { x: 80, y: 240, width: 360, height: 690, rotation: -3.2, zoom: 1.01, mode: "phone", focus: "50% 50%", heroSide: "right", captionSide: "right" },
  phoneMiniRight: { x: 1480, y: 235, width: 360, height: 690, rotation: 3, zoom: 1.01, mode: "phone", focus: "50% 50%", heroSide: "left", captionSide: "left" },
  screenLeft: { x: -40, y: -80, width: 660, height: 1240, rotation: -1, zoom: 1.04, mode: "screen", focus: "50% 50%", heroSide: "right", captionSide: "right" },
  screenRight: { x: 1300, y: -80, width: 660, height: 1240, rotation: 1.2, zoom: 1.04, mode: "screen", focus: "50% 50%", heroSide: "left", captionSide: "left" },
  screenCenter: { x: 625, y: -90, width: 690, height: 1260, rotation: 0, zoom: 1.08, mode: "screen", focus: "50% 50%", heroSide: "none", captionSide: "bottom" },
  closeLeft: { x: -50, y: -155, width: 790, height: 1390, rotation: -0.8, zoom: 1.08, mode: "close", focus: "50% 25%", heroSide: "right", captionSide: "right" },
  closeCenter: { x: 530, y: -160, width: 860, height: 1400, rotation: 0, zoom: 1.06, mode: "close", focus: "50% 32%", heroSide: "none", captionSide: "bottom" },
  closeRight: { x: 1190, y: -155, width: 790, height: 1390, rotation: 1, zoom: 1.08, mode: "close", focus: "50% 25%", heroSide: "left", captionSide: "left" },
};

const LAYOUT_PATTERNS: readonly (readonly string[])[] = [
  ["phoneMiniRight", "phoneLeft", "screenCenter", "phoneRight", "closeCenter", "screenLeft", "phoneMiniLeft", "phoneRight"],
  ["phoneCenter", "screenLeft", "closeCenter", "phoneRight", "screenRight", "phoneLeft", "closeRight", "phoneMiniRight"],
  ["screenRight", "phoneLeft", "closeCenter", "screenLeft", "phoneCenter", "closeRight", "phoneRight", "screenCenter"],
  ["screenLeft", "phoneRight", "screenCenter", "phoneLeft", "closeRight", "screenRight", "phoneMiniLeft"],
  ["phoneLeft", "screenRight", "phoneCenter", "closeLeft", "phoneRight", "screenLeft", "phoneMiniRight"],
  ["phoneCenter", "screenLeft", "phoneRight", "screenCenter", "closeLeft", "phoneMiniRight", "phoneLeft"],
  ["phoneLeft", "screenRight", "closeCenter", "phoneCenter", "screenLeft", "phoneMiniRight", "phoneRight"],
  ["phoneRight", "screenCenter", "closeLeft", "screenRight", "phoneLeft", "closeCenter", "screenLeft", "phoneMiniRight"],
  ["phoneCenter", "screenLeft", "phoneRight", "closeCenter", "phoneCenter", "screenRight", "phoneMiniLeft"],
  ["phoneCenter", "screenLeft", "phoneRight", "closeCenter", "phoneMiniRight", "screenCenter", "phoneMiniLeft"],
];

const buildBeats = (sceneIndex: number, durationInFrames: number, fps: number, offsetMs: number): Beat[] => {
  const durationMs = (durationInFrames / fps) * 1000;
  const cueStarts = CAPTIONS[sceneIndex].map((caption) => Math.max(0, caption.startMs - offsetMs)).filter((ms) => ms >= 0 && ms <= durationMs);
  const points = [0, ...cueStarts, Math.max(0, durationMs - 2100)];
  const sorted = [...new Set(points)].sort((a, b) => a - b);
  const times: number[] = [0];
  for (const point of sorted.slice(1)) {
    let last = times[times.length - 1];
    while (point - last > 2780) {
      last += 2420;
      times.push(last);
    }
    if (point - times[times.length - 1] > 1450) times.push(point);
  }
  const patterns = LAYOUT_PATTERNS[sceneIndex];
  return times.map((timeMs, index) => {
    const cueIndex = CAPTIONS[sceneIndex].findIndex((caption) => {
      const start = caption.startMs - offsetMs;
      const end = caption.endMs - offsetMs;
      return timeMs >= start && timeMs < end;
    });
    const layoutName = patterns[index % patterns.length];
    return {
      frame: Math.round((timeMs / 1000) * fps),
      layout: LAYOUTS[layoutName],
      cueIndex,
    };
  });
};

const wordCaptionPages = (captions: readonly Caption[]) => {
  const words: Caption[] = [];
  captions.forEach((caption) => {
    const parts = caption.text.trim().split(/\s+/);
    const weights = parts.map((part) => Math.max(2, part.replace(/[^\p{L}\p{N}]/gu, "").length));
    const totalWeight = weights.reduce((sum, value) => sum + value, 0);
    let cursor = caption.startMs;
    parts.forEach((part, index) => {
      const wordStart = cursor;
      const share = (caption.endMs - caption.startMs) * (weights[index] / totalWeight);
      const wordEnd = index === parts.length - 1 ? caption.endMs : Math.round(wordStart + share);
      words.push({
        text: `${words.length === 0 ? "" : " "}${part}`,
        startMs: wordStart,
        endMs: wordEnd,
        timestampMs: Math.round((wordStart + wordEnd) / 2),
        confidence: null,
      });
      cursor = wordEnd;
    });
  });
  return createTikTokStyleCaptions({ captions: words, combineTokensWithinMilliseconds: 1550, breakOnSilenceAfterMilliseconds: 300 }).pages;
};

const CAPTION_PAGES = CAPTIONS.map((captions) => wordCaptionPages(captions));

const CaptionMotion: React.FC<{
  readonly sceneIndex: number;
  readonly frameTimeMs: number;
  readonly pages: readonly TikTokPage[];
  readonly side: Anchor;
}> = ({ sceneIndex, frameTimeMs, pages, side }) => {
  const page = pages.find((item) => frameTimeMs >= item.startMs && frameTimeMs < item.startMs + item.durationMs);
  if (!page) return null;
  const left = side === "right" ? 1000 : side === "left" ? 105 : 70;
  const width = side === "bottom" ? 450 : 820;
  const right = side === "right" ? 95 : undefined;
  const top = side === "top" ? 120 : side === "bottom" ? 320 : undefined;
  const bottom = side === "top" || side === "bottom" ? undefined : 92;
  const activeToken = page.tokens.findIndex((token) => frameTimeMs >= token.fromMs && frameTimeMs < token.toMs);
  const fontSize = sceneIndex === 6 || sceneIndex === 7 ? 40 : 44;

  return (
    <div
      style={{
        position: "absolute",
        left: right ? undefined : left,
        right,
        top,
        bottom,
        width,
        zIndex: 20,
        color: "#F4F4F4",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize,
        lineHeight: 1.12,
        fontWeight: 700,
        letterSpacing: -0.7,
        textShadow: "0 3px 18px rgba(0,0,0,0.92), 0 1px 5px rgba(0,0,0,0.95)",
      }}
    >
      {page.tokens.map((token, index) => {
        const isActive = index === activeToken;
        return (
          <span
            key={`${token.fromMs}-${index}`}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              color: isActive ? "#F5B700" : "#F4F4F4",
              scale: isActive ? 1.08 : 1,
              transformOrigin: "center bottom",
              textShadow: isActive ? "0 0 16px rgba(245,183,0,0.38), 0 3px 18px rgba(0,0,0,0.95)" : undefined,
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};

const SignalParticles: React.FC<{ readonly seed: number }> = ({ seed }) => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 13 }, (_, i) => {
    const x = (seed * 97 + i * 197 + i * i * 13) % 1920;
    const baseY = (seed * 139 + i * 173 + i * i * 11) % 1080;
    const drift = Math.sin(frame * (0.012 + (i % 4) * 0.002) + i * 1.37) * (8 + (i % 3) * 7);
    const size = i % 5 === 0 ? 8 : i % 3 === 0 ? 4 : 2;
    const active = i === seed % 13;
    const opacity = 0.045 + ((Math.sin(frame * 0.03 + i) + 1) * 0.035);
    return (
      <span
        key={`${seed}-${i}`}
        style={{
          position: "absolute",
          left: x,
          top: baseY,
          width: size,
          height: size,
          borderRadius: "50%",
          background: active ? "#F5B700" : "#D8D8D8",
          opacity: active ? opacity * 1.7 : opacity,
          translate: `0px ${drift}px`,
          filter: size > 5 ? "blur(2px)" : undefined,
          boxShadow: active ? "0 0 22px rgba(245,183,0,0.5)" : undefined,
        }}
      />
    );
  });
  return <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>{particles}</AbsoluteFill>;
};

const SignalSeal: React.FC<{ readonly frame: number; readonly closing?: boolean }> = ({ frame, closing }) => {
  const opacity = interpolate(frame, closing ? [0, 24, 70, 100] : [0, 12, 48, 78], closing ? [0, 0.95, 0.95, 0] : [0, 0.95, 0.95, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 90], closing ? [0.7, 1.05] : [0.72, 1.36], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: closing ? 1130 : 160, top: closing ? 180 : 220, width: 320, height: 320, opacity, scale, pointerEvents: "none", zIndex: 8 }}>
      <Circle
        name="Pulso de señal"
        radius={147}
        fill="none"
        stroke="#F5B700"
        strokeWidth={1.5}
        strokeDasharray="460 410"
        strokeDashoffset={interpolate(frame, [0, 90], [0, -460], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        effects={[glow({ color: "#F5B700", intensity: 0.22, radius: 22, threshold: 0.02 })]}
        style={{ position: "absolute", inset: 12, width: 294, height: 294, opacity: 0.8 }}
      />
      <Circle radius={216} fill="none" stroke="rgba(244,244,244,0.24)" strokeWidth={1} strokeDasharray="3 18" style={{ position: "absolute", left: -54, top: -54, width: 432, height: 432, opacity: 0.5 }} />
      {!closing ? <Img src={staticFile("brand/logo_sin_fondo.png")} effects={[glow({ color: "#F5B700", intensity: 0.3, radius: 34, threshold: 0.02 })]} style={{ position: "absolute", width: 205, height: 205, objectFit: "contain", left: 55, top: 55 }} /> : null}
    </div>
  );
};

const HeroBeat: React.FC<{ readonly text: string; readonly side: Anchor | "none"; readonly frame: number; readonly nextFrame: number }> = ({ text, side, frame, nextFrame }) => {
  const { fps } = useVideoConfig();
  if (!text || side === "none") return null;
  const inFrame = Math.max(0, frame);
  const progress = spring({ frame: inFrame, fps, config: { damping: 19, stiffness: 150, mass: 0.62 } });
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pieces = text.split(" ");
  const fontSize = text.length > 7 ? 82 : 108;
  const width = side === "left" || side === "right" ? 570 : 1260;
  const left = side === "right" ? 1280 : side === "left" ? 70 : 330;
  const top = text.charCodeAt(0) % 2 === 0 ? 170 : 470;
  const fadeOut = interpolate(frame, [Math.max(0, nextFrame - 9), nextFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left, top, width, zIndex: 11, opacity: opacity * fadeOut, translate: `0px ${interpolate(progress, [0, 1], [36, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px` }}>
      <div style={{ fontFamily: "Unbounded, sans-serif", fontSize, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3.6, color: "#F4F4F4", textShadow: "0 4px 24px rgba(0,0,0,0.85)" }}>
        {pieces.map((piece, index) => (
          <span key={`${piece}-${index}`} style={{ marginRight: "0.22em" }}>{piece}</span>
        ))}
      </div>
    </div>
  );
};

const KineticScene: React.FC<KineticSceneProps> = ({
  sceneIndex,
  source,
  voiceSource,
  durationInFrames,
  visualTrimBeforeSeconds = 0,
  voiceTrimBeforeSeconds = 0,
  voiceDelayInFrames = 0,
  voiceDurationInFrames,
  captionOffsetSeconds = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beats = buildBeats(sceneIndex, durationInFrames, fps, captionOffsetSeconds * 1000);
  const beatIndex = beats.reduce((last, item, index) => (frame >= item.frame ? index : last), 0);
  const beat = beats[beatIndex];
  const previous = beats[Math.max(0, beatIndex - 1)];
  const motion = spring({ frame: frame - beat.frame, fps, config: { damping: 24, stiffness: 104, mass: 0.85 } });
  const lerp = (from: number, to: number) => interpolate(motion, [0, 1], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const x = lerp(previous.layout.x, beat.layout.x);
  const y = lerp(previous.layout.y, beat.layout.y);
  const width = lerp(previous.layout.width, beat.layout.width);
  const height = lerp(previous.layout.height, beat.layout.height);
  const rotation = lerp(previous.layout.rotation, beat.layout.rotation);
  const zoom = lerp(previous.layout.zoom, beat.layout.zoom);
  const deviceFrameOpacity = interpolate(motion, [0, 1], [previous.layout.mode === "phone" ? 1 : 0, beat.layout.mode === "phone" ? 1 : 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const inset = interpolate(deviceFrameOpacity, [0, 1], [0, 12]);
  const radius = interpolate(deviceFrameOpacity, [0, 1], [8, 48]);
  const sourceMs = frame / fps * 1000 + captionOffsetSeconds * 1000;
  const cueIndex = CAPTIONS[sceneIndex].findIndex((caption) => sourceMs >= caption.startMs && sourceMs < caption.endMs);
  const hero = cueIndex >= 0 ? KEYWORDS[sceneIndex][cueIndex] ?? "" : "";
  const captionSide = beat.layout.captionSide;
  const mode = beat.layout.mode;
  const mediaPath = source === "00-bienvenida-segura.mp4" ? `media/edited/${source}` : `media/raw/${source}`;
  const localSeconds = frame / fps + captionOffsetSeconds;
  const logoFrame = Math.round(frame + (sceneIndex === 0 ? 0 : (durationInFrames - 100)));
  const showIntroLogo = sceneIndex === 0 && frame < fps * 2.8;
  const showEndMark = sceneIndex === 9 && frame > durationInFrames - fps * 4;
  const activePages = CAPTION_PAGES[sceneIndex].filter((page) => page.tokens.length > 0);
  const nextBeatFrame = beatIndex + 1 < beats.length ? beats[beatIndex + 1].frame - beat.frame : durationInFrames - beat.frame;
  const heroTransitionFrame = frame - beat.frame;
  const focusDbdm = sceneIndex === 1 && cueIndex >= 6 && cueIndex <= 7;
  const apiRoute = sceneIndex === 5 && (cueIndex === 1 || cueIndex === 2);
  const simulationSfx = sceneIndex === 3;
  const apiSfx = sceneIndex === 5;
  const routeProgress = interpolate(frame - Math.max(0, beat.frame), [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const imageEnter = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const timeMs = Math.max(0, localSeconds * 1000);

  return (
    <AbsoluteFill style={{ background: "#000000", overflow: "hidden", color: "#F4F4F4" }}>
      <SignalParticles seed={sceneIndex + 4} />

      {showIntroLogo ? <SignalSeal frame={frame} /> : null}
      {showEndMark ? <SignalSeal frame={logoFrame} closing /> : null}

      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width,
          height,
          zIndex: 9,
          opacity: imageEnter,
          rotate: `${rotation}deg`,
          transformOrigin: "50% 50%",
          scale: interpolate(imageEnter, [0, 1], [0.9, 1]),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: inset,
            boxSizing: "border-box",
            overflow: "hidden",
            borderRadius: radius,
            background: mode === "phone" ? "linear-gradient(135deg, #5C5C5C, #111111 26%, #2B2B2B 77%, #090909)" : "transparent",
            border: deviceFrameOpacity > 0.02 ? "1px solid rgba(255,255,255,0.32)" : "none",
            boxShadow: deviceFrameOpacity > 0.02 ? "0 22px 90px rgba(0,0,0,0.72)" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: inset,
              overflow: "hidden",
              borderRadius: Math.max(0, radius - 9),
              backgroundColor: "#030303",
            }}
          >
            <Video
              name={`Captura real · escena ${String(sceneIndex + 1).padStart(2, "0")}`}
              src={staticFile(mediaPath)}
              trimBefore={Math.round(visualTrimBeforeSeconds * fps)}
              muted
              objectFit={mode === "close" ? "cover" : "contain"}
              style={{ width: "100%", height: "100%", scale: zoom, transformOrigin: beat.layout.focus }}
            />
            {focusDbdm ? (
              <Circle
                name="Resalte dBm"
                radius={48}
                fill="none"
                stroke="#F5B700"
                strokeWidth={3}
                strokeDasharray="246 56"
                strokeDashoffset={interpolate(frame, [beat.frame, beat.frame + 22], [130, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                effects={[glow({ color: "#F5B700", intensity: 0.42, radius: 18, threshold: 0.02 })]}
                style={{ position: "absolute", left: "68%", top: "24%", translate: "-50% -50%", width: 96, height: 96, opacity: 0.85 }}
              />
            ) : null}
          </div>
        </div>
      </div>

      {sceneIndex === 0 && frame < fps * 6 ? (
        <div style={{ position: "absolute", left: 300, top: 250, width: 600, height: 600, pointerEvents: "none", opacity: interpolate(frame, [fps * 2, fps * 6], [0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <Circle radius={214} fill="none" stroke="rgba(245,183,0,0.72)" strokeWidth={2} strokeDasharray="520 825" strokeDashoffset={interpolate(frame, [0, fps * 6], [20, -780], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} style={{ position: "absolute", left: 82, top: 82, width: 428, height: 428 }} />
          <Circle radius={270} fill="none" stroke="rgba(244,244,244,0.24)" strokeWidth={1} strokeDasharray="2 20" style={{ position: "absolute", left: 26, top: 26, width: 540, height: 540 }} />
        </div>
      ) : null}

      {hero ? <HeroBeat key={`${sceneIndex}-${cueIndex}`} text={hero} side={beat.layout.heroSide} frame={heroTransitionFrame} nextFrame={nextBeatFrame} /> : null}

      {apiRoute ? (
        <div style={{ position: "absolute", left: 505, top: 548, width: 910, height: 92, zIndex: 12, opacity: 0.82, overflow: "hidden" }}>
          <Arrow name="Trayecto hacia API" length={850} headLength={55} headWidth={70} shaftWidth={3} direction="right" fill="#F5B700" style={{ position: "absolute", inset: 0, width: 910, height: 90, transform: `scaleX(${routeProgress})`, transformOrigin: "left center" }} />
          <Circle name="Destino API" radius={32} fill="#000000" stroke="#F5B700" strokeWidth={2} style={{ position: "absolute", right: 10, top: 13, width: 64, height: 64 }} />
          <div style={{ position: "absolute", right: 19, top: 28, color: "#F4F4F4", fontFamily: "JetBrains Mono, monospace", fontSize: 17, fontWeight: 700 }}>API</div>
        </div>
      ) : null}

      <CaptionMotion sceneIndex={sceneIndex} frameTimeMs={timeMs} pages={activePages} side={captionSide} />

      {sceneIndex === 0 ? (
        <Audio name="Entrada de señal" src={staticFile("audio/sfx/whoosh.wav")} from={Math.round(1.05 * fps)} volume={0.16} />
      ) : null}
      {simulationSfx ? <Audio name="Cambio de ejemplo" src={staticFile("audio/sfx/switch.wav")} from={Math.round(4.2 * fps)} volume={0.13} /> : null}
      {apiSfx ? <Audio name="Ruta de envío" src={staticFile("audio/sfx/whoosh.wav")} from={Math.round(4 * fps)} volume={0.13} /> : null}

      <Audio
        name={`Locución ElevenLabs · ${String(sceneIndex + 1).padStart(2, "0")}`}
        src={staticFile(`audio/voice/eleven-labs/${voiceSource}`)}
        trimBefore={Math.round(voiceTrimBeforeSeconds * fps)}
        from={voiceDelayInFrames}
        durationInFrames={voiceDurationInFrames}
        volume={0.99}
      />
    </AbsoluteFill>
  );
};

const voiceWindows = SCENE_STARTS.map((start, index) => [start, start + VOICE_LENGTHS[index]] as const);

const MusicAndBed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const duck = voiceWindows.reduce((value, [start, end]) => {
    const ramp = interpolate(time, [start - 0.25, start + 0.22, end - 0.22, end + 0.35], [1, 0.42, 0.42, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return Math.min(value, ramp);
  }, 1);
  const firstTrack = interpolate(frame, [0, fps * 1.5, fps * 170, fps * 176.27], [0, 0.115, 0.115, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * duck;
  const repeatTrack = interpolate(frame, [fps * 172, fps * 176, fps * 290], [0, 0.115, 0.115], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) * duck;
  return (
    <>
      <Audio name="Pista de fondo · bloque inicial" src={staticFile("audio/voice/eleven-labs/pista-fondo.mp3")} volume={firstTrack} />
      <Audio name="Pista de fondo · crossfade" src={staticFile("audio/voice/eleven-labs/pista-fondo.mp3")} from={172 * fps} volume={repeatTrack} />
      <Audio name="Cama ambiente" src={staticFile("audio/ambiente-honeyphone.wav")} volume={0.055} />
    </>
  );
};

const MainScene = (props: Omit<KineticSceneProps, "durationInFrames"> & { readonly sceneIndex: number; readonly durationInFrames: number }) => <KineticScene {...props} />;

export const HoneyPhoneDemo: React.FC = () => {
  const { fps, width, height } = useVideoConfig();
  const transitionMotion = { shutterAngle: 150, samples: 5 };
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="01 · Bienvenida" durationInFrames={24 * fps}>
          <MainScene sceneIndex={0} source="00-bienvenida-segura.mp4" voiceSource="01-bienvenida.mp3" durationInFrames={24 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={iris({ width, height })} timing={linearTiming({ durationInFrames: 8 })} motionBlur={transitionMotion} />
        <TransitionSeries.Sequence name="02 · Lectura Wi-Fi" durationInFrames={35 * fps}>
          <MainScene sceneIndex={1} source="01-wifi-lectura.mp4" voiceSource="02-lectura-wifi.mp3" durationInFrames={35 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={pushCut({ outgoingScale: 1.07, incomingStartScale: 0.9, incomingEndScale: 1, flashColor: "#F4F4F4", flashOpacity: 0.11, flashFrames: 2 })} timing={linearTiming({ durationInFrames: 6 })} motionBlur={transitionMotion} />
        <TransitionSeries.Sequence name="03 · Detalle de señales" durationInFrames={36 * fps}>
          <MainScene sceneIndex={2} source="02-senales-detalle.mp4" voiceSource="03-detalles-de-señales.mp3" durationInFrames={36 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={cube({ direction: "from-left", perspective: 1600 })} timing={linearTiming({ durationInFrames: 8 })} motionBlur={transitionMotion} />
        <TransitionSeries.Sequence name="04 · Simulaciones" durationInFrames={28 * fps}>
          <MainScene sceneIndex={3} source="03-simulaciones.mp4" voiceSource="04-simulaciones.mp3" durationInFrames={28 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 6 })} motionBlur={transitionMotion} />
        <TransitionSeries.Sequence name="05 · Actividad e historial" durationInFrames={22 * fps}>
          <MainScene sceneIndex={4} source="04-actividad-api.mp4" voiceSource="05-actividad-historial.mp3" durationInFrames={22 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="06 · Envío a la API" durationInFrames={21 * fps}>
          <MainScene sceneIndex={5} source="05-envio-api.mp4" voiceSource="06-envío-manejo-de-lecturas.mp3" durationInFrames={21 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={flip({ direction: "from-right", perspective: 1500 })} timing={linearTiming({ durationInFrames: 8 })} motionBlur={transitionMotion} />
        <TransitionSeries.Sequence name="07 · Señuelo local" durationInFrames={34 * fps}>
          <MainScene sceneIndex={6} source="06-honeypot-local.mp4" voiceSource="07-señuelo.mp3" durationInFrames={34 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 10 })} motionBlur={transitionMotion} />
        <TransitionSeries.Sequence name="08 · Métricas del señuelo" durationInFrames={42 * fps}>
          <MainScene sceneIndex={7} source="07-actividad-honeypot.mp4" voiceSource="08-solicitudes-métricas.mp3" durationInFrames={42 * fps} visualTrimBeforeSeconds={40} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={clockWipe({ width, height })} timing={linearTiming({ durationInFrames: 8 })} motionBlur={transitionMotion} />
        <TransitionSeries.Sequence name="09 · Cuenta y conexión" durationInFrames={31 * fps}>
          <MainScene sceneIndex={8} source="08-cuenta-api.mp4" voiceSource="09-cuenta-conexión.mp3" durationInFrames={31 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 6 })} />
        <TransitionSeries.Sequence name="10 · Cierre" durationInFrames={17 * fps + 60}>
          <MainScene sceneIndex={9} source="09-cierre.mp4" voiceSource="10-cierre.mp3" durationInFrames={17 * fps + 60} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <MusicAndBed />
    </AbsoluteFill>
  );
};

export const HoneyPhonePreview: React.FC = () => {
  const { fps } = useVideoConfig();
  const transitionFrames = 8;
  const welcomeDuration = 7 * fps;
  const wifiDuration = 12 * fps + transitionFrames;
  const activityDuration = 8 * fps;
  return (
    <AbsoluteFill style={{ background: "#000000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Preview · cierre de bienvenida" durationInFrames={welcomeDuration}>
          <KineticScene sceneIndex={0} source="00-bienvenida-segura.mp4" voiceSource="01-bienvenida.mp3" durationInFrames={welcomeDuration} visualTrimBeforeSeconds={16} voiceTrimBeforeSeconds={15.13} voiceDurationInFrames={welcomeDuration} captionOffsetSeconds={15.13} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={iris({ width: 1920, height: 1080 })} timing={linearTiming({ durationInFrames: transitionFrames })} motionBlur={{ shutterAngle: 150, samples: 5 }} />
        <TransitionSeries.Sequence name="Preview · lectura Wi-Fi" durationInFrames={wifiDuration}>
          <KineticScene sceneIndex={1} source="01-wifi-lectura.mp4" voiceSource="02-lectura-wifi.mp3" durationInFrames={wifiDuration} voiceDelayInFrames={transitionFrames} voiceDurationInFrames={12 * fps} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={pushCut({ outgoingScale: 1.06, incomingStartScale: 0.92, flashColor: "#F4F4F4", flashOpacity: 0.1, flashFrames: 2 })} timing={linearTiming({ durationInFrames: transitionFrames })} motionBlur={{ shutterAngle: 150, samples: 5 }} />
        <TransitionSeries.Sequence name="Preview · actividad" durationInFrames={activityDuration}>
          <KineticScene sceneIndex={4} source="04-actividad-api.mp4" voiceSource="05-actividad-historial.mp3" durationInFrames={activityDuration} visualTrimBeforeSeconds={10} voiceTrimBeforeSeconds={10} voiceDelayInFrames={transitionFrames} voiceDurationInFrames={7 * fps} captionOffsetSeconds={10} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio name="Música preview" src={staticFile("audio/voice/eleven-labs/pista-fondo.mp3")} volume={0.085} />
      <Audio name="Ambiente preview" src={staticFile("audio/ambiente-honeyphone.wav")} volume={0.04} />
    </AbsoluteFill>
  );
};
