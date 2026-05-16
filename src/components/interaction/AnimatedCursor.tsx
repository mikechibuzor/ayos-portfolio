import { useEffect, useRef } from "react";
import "./AnimatedCursor.css";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  ".project-card",
  ".case-study-detail__more-card",
  ".me-page__experience-card-header",
  ".stack-section__tile",
].join(",");

const MAGNET_SELECTOR = [
  "a",
  "button",
  ".project-card",
  ".case-study-detail__more-card",
  ".stack-section__tool",
  ".me-page__experience-card-header",
].join(",");

const SPOTLIGHT_SELECTOR = [
  ".project-card__media",
  ".case-study-detail__cover",
  ".case-study-detail__more-media",
  ".me-page__project-preview-media",
].join(",");

function supportsCustomCursor() {
  return window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!supportsCustomCursor()) {
      return;
    }

    const cursorElement = cursorRef.current;
    const trailElement = trailRef.current;

    if (!cursorElement || !trailElement) {
      return;
    }

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let trailX = pointerX;
    let trailY = pointerY;
    let animationFrameId = 0;
    let rippleTimeoutId = 0;

    const renderCursor = () => {
      cursorX += (pointerX - cursorX) * 0.22;
      cursorY += (pointerY - cursorY) * 0.22;
      trailX += (pointerX - trailX) * 0.055;
      trailY += (pointerY - trailY) * 0.055;
      cursorElement.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      trailElement.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      animationFrameId = window.requestAnimationFrame(renderCursor);
    };

    const updatePointerState = (event: PointerEvent) => {
      let nextPointerX = event.clientX;
      let nextPointerY = event.clientY;

      if (event.target instanceof Element) {
        const magnetTarget = event.target.closest(MAGNET_SELECTOR);

        if (magnetTarget) {
          const magnetTargetRect = magnetTarget.getBoundingClientRect();
          nextPointerX += (magnetTargetRect.left + magnetTargetRect.width / 2 - event.clientX) * 0.14;
          nextPointerY += (magnetTargetRect.top + magnetTargetRect.height / 2 - event.clientY) * 0.14;
        }

        const spotlightTarget = event.target.closest(SPOTLIGHT_SELECTOR);

        if (spotlightTarget instanceof HTMLElement) {
          const spotlightTargetRect = spotlightTarget.getBoundingClientRect();
          spotlightTarget.style.setProperty("--cursor-local-x", `${event.clientX - spotlightTargetRect.left}px`);
          spotlightTarget.style.setProperty("--cursor-local-y", `${event.clientY - spotlightTargetRect.top}px`);
        }
      }

      pointerX = nextPointerX;
      pointerY = nextPointerY;
      cursorElement.dataset.visible = "true";
      trailElement.dataset.visible = "true";
      const isInteractive = event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR) ? "true" : "false";
      cursorElement.dataset.interactive = isInteractive;
      trailElement.dataset.interactive = isInteractive;
    };

    const hideCursor = () => {
      cursorElement.dataset.visible = "false";
      trailElement.dataset.visible = "false";
      cursorElement.dataset.interactive = "false";
      trailElement.dataset.interactive = "false";
    };

    const pressCursor = () => {
      cursorElement.dataset.pressed = "true";
      cursorElement.dataset.rippling = "false";
      window.clearTimeout(rippleTimeoutId);
      window.requestAnimationFrame(() => {
        cursorElement.dataset.rippling = "true";
        rippleTimeoutId = window.setTimeout(() => {
          cursorElement.dataset.rippling = "false";
        }, 520);
      });
      trailElement.dataset.pressed = "true";
    };

    const releaseCursor = () => {
      cursorElement.dataset.pressed = "false";
      trailElement.dataset.pressed = "false";
    };

    window.addEventListener("pointermove", updatePointerState, { passive: true });
    window.addEventListener("pointerdown", pressCursor);
    window.addEventListener("pointerup", releaseCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);
    animationFrameId = window.requestAnimationFrame(renderCursor);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(rippleTimeoutId);
      window.removeEventListener("pointermove", updatePointerState);
      window.removeEventListener("pointerdown", pressCursor);
      window.removeEventListener("pointerup", releaseCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <>
      <div className="animated-cursor-trail" aria-hidden="true" ref={trailRef}>
        <span className="animated-cursor-trail__ring" />
      </div>
      <div className="animated-cursor" aria-hidden="true" ref={cursorRef}>
        <span className="animated-cursor__ripple" />
        <span className="animated-cursor__ring" />
        <span className="animated-cursor__dot" />
      </div>
    </>
  );
}
