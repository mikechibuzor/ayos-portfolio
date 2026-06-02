import { useCallback, useEffect, useRef, useState } from "react";

export type ScrollDirection = "left" | "right";

type UseHorizontalScrollHintOptions = {
  autoLoop?: boolean;
  autoLoopSpeed?: number;
  loop?: boolean;
  minimumScrollableItemCount?: number;
  responsiveOverflowQuery?: string;
  scrollPageMultiplier?: number;
};

const defaultScrollPageMultiplier = 0.78;
const defaultAutoLoopSpeed = 0.04;
const loopNormalizeDelayMs = 520;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const loopDuplicateStartSelector = "[data-scroll-loop-duplicate-start='true']";

function getLoopDistance(scrollContainer: HTMLElement): number {
  const duplicateStartElement = scrollContainer.querySelector<HTMLElement>(loopDuplicateStartSelector);

  return duplicateStartElement?.offsetLeft ?? scrollContainer.scrollWidth / 2;
}

function normalizeLoopScroll(scrollContainer: HTMLElement, loopDistance: number) {
  if (loopDistance <= 0) {
    return;
  }

  if (scrollContainer.scrollLeft >= loopDistance) {
    scrollContainer.scrollLeft -= loopDistance;
  }
}

export function useHorizontalScrollHint<TElement extends HTMLElement>({
  autoLoop = false,
  autoLoopSpeed = defaultAutoLoopSpeed,
  loop = false,
  minimumScrollableItemCount = 0,
  responsiveOverflowQuery,
  scrollPageMultiplier = defaultScrollPageMultiplier,
}: UseHorizontalScrollHintOptions = {}) {
  const scrollContainerRef = useRef<TElement>(null);
  const autoLoopTimerRef = useRef<ReturnType<typeof window.setInterval> | null>(null);
  const autoLoopTimestampRef = useRef<number | null>(null);
  const manualLoopTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const isAutoLoopPausedRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  const updateScrollState = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const hasMeasuredOverflow = maxScrollLeft > 1;
    const hasResponsiveOverflow =
      responsiveOverflowQuery !== undefined &&
      window.matchMedia(responsiveOverflowQuery).matches &&
      scrollContainer.children.length > minimumScrollableItemCount;
    const hasOverflow = hasMeasuredOverflow || hasResponsiveOverflow;

    setHasHorizontalOverflow(hasOverflow);
    setCanScrollLeft(loop ? hasOverflow : scrollContainer.scrollLeft > 1);
    setCanScrollRight(loop ? hasOverflow : hasMeasuredOverflow ? scrollContainer.scrollLeft < maxScrollLeft - 1 : hasResponsiveOverflow);
  }, [loop, minimumScrollableItemCount, responsiveOverflowQuery]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    updateScrollState();
    const animationFrameId = window.requestAnimationFrame(updateScrollState);
    const resizeObserver = new ResizeObserver(updateScrollState);

    resizeObserver.observe(scrollContainer);

    if (scrollContainer.parentElement) {
      resizeObserver.observe(scrollContainer.parentElement);
    }

    scrollContainer.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      scrollContainer.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!autoLoop || !loop || !scrollContainer) {
      return;
    }

    const reducedMotionMediaQuery = window.matchMedia(reducedMotionQuery);

    if (reducedMotionMediaQuery.matches) {
      return;
    }

    const pauseAutoLoop = () => {
      isAutoLoopPausedRef.current = true;
    };
    const resumeAutoLoop = () => {
      isAutoLoopPausedRef.current = false;
      autoLoopTimestampRef.current = null;
    };
    const resumeAutoLoopAfterFocusLeaves = () => {
      window.requestAnimationFrame(() => {
        if (!scrollContainer.contains(document.activeElement)) {
          resumeAutoLoop();
        }
      });
    };

    const tick = () => {
      const timestamp = performance.now();
      const previousTimestamp = autoLoopTimestampRef.current ?? timestamp;
      const elapsedMs = timestamp - previousTimestamp;

      autoLoopTimestampRef.current = timestamp;

      if (!isAutoLoopPausedRef.current && scrollContainer.scrollWidth - scrollContainer.clientWidth > 1) {
        const loopDistance = getLoopDistance(scrollContainer);

        scrollContainer.scrollLeft += elapsedMs * autoLoopSpeed;
        normalizeLoopScroll(scrollContainer, loopDistance);
      }
    };

    scrollContainer.addEventListener("mouseenter", pauseAutoLoop);
    scrollContainer.addEventListener("mouseleave", resumeAutoLoop);
    scrollContainer.addEventListener("focusin", pauseAutoLoop);
    scrollContainer.addEventListener("focusout", resumeAutoLoopAfterFocusLeaves);
    autoLoopTimestampRef.current = performance.now();
    autoLoopTimerRef.current = window.setInterval(tick, 16);

    return () => {
      if (autoLoopTimerRef.current !== null) {
        window.clearInterval(autoLoopTimerRef.current);
        autoLoopTimerRef.current = null;
      }

      scrollContainer.removeEventListener("mouseenter", pauseAutoLoop);
      scrollContainer.removeEventListener("mouseleave", resumeAutoLoop);
      scrollContainer.removeEventListener("focusin", pauseAutoLoop);
      scrollContainer.removeEventListener("focusout", resumeAutoLoopAfterFocusLeaves);
      autoLoopTimestampRef.current = null;
    };
  }, [autoLoop, autoLoopSpeed, loop]);

  const scrollByPage = useCallback((direction: ScrollDirection) => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const scrollAmount = scrollContainer.clientWidth * scrollPageMultiplier;

    if (loop) {
      const loopDistance = getLoopDistance(scrollContainer);

      if (loopDistance > 0 && direction === "left" && scrollContainer.scrollLeft - scrollAmount < 0) {
        scrollContainer.scrollLeft += loopDistance;
      }

      scrollContainer.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });

      if (manualLoopTimeoutRef.current !== null) {
        window.clearTimeout(manualLoopTimeoutRef.current);
      }

      manualLoopTimeoutRef.current = window.setTimeout(() => {
        normalizeLoopScroll(scrollContainer, loopDistance);
        updateScrollState();
        manualLoopTimeoutRef.current = null;
      }, loopNormalizeDelayMs);

      return;
    }

    scrollContainer.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, [loop, scrollPageMultiplier, updateScrollState]);

  useEffect(() => {
    return () => {
      if (manualLoopTimeoutRef.current !== null) {
        window.clearTimeout(manualLoopTimeoutRef.current);
      }
    };
  }, []);

  return {
    canScrollLeft,
    canScrollRight,
    hasHorizontalOverflow,
    scrollByPage,
    scrollContainerRef,
  };
}
