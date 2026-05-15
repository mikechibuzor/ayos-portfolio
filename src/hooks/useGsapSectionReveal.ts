import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapSectionReveal() {
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".scroll-reveal", { autoAlpha: 1, clearProps: "transform" });
      return;
    }

    const context = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(".scroll-reveal");

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 42,
            filter: "blur(0.75rem)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0rem)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      context.revert();
    };
  }, [location.pathname]);
}
