import { useHorizontalScrollHint } from "../../hooks/useHorizontalScrollHint";
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
  const stackScrollHint = useHorizontalScrollHint<HTMLUListElement>({
    autoLoop: true,
    loop: true,
    minimumScrollableItemCount: minimumScrollableToolCount,
    responsiveOverflowQuery: stackScrollHintQuery,
    scrollPageMultiplier: 0.72,
  });
  const stackToolRows = [false, true];

  return (
    <section className="stack-section section-block scroll-reveal" id="stacks" aria-labelledby="stack-title">
      <div className="stack-section__inner content-container">
        <div className="stack-section__heading">
          <h2 id="stack-title">{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div
          className="stack-section__scroller"
          data-can-scroll-left={stackScrollHint.canScrollLeft}
          data-can-scroll-right={stackScrollHint.canScrollRight}
          data-has-overflow={stackScrollHint.hasHorizontalOverflow}
        >
          <button
            className="stack-section__scroll-button stack-section__scroll-button--left"
            type="button"
            aria-label={uiCopy.scrollStackLeftAriaLabel}
            disabled={!stackScrollHint.canScrollLeft}
            onClick={() => stackScrollHint.scrollByPage("left")}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <ul className="stack-section__tools" aria-label={title} ref={stackScrollHint.scrollContainerRef}>
            {stackToolRows.map((isDuplicateRow) =>
              tools.map((tool, toolIndex) => (
                <li
                  className="stack-section__tool interactive-lift"
                  key={`${isDuplicateRow ? "duplicate" : "primary"}-${tool.name}`}
                  aria-hidden={isDuplicateRow}
                  data-scroll-loop-duplicate-start={isDuplicateRow && toolIndex === 0 ? "true" : undefined}
                >
                  <span className="stack-section__icon-frame">
                    <img className={tool.iconClassName} src={tool.iconSource} alt={isDuplicateRow ? "" : tool.name} />
                  </span>
                </li>
              )),
            )}
          </ul>
          <button
            className="stack-section__scroll-button stack-section__scroll-button--right"
            type="button"
            aria-label={uiCopy.scrollStackRightAriaLabel}
            disabled={!stackScrollHint.canScrollRight}
            onClick={() => stackScrollHint.scrollByPage("right")}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
