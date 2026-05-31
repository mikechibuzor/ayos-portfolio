import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "left" | "right";

export function useHorizontalScrollHint<TElement extends HTMLElement>() {
  const scrollContainerRef = useRef<TElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const updateScrollState = () => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      setHasHorizontalOverflow(maxScrollLeft > 1);
      setCanScrollLeft(scrollContainer.scrollLeft > 1);
      setCanScrollRight(scrollContainer.scrollLeft < maxScrollLeft - 1);
    };

    updateScrollState();
    scrollContainer.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scrollContainer.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByPage = (direction: ScrollDirection) => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    scrollContainer.scrollBy({
      left: direction === "right" ? scrollContainer.clientWidth * 0.78 : -scrollContainer.clientWidth * 0.78,
      behavior: "smooth",
    });
  };

  return {
    canScrollLeft,
    canScrollRight,
    hasHorizontalOverflow,
    scrollByPage,
    scrollContainerRef,
  };
}
