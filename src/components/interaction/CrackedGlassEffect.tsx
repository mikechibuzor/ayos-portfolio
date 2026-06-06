import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./CrackedGlassEffect.css";

const CRACK_VISIBLE_DURATION_MS = 2100;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const CRACK_CENTER = 50;
const MAIN_CRACK_COUNT = 10;
const RING_CRACK_COUNT = 3;

const CRACK_IGNORE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "video",
  "audio",
  "iframe",
  "[role='button']",
  "[role='link']",
  "[tabindex]:not([tabindex='-1'])",
  ".interactive-lift",
  ".media-mask-hover",
  ".project-card",
  ".more-projects__card",
  ".case-study-detail__gallery-item",
  ".case-study-detail__more-card",
  ".me-page__media-card",
  ".me-page__media-preview",
  ".me-page__experience-card-header",
  ".me-page__stack-tool",
  ".me-page__project-preview",
  ".stack-section__tool",
  ".social-links__item",
  ".theme-toggle",
  ".site-header__menu-button",
].join(",");

type CrackState = {
  id: number;
  x: number;
  y: number;
  isReducedMotion: boolean;
  paths: CrackPath[];
};

type CrackPath = {
  d: string;
  delay: number;
  duration: number;
  kind: "radial" | "branch" | "ring";
  opacity: number;
  width: number;
};

type CrackEffectStyle = CSSProperties & {
  "--crack-x": string;
  "--crack-y": string;
};

function isLightTheme() {
  return document.documentElement.getAttribute("data-theme") === "light";
}

function isReducedMotionPreferred() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function shouldIgnoreCrackTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(CRACK_IGNORE_SELECTOR));
}

function createSeededRandom(seed: number) {
  let randomSeed = seed % 2147483647;

  if (randomSeed <= 0) {
    randomSeed += 2147483646;
  }

  return () => {
    randomSeed = (randomSeed * 16807) % 2147483647;
    return (randomSeed - 1) / 2147483646;
  };
}

function createJaggedPath(points: Array<{ x: number; y: number }>) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
}

function createCrackRay(angle: number, length: number, random: () => number) {
  const pointCount = 5 + Math.floor(random() * 3);
  const points = [{ x: CRACK_CENTER, y: CRACK_CENTER }];

  for (let index = 1; index <= pointCount; index += 1) {
    const progress = index / pointCount;
    const wobble = (random() - 0.5) * (4.8 + progress * 7.2);
    const distance = length * progress * (0.9 + random() * 0.16);
    const x = CRACK_CENTER + Math.cos(angle) * distance + Math.cos(angle + Math.PI / 2) * wobble;
    const y = CRACK_CENTER + Math.sin(angle) * distance + Math.sin(angle + Math.PI / 2) * wobble;

    points.push({ x, y });
  }

  return points;
}

function createRingCrackPath(radius: number, startAngle: number, arcLength: number, random: () => number) {
  const segmentCount = 5 + Math.floor(random() * 4);
  const points: Array<{ x: number; y: number }> = [];

  for (let index = 0; index <= segmentCount; index += 1) {
    const progress = index / segmentCount;
    const angle = startAngle + arcLength * progress + (random() - 0.5) * 0.09;
    const radiusWobble = radius + (random() - 0.5) * 3.2;
    const tangentJitter = (random() - 0.5) * 1.6;
    const x = CRACK_CENTER + Math.cos(angle) * radiusWobble + Math.cos(angle + Math.PI / 2) * tangentJitter;
    const y = CRACK_CENTER + Math.sin(angle) * radiusWobble + Math.sin(angle + Math.PI / 2) * tangentJitter;

    points.push({ x, y });
  }

  return createJaggedPath(points);
}

function createCrackPaths(seed: number, isReducedMotion: boolean): CrackPath[] {
  const random = createSeededRandom(seed);
  const paths: CrackPath[] = [];
  const rayCount = isReducedMotion ? 5 : MAIN_CRACK_COUNT;

  for (let index = 0; index < rayCount; index += 1) {
    const baseAngle = (Math.PI * 2 * index) / rayCount;
    const angle = baseAngle + (random() - 0.5) * 0.82;
    const length = isReducedMotion ? 18 + random() * 12 : 24 + random() * 28;
    const rayPoints = createCrackRay(angle, length, random);
    const radialDelay = isReducedMotion ? 0 : index * 12 + random() * 34;
    const radialDuration = isReducedMotion ? 0 : 460 + random() * 230;

    paths.push({
      d: createJaggedPath(rayPoints),
      delay: radialDelay,
      duration: radialDuration,
      kind: "radial",
      opacity: 0.58 + random() * 0.34,
      width: 0.42 + random() * 0.42,
    });

    if (!isReducedMotion && random() > 0.22) {
      const branchStartIndex = 2 + Math.floor(random() * Math.max(1, rayPoints.length - 3));
      const branchStart = rayPoints[branchStartIndex];

      if (!branchStart) {
        continue;
      }

      const branchDirection = angle + (random() > 0.5 ? 1 : -1) * (0.58 + random() * 0.95);
      const branchLength = 8 + random() * 16;
      const branchProgress = branchStartIndex / Math.max(1, rayPoints.length - 1);
      const branchPoints: Array<{ x: number; y: number }> = [branchStart, ...createCrackRay(branchDirection, branchLength, random).slice(1).map((point) => ({
        x: branchStart.x + point.x - CRACK_CENTER,
        y: branchStart.y + point.y - CRACK_CENTER,
      }))];

      paths.push({
        d: createJaggedPath(branchPoints),
        delay: radialDelay + radialDuration * branchProgress + 48 + random() * 90,
        duration: 330 + random() * 210,
        kind: "branch",
        opacity: 0.24 + random() * 0.34,
        width: 0.26 + random() * 0.24,
      });
    }
  }

  if (!isReducedMotion) {
    for (let index = 0; index < RING_CRACK_COUNT; index += 1) {
      const radius = 9 + index * 5.5 + random() * 4.5;
      const startAngle = random() * Math.PI * 2;
      const arcLength = (0.42 + random() * 0.48) * Math.PI;

      paths.push({
        d: createRingCrackPath(radius, startAngle, arcLength, random),
        delay: 210 + index * 80 + random() * 140,
        duration: 360 + random() * 220,
        kind: "ring",
        opacity: 0.2 + random() * 0.22,
        width: 0.18 + random() * 0.2,
      });
    }
  }

  return paths;
}

export function CrackedGlassEffect() {
  const [crackState, setCrackState] = useState<CrackState | null>(null);
  const crackTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  useEffect(() => {
    const clearCrackTimeout = () => {
      if (crackTimeoutRef.current === null) {
        return;
      }

      window.clearTimeout(crackTimeoutRef.current);
      crackTimeoutRef.current = null;
    };

    const clearCrack = () => {
      clearCrackTimeout();
      setCrackState(null);
    };

    const triggerCrack = (event: PointerEvent) => {
      if (isLightTheme() || shouldIgnoreCrackTarget(event.target)) {
        return;
      }

      const crackId = Date.now();
      const isReducedMotion = isReducedMotionPreferred();
      clearCrackTimeout();
      setCrackState({
        id: crackId,
        x: event.clientX,
        y: event.clientY,
        isReducedMotion,
        paths: createCrackPaths(crackId + Math.round(event.clientX * 13) + Math.round(event.clientY * 17), isReducedMotion),
      });
      crackTimeoutRef.current = window.setTimeout(() => {
        setCrackState(null);
        crackTimeoutRef.current = null;
      }, CRACK_VISIBLE_DURATION_MS);
    };

    document.addEventListener("pointerdown", triggerCrack, { passive: true });
    window.addEventListener("blur", clearCrack);

    return () => {
      document.removeEventListener("pointerdown", triggerCrack);
      window.removeEventListener("blur", clearCrack);
      clearCrackTimeout();
    };
  }, []);

  return (
    <div className="cracked-glass-effect" aria-hidden="true">
      {crackState ? (
        <span
          className="cracked-glass-effect__fracture"
          data-reduced-motion={crackState.isReducedMotion}
          key={crackState.id}
          style={
            {
              "--crack-x": `${crackState.x}px`,
              "--crack-y": `${crackState.y}px`,
            } as CrackEffectStyle
          }
        >
          <svg className="cracked-glass-effect__svg" viewBox="0 0 100 100" focusable="false">
            <circle className="cracked-glass-effect__impact" cx="50" cy="50" r="1.2" />
            {crackState.paths.map((path, index) => (
              <path
                className="cracked-glass-effect__path"
                d={path.d}
                data-kind={path.kind}
                key={`${path.d}-${index}`}
                pathLength="1"
                style={
                  {
                    "--path-opacity": String(path.opacity),
                    "--path-width": String(path.width),
                    "--path-delay": `${path.delay.toFixed(0)}ms`,
                    "--path-duration": `${path.duration.toFixed(0)}ms`,
                    "--path-life-duration": `${Math.max(700, CRACK_VISIBLE_DURATION_MS - path.delay).toFixed(0)}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </svg>
        </span>
      ) : null}
    </div>
  );
}
