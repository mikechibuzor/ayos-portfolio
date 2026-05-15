import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollDocumentToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

export function useScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    const rootElement = document.documentElement;
    const previousScrollBehavior = rootElement.style.scrollBehavior;

    rootElement.style.scrollBehavior = "auto";
    scrollDocumentToTop();

    const animationFrameId = window.requestAnimationFrame(() => {
      scrollDocumentToTop();
      rootElement.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      rootElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, [location.pathname]);
}
