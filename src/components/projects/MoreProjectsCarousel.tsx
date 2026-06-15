import { Link } from "react-router-dom";
import { uiCopy } from "../../data/uiCopy";
import { useHorizontalScrollHint, type ScrollDirection } from "../../hooks/useHorizontalScrollHint";
import { SiteRoute, type Project } from "../../types/site";
import { isExternalHref } from "../../utils/links";
import "./MoreProjectsCarousel.css";

type MoreProjectsCarouselProps = {
  title: string;
  projects: Project[];
};

type CarouselArrowProps = {
  direction: ScrollDirection;
  label: string;
  disabled: boolean;
  onClick: () => void;
};

function CarouselArrow({ direction, label, disabled, onClick }: CarouselArrowProps) {
  return (
    <button
      className={`more-projects__arrow more-projects__arrow--${direction}`}
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden="true">{direction === "left" ? "‹" : "›"}</span>
    </button>
  );
}

function MoreProjectCard({ project }: { project: Project }) {
  const href = project.caseStudyHref ?? SiteRoute.Works;
  const content = (
    <>
      <span className="more-projects__media media-mask-hover" role="img" aria-label={project.imageDescription}>
        {project.imageSource ? (
          <img className="more-projects__image" src={project.imageSource} alt="" aria-hidden="true" />
        ) : null}
      </span>
      <span className="more-projects__card-title">{project.title}</span>
      <span className="more-projects__card-summary">{project.summaryLabel}</span>
    </>
  );

  if (isExternalHref(href)) {
    return (
      <a className="more-projects__card sibling-dim-card" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className="more-projects__card sibling-dim-card" to={href}>
      {content}
    </Link>
  );
}

export function MoreProjectsCarousel({ title, projects }: MoreProjectsCarouselProps) {
  const scrollHint = useHorizontalScrollHint<HTMLDivElement>();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="more-projects scroll-reveal" aria-labelledby="more-projects-title">
      <h2 className="more-projects__title" id="more-projects-title">
        {title}
      </h2>
      <div
        className="more-projects__shell"
        data-has-overflow={scrollHint.hasHorizontalOverflow}
        data-can-scroll-left={scrollHint.canScrollLeft}
        data-can-scroll-right={scrollHint.canScrollRight}
      >
        <CarouselArrow
          direction="left"
          label={uiCopy.scrollMoreProjectsLeftAriaLabel}
          disabled={!scrollHint.canScrollLeft}
          onClick={() => scrollHint.scrollByPage("left")}
        />
        <div className="more-projects__track sibling-dim-group" ref={scrollHint.scrollContainerRef}>
          {projects.map((project) => (
            <MoreProjectCard project={project} key={project.slug} />
          ))}
        </div>
        <CarouselArrow
          direction="right"
          label={uiCopy.scrollMoreProjectsRightAriaLabel}
          disabled={!scrollHint.canScrollRight}
          onClick={() => scrollHint.scrollByPage("right")}
        />
      </div>
    </section>
  );
}
