import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useHorizontalScrollHint, type ScrollDirection } from "../../hooks/useHorizontalScrollHint";
import { uiCopy } from "../../data/uiCopy";
import {
  type CaseStudyGalleryItem,
  CaseStudyMetaIcon,
  CaseStudyTextSectionLayout,
  SiteRoute,
  type CaseStudy,
  type CaseStudyParagraph,
  type Project,
} from "../../types/site";
import { isExternalHref } from "../../utils/links";
import "./CaseStudyDetail.css";

type CaseStudyDetailProps = {
  caseStudy: CaseStudy;
  relatedProjects: Project[];
};

type MetaGlyphProps = {
  icon: CaseStudyMetaIcon;
};

type ScrollHintButtonProps = {
  direction: ScrollDirection;
  label: string;
  disabled: boolean;
  onClick: () => void;
};

type PreviewableGalleryItem = CaseStudyGalleryItem & { imageSource: string };

const escapeKey = "Escape";
const arrowLeftKey = "ArrowLeft";
const arrowRightKey = "ArrowRight";

function hasGalleryImage(item: CaseStudyGalleryItem): item is PreviewableGalleryItem {
  return Boolean(item.imageSource);
}

function ScrollHintButton({ direction, label, disabled, onClick }: ScrollHintButtonProps) {
  return (
    <button
      className={`case-study-detail__scroll-button case-study-detail__scroll-button--${direction}`}
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden="true">{direction === "left" ? "‹" : "›"}</span>
    </button>
  );
}

function MetaGlyph({ icon }: MetaGlyphProps) {
  if (icon === CaseStudyMetaIcon.Lead) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.75 11.1a4.05 4.05 0 1 1 0-8.1 4.05 4.05 0 0 1 0 8.1Z" />
        <path d="M1.9 21.1v-1.3c0-3.45 2.85-6.25 6.35-6.25h1.05c1.6 0 3.05.58 4.15 1.55" />
        <path d="M17.4 21.2a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" />
        <path d="M17.4 16.35v2.9" />
      </svg>
    );
  }

  if (icon === CaseStudyMetaIcon.Team) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 11.4a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2Z" />
        <path d="M5.6 21v-1.1c0-3.25 2.9-5.85 6.4-5.85s6.4 2.6 6.4 5.85V21" />
        <path d="M5.25 10.8a2.9 2.9 0 1 1 0-5.8" />
        <path d="M1.7 19.7v-.8c0-2.35 1.75-4.35 4.1-4.8" />
        <path d="M18.75 10.8a2.9 2.9 0 1 0 0-5.8" />
        <path d="M22.3 19.7v-.8c0-2.35-1.75-4.35-4.1-4.8" />
      </svg>
    );
  }

  if (icon === CaseStudyMetaIcon.Calendar) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 3.4v3.1" />
        <path d="M18.5 3.4v3.1" />
        <path d="M3.6 8.3h16.8" />
        <path d="M5.2 5.1h13.6c1.1 0 2 .9 2 2v11.7c0 1.1-.9 2-2 2H5.2c-1.1 0-2-.9-2-2V7.1c0-1.1.9-2 2-2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 11.4a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" />
      <path d="M4.2 21v-1.5c0-3.6 3.5-6.45 7.8-6.45s7.8 2.85 7.8 6.45V21" />
    </svg>
  );
}

function HomeGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.2 10.5 12 4l7.8 6.5" />
      <path d="M6.2 9.1v10.2h11.6V9.1" />
      <path d="M9.7 19.3v-5.1h4.6v5.1" />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function ViewLiveGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 2C6.36739 2 6.24021 2.05268 6.14645 2.14645C6.05268 2.24021 6 2.36739 6 2.5C6 2.63261 6.05268 2.75979 6.14645 2.85355C6.24021 2.94732 6.36739 3 6.5 3H11.5C11.8978 3 12.2794 3.15804 12.5607 3.43934C12.842 3.72064 13 4.10218 13 4.5V11.5C13 11.8978 12.842 12.2794 12.5607 12.5607C12.2794 12.842 11.8978 13 11.5 13H6.5C6.36739 13 6.24021 13.0527 6.14645 13.1464C6.05268 13.2402 6 13.3674 6 13.5C6 13.6326 6.05268 13.7598 6.14645 13.8536C6.24021 13.9473 6.36739 14 6.5 14H11.5C12.163 14 12.7989 13.7366 13.2678 13.2678C13.7366 12.7989 14 12.163 14 11.5V4.5C14 3.83696 13.7366 3.20107 13.2678 2.73223C12.7989 2.26339 12.163 2 11.5 2H6.5ZM9.854 7.646L6.854 4.646C6.80751 4.59951 6.75232 4.56264 6.69158 4.53748C6.63084 4.51232 6.56574 4.49937 6.5 4.49937C6.43426 4.49937 6.36916 4.51232 6.30842 4.53748C6.24768 4.56264 6.19249 4.59951 6.146 4.646C6.09951 4.69249 6.06264 4.74768 6.03748 4.80842C6.01232 4.86916 5.99937 4.93426 5.99937 5C5.99937 5.06574 6.01232 5.13084 6.03748 5.19158C6.06264 5.25232 6.09951 5.30751 6.146 5.354L8.293 7.5H1.5C1.36739 7.5 1.24021 7.55268 1.14645 7.64645C1.05268 7.74021 1 7.86739 1 8C1 8.13261 1.05268 8.25979 1.14645 8.35355C1.24021 8.44732 1.36739 8.5 1.5 8.5H8.293L6.146 10.646C6.05211 10.7399 5.99937 10.8672 5.99937 11C5.99937 11.1328 6.05211 11.2601 6.146 11.354C6.23989 11.4479 6.36722 11.5006 6.5 11.5006C6.63278 11.5006 6.76011 11.4479 6.854 11.354L9.854 8.354C9.90056 8.30755 9.93751 8.25238 9.96271 8.19163C9.98792 8.13089 10.0009 8.06577 10.0009 8C10.0009 7.93423 9.98792 7.86911 9.96271 7.80837C9.93751 7.74762 9.90056 7.69245 9.854 7.646Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CaseStudyParagraphContent({ paragraph }: { paragraph: CaseStudyParagraph }) {
  if (!paragraph.lead) {
    return <>{paragraph.text}</>;
  }

  return (
    <>
      <strong>{paragraph.lead}</strong> {paragraph.text}
    </>
  );
}

function MoreProjectCard({ project }: { project: Project }) {
  const href = project.caseStudyHref ?? SiteRoute.Works;
  const content = (
    <>
      <span className="case-study-detail__more-media media-mask-hover" role="img" aria-label={project.imageDescription}>
        {project.imageSource ? <img className="case-study-detail__more-image" src={project.imageSource} alt="" aria-hidden="true" /> : null}
      </span>
      <span className="case-study-detail__more-title">{project.title}</span>
      <span className="case-study-detail__more-summary">{project.summaryLabel}</span>
    </>
  );

  if (isExternalHref(href)) {
    return (
      <a className="case-study-detail__more-card sibling-dim-card" href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className="case-study-detail__more-card sibling-dim-card" to={href}>
      {content}
    </Link>
  );
}

export function CaseStudyDetail({ caseStudy, relatedProjects }: CaseStudyDetailProps) {
  const galleryScrollHint = useHorizontalScrollHint<HTMLDivElement>();
  const moreProjectsScrollHint = useHorizontalScrollHint<HTMLDivElement>();
  const previewableGalleryItems = useMemo(() => caseStudy.galleryItems.filter(hasGalleryImage), [caseStudy.galleryItems]);
  const [activeGalleryItemId, setActiveGalleryItemId] = useState<string | null>(null);
  const activeGalleryItemIndex = activeGalleryItemId === null
    ? -1
    : previewableGalleryItems.findIndex((galleryItem) => galleryItem.id === activeGalleryItemId);
  const activeGalleryItem = activeGalleryItemIndex >= 0 ? previewableGalleryItems[activeGalleryItemIndex] : null;
  const hasMultipleGalleryItems = previewableGalleryItems.length > 1;
  const impactGridClassName =
    caseStudy.impactCards.length === 4
      ? "case-study-detail__impact-grid case-study-detail__impact-grid--two-column sibling-dim-group"
      : "case-study-detail__impact-grid sibling-dim-group";

  const closeGalleryPreview = useCallback(() => {
    setActiveGalleryItemId(null);
  }, []);

  const showAdjacentGalleryItem = useCallback((direction: ScrollDirection) => {
    setActiveGalleryItemId((currentGalleryItemId) => {
      if (previewableGalleryItems.length === 0) {
        return null;
      }

      const currentGalleryItemIndex = previewableGalleryItems.findIndex(
        (galleryItem) => galleryItem.id === currentGalleryItemId,
      );
      const fallbackIndex = direction === "right" ? 0 : previewableGalleryItems.length - 1;
      const nextGalleryItemIndex = currentGalleryItemIndex === -1
        ? fallbackIndex
        : (currentGalleryItemIndex + (direction === "right" ? 1 : -1) + previewableGalleryItems.length) %
          previewableGalleryItems.length;

      return previewableGalleryItems[nextGalleryItemIndex]?.id ?? null;
    });
  }, [previewableGalleryItems]);

  useEffect(() => {
    if (activeGalleryItemId !== null && activeGalleryItem === null) {
      setActiveGalleryItemId(null);
    }
  }, [activeGalleryItem, activeGalleryItemId]);

  useEffect(() => {
    if (activeGalleryItem === null) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleGalleryPreviewKeyDown = (event: KeyboardEvent) => {
      if (event.key === escapeKey) {
        closeGalleryPreview();
        return;
      }

      if (!hasMultipleGalleryItems) {
        return;
      }

      if (event.key === arrowLeftKey || event.key === arrowRightKey) {
        event.preventDefault();
        showAdjacentGalleryItem(event.key === arrowRightKey ? "right" : "left");
      }
    };

    window.addEventListener("keydown", handleGalleryPreviewKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      window.removeEventListener("keydown", handleGalleryPreviewKeyDown);
    };
  }, [activeGalleryItem, closeGalleryPreview, hasMultipleGalleryItems, showAdjacentGalleryItem]);

  return (
    <main className="case-study-detail">
      <article className="case-study-detail__content content-container">
        <nav className="case-study-detail__breadcrumb reveal-on-load" aria-label={uiCopy.caseStudyBreadcrumbAriaLabel}>
          <Link className="case-study-detail__breadcrumb-link" to={SiteRoute.Home} aria-label={uiCopy.breadcrumbHomeAriaLabel}>
            <HomeGlyph />
          </Link>
          <ChevronGlyph />
          <Link className="case-study-detail__breadcrumb-link" to={SiteRoute.Works}>
            {uiCopy.breadcrumbWorksLabel}
          </Link>
          <ChevronGlyph />
          <span>{caseStudy.title}</span>
        </nav>

        <div className="case-study-detail__cover media-mask-hover reveal-on-load reveal-delay-1" role="img" aria-label={caseStudy.coverImageDescription}>
          {caseStudy.coverImageSource ? (
            <img className="case-study-detail__cover-image" src={caseStudy.coverImageSource} alt="" aria-hidden="true" />
          ) : null}
        </div>

        <header className="case-study-detail__summary scroll-reveal">
          <div className="case-study-detail__title-group">
            <h1>{caseStudy.title}</h1>
            <p>{caseStudy.category}</p>
          </div>
          {caseStudy.liveHref ? (
            <a className="case-study-detail__live-link interactive-lift" href={caseStudy.liveHref} target="_blank" rel="noreferrer">
              <span>{uiCopy.viewLiveLabel}</span>
              <ViewLiveGlyph />
            </a>
          ) : null}
        </header>

        <dl className="case-study-detail__meta scroll-reveal">
          {caseStudy.metaItems.map((item) => (
            <div className="case-study-detail__meta-item" key={item.id}>
              <dt>
                <MetaGlyph icon={item.icon} />
              </dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>

        <section className="case-study-detail__text-grid">
          {caseStudy.textSections.map((section) => (
            <div
              className={`case-study-detail__text-section scroll-reveal${
                section.layout === CaseStudyTextSectionLayout.Wide ? " case-study-detail__text-section--wide" : ""
              }`}
              key={section.id}
            >
              <h2>{section.title}</h2>
              <div className="case-study-detail__paragraphs">
                {section.paragraphs.map((paragraph) => (
                  <p key={`${section.id}-${paragraph.text}`}>
                    <CaseStudyParagraphContent paragraph={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {caseStudy.tags ? (
          <ul className="case-study-detail__tags scroll-reveal" aria-label={`${caseStudy.title} project tags`}>
            {caseStudy.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <section className="case-study-detail__impact scroll-reveal" aria-labelledby="case-study-impact-title">
          <h2 id="case-study-impact-title">{caseStudy.impactTitle}</h2>
          <div className={impactGridClassName}>
            {caseStudy.impactCards.map((card) => (
              <article className="case-study-detail__impact-card sibling-dim-card" key={card.id}>
                <h3>{card.title}</h3>
                <p>{card.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-study-detail__reflection scroll-reveal" aria-labelledby="case-study-reflection-title">
          <h2 id="case-study-reflection-title">{caseStudy.reflection.title}</h2>
          <div className="case-study-detail__paragraphs">
            {caseStudy.reflection.paragraphs.map((paragraph) => (
              <p key={`${caseStudy.reflection.id}-${paragraph.text}`}>
                <CaseStudyParagraphContent paragraph={paragraph} />
              </p>
            ))}
          </div>
        </section>

        <section className="case-study-detail__gallery scroll-reveal" aria-labelledby="case-study-gallery-title">
          <h2 id="case-study-gallery-title">{caseStudy.galleryTitle}</h2>
          <div
            className="case-study-detail__scroll-shell"
            data-has-overflow={galleryScrollHint.hasHorizontalOverflow}
            data-can-scroll-left={galleryScrollHint.canScrollLeft}
            data-can-scroll-right={galleryScrollHint.canScrollRight}
          >
            <ScrollHintButton
              direction="left"
              label={uiCopy.scrollGalleryLeftAriaLabel}
              disabled={!galleryScrollHint.canScrollLeft}
              onClick={() => galleryScrollHint.scrollByPage("left")}
            />
            <div className="case-study-detail__gallery-grid" ref={galleryScrollHint.scrollContainerRef}>
              {caseStudy.galleryItems.map((item) =>
                item.imageSource ? (
                  <button
                    className="case-study-detail__gallery-item media-mask-hover"
                    key={item.id}
                    type="button"
                    aria-label={`${item.label}. ${uiCopy.openGalleryPreviewLabel}`}
                    onClick={() => setActiveGalleryItemId(item.id)}
                  >
                    <img className="case-study-detail__gallery-image" src={item.imageSource} alt="" aria-hidden="true" />
                  </button>
                ) : (
                  <div className="case-study-detail__gallery-item media-mask-hover" key={item.id} role="img" aria-label={item.label} />
                ),
              )}
            </div>
            <ScrollHintButton
              direction="right"
              label={uiCopy.scrollGalleryRightAriaLabel}
              disabled={!galleryScrollHint.canScrollRight}
              onClick={() => galleryScrollHint.scrollByPage("right")}
            />
          </div>
        </section>

        {activeGalleryItem ? (
          <div className="case-study-detail__gallery-preview" role="dialog" aria-modal="true" aria-label={activeGalleryItem.label}>
            <button
              className="case-study-detail__gallery-preview-backdrop"
              type="button"
              aria-label={uiCopy.closeGalleryPreviewLabel}
              onClick={closeGalleryPreview}
            />
            <div className="case-study-detail__gallery-preview-shell">
              <button
                className="case-study-detail__gallery-preview-close"
                type="button"
                aria-label={uiCopy.closeGalleryPreviewLabel}
                onClick={closeGalleryPreview}
              >
                <span aria-hidden="true">×</span>
              </button>
              {hasMultipleGalleryItems ? (
                <button
                  className="case-study-detail__gallery-preview-button case-study-detail__gallery-preview-button--left"
                  type="button"
                  aria-label={uiCopy.previousGalleryPreviewLabel}
                  onClick={() => showAdjacentGalleryItem("left")}
                >
                  <span aria-hidden="true">‹</span>
                </button>
              ) : null}
              <figure className="case-study-detail__gallery-preview-figure">
                <img className="case-study-detail__gallery-preview-image" src={activeGalleryItem.imageSource} alt={activeGalleryItem.label} />
                <figcaption className="case-study-detail__gallery-preview-caption">
                  <span>{activeGalleryItem.label}</span>
                  {hasMultipleGalleryItems ? (
                    <span>{`${activeGalleryItemIndex + 1} / ${previewableGalleryItems.length}`}</span>
                  ) : null}
                </figcaption>
              </figure>
              {hasMultipleGalleryItems ? (
                <button
                  className="case-study-detail__gallery-preview-button case-study-detail__gallery-preview-button--right"
                  type="button"
                  aria-label={uiCopy.nextGalleryPreviewLabel}
                  onClick={() => showAdjacentGalleryItem("right")}
                >
                  <span aria-hidden="true">›</span>
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        <section className="case-study-detail__more scroll-reveal" aria-labelledby="case-study-more-title">
          <h2 id="case-study-more-title">{caseStudy.moreProjectsTitle}</h2>
          <div
            className="case-study-detail__scroll-shell"
            data-has-overflow={moreProjectsScrollHint.hasHorizontalOverflow}
            data-can-scroll-left={moreProjectsScrollHint.canScrollLeft}
            data-can-scroll-right={moreProjectsScrollHint.canScrollRight}
          >
            <ScrollHintButton
              direction="left"
              label={uiCopy.scrollMoreProjectsLeftAriaLabel}
              disabled={!moreProjectsScrollHint.canScrollLeft}
              onClick={() => moreProjectsScrollHint.scrollByPage("left")}
            />
            <div className="case-study-detail__more-track sibling-dim-group" ref={moreProjectsScrollHint.scrollContainerRef}>
              {relatedProjects.map((project) => (
                <MoreProjectCard project={project} key={project.slug} />
              ))}
            </div>
            <ScrollHintButton
              direction="right"
              label={uiCopy.scrollMoreProjectsRightAriaLabel}
              disabled={!moreProjectsScrollHint.canScrollRight}
              onClick={() => moreProjectsScrollHint.scrollByPage("right")}
            />
          </div>
        </section>
      </article>
    </main>
  );
}
