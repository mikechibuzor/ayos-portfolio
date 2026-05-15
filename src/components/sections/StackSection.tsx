import { useLayoutEffect, useRef, useState } from "react";
import { uiCopy } from "../../data/uiCopy";
import type { StackTool } from "../../types/site";
import "./StackSection.css";

type StackSectionProps = {
  title: string;
  subtitle: string;
  tools: StackTool[];
};

const stackScrollHintQuery = "(max-width: 56.25rem)";
const minimumScrollableToolCount = 3;

export function StackSection({ title, subtitle, tools }: StackSectionProps) {
  const toolsListRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasHorizontalOverflow, setHasHorizontalOverflow] = useState(false);

  useLayoutEffect(() => {
    const toolsList = toolsListRef.current;

    if (!toolsList) {
      return;
    }

    const updateScrollButtons = () => {
      const maxScrollLeft = toolsList.scrollWidth - toolsList.clientWidth;
      const hasMeasuredOverflow = maxScrollLeft > 1;
      const hasResponsiveOverflow =
        window.matchMedia(stackScrollHintQuery).matches && toolsList.children.length > minimumScrollableToolCount;

      setHasHorizontalOverflow(hasMeasuredOverflow || hasResponsiveOverflow);
      setCanScrollLeft(toolsList.scrollLeft > 1);
      setCanScrollRight(hasMeasuredOverflow ? toolsList.scrollLeft < maxScrollLeft - 1 : hasResponsiveOverflow);
    };

    updateScrollButtons();
    const animationFrameId = window.requestAnimationFrame(updateScrollButtons);
    const resizeObserver = new ResizeObserver(updateScrollButtons);

    resizeObserver.observe(toolsList);

    if (toolsList.parentElement) {
      resizeObserver.observe(toolsList.parentElement);
    }

    toolsList.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      toolsList.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollTools = (direction: "left" | "right") => {
    const toolsList = toolsListRef.current;

    if (!toolsList) {
      return;
    }

    toolsList.scrollBy({
      left: direction === "right" ? toolsList.clientWidth * 0.72 : -toolsList.clientWidth * 0.72,
      behavior: "smooth",
    });
  };

  return (
    <section className="stack-section section-block scroll-reveal" id="stacks" aria-labelledby="stack-title">
      <div className="stack-section__inner content-container">
        <div className="stack-section__heading">
          <h2 id="stack-title">{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div
          className="stack-section__scroller"
          data-can-scroll-left={canScrollLeft}
          data-can-scroll-right={canScrollRight}
          data-has-overflow={hasHorizontalOverflow}
        >
          <button
            className="stack-section__scroll-button stack-section__scroll-button--left"
            type="button"
            aria-label={uiCopy.scrollStackLeftAriaLabel}
            disabled={!canScrollLeft}
            onClick={() => scrollTools("left")}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <ul className="stack-section__tools" aria-label={title} ref={toolsListRef}>
            {tools.map((tool) => (
              <li className="stack-section__tool interactive-lift" key={tool.name}>
                <span className="stack-section__icon-frame">
                  <img className={tool.iconClassName} src={tool.iconSource} alt={tool.name} />
                </span>
              </li>
            ))}
          </ul>
          <button
            className="stack-section__scroll-button stack-section__scroll-button--right"
            type="button"
            aria-label={uiCopy.scrollStackRightAriaLabel}
            disabled={!canScrollRight}
            onClick={() => scrollTools("right")}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
