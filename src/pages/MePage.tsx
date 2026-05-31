import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { ContactSection } from "../components/sections/ContactSection";
import { mePageContent } from "../data/pageContent";
import { contactFields, profile } from "../data/profile";
import { allProjectGalleryItems } from "../data/projectGalleryImages";
import { stackTools } from "../data/stacks";
import { uiCopy } from "../data/uiCopy";
import type { CaseStudyGalleryItem } from "../types/site";
import "./MePage.css";

const MEDIA_PREVIEW_EXIT_DURATION_MS = 740;
const ESCAPE_KEY = "Escape";
const MEDIA_PREVIEW_MIN_WIDTH_REM = 19;
const MEDIA_PREVIEW_MAX_WIDTH_REM = 42;
const MEDIA_PREVIEW_MAX_HEIGHT_REM = 34;
const MEDIA_PREVIEW_HORIZONTAL_INSET_REM = 1.5;
const STACK_SCROLL_HINT_QUERY = "(max-width: 56.25rem)";
const MINIMUM_SCROLLABLE_STACK_TOOL_COUNT = 3;
const MEDIA_STRIP_VISIBLE_CARD_COUNT = 6;
const MEDIA_STRIP_SHUFFLE_INTERVAL_MS = 15000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type MediaPreviewGeometry = {
  sourceX: number;
  sourceY: number;
  sourceScaleX: number;
  sourceScaleY: number;
  targetX: number;
  targetY: number;
  targetWidth: number;
  targetHeight: number;
};

type MediaPreviewCssVariable =
  | "--media-preview-source-x"
  | "--media-preview-source-y"
  | "--media-preview-source-scale-x"
  | "--media-preview-source-scale-y"
  | "--media-preview-target-x"
  | "--media-preview-target-y"
  | "--media-preview-target-width"
  | "--media-preview-target-height";

type MediaPreviewStyle = CSSProperties & Record<MediaPreviewCssVariable, string>;
type MediaStripGalleryItem = CaseStudyGalleryItem & { imageSource: string };

enum MediaPreviewPhase {
  Active = "ACTIVE",
  Closing = "CLOSING",
}

const mediaStripGalleryItems = allProjectGalleryItems.filter(
  (galleryItem): galleryItem is MediaStripGalleryItem => Boolean(galleryItem.imageSource),
);

function getRandomMediaStripItems(): MediaStripGalleryItem[] {
  const shuffledGalleryItems = [...mediaStripGalleryItems];

  for (let index = shuffledGalleryItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const currentGalleryItem = shuffledGalleryItems[index];
    const swapGalleryItem = shuffledGalleryItems[swapIndex];

    if (!currentGalleryItem || !swapGalleryItem) {
      continue;
    }

    shuffledGalleryItems[index] = swapGalleryItem;
    shuffledGalleryItems[swapIndex] = currentGalleryItem;
  }

  return shuffledGalleryItems.slice(0, Math.min(MEDIA_STRIP_VISIBLE_CARD_COUNT, shuffledGalleryItems.length));
}

function getMediaItemSignature(mediaItems: MediaStripGalleryItem[]): string {
  return mediaItems.map((mediaItem) => mediaItem.id).join("|");
}

function getNextRandomMediaStripItems(currentMediaItems: MediaStripGalleryItem[]): MediaStripGalleryItem[] {
  const currentSignature = getMediaItemSignature(currentMediaItems);

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const nextMediaItems = getRandomMediaStripItems();

    if (getMediaItemSignature(nextMediaItems) !== currentSignature) {
      return nextMediaItems;
    }
  }

  return getRandomMediaStripItems();
}

function getSourceRectWithoutTransientTransform(sourceElement: HTMLElement): DOMRect {
  const originalInlineTransform = sourceElement.style.transform;
  const originalInlineTransition = sourceElement.style.transition;

  sourceElement.style.transition = "none";
  sourceElement.style.transform = "none";
  const sourceRect = sourceElement.getBoundingClientRect();
  sourceElement.style.transform = originalInlineTransform;
  sourceElement.style.transition = originalInlineTransition;

  return sourceRect;
}

function createMediaPreviewGeometry(sourceElement: HTMLElement): MediaPreviewGeometry {
  const sourceRect = getSourceRectWithoutTransientTransform(sourceElement);
  const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
  const horizontalInset = rootFontSize * MEDIA_PREVIEW_HORIZONTAL_INSET_REM;
  const availableWidth = Math.max(rootFontSize * MEDIA_PREVIEW_MIN_WIDTH_REM, window.innerWidth - horizontalInset * 2);
  const availableHeight = Math.max(rootFontSize * 16, window.innerHeight - horizontalInset * 2);
  const preferredTargetWidth = window.innerWidth * 0.4;
  const targetWidth = Math.min(
    Math.max(rootFontSize * MEDIA_PREVIEW_MIN_WIDTH_REM, preferredTargetWidth),
    rootFontSize * MEDIA_PREVIEW_MAX_WIDTH_REM,
    availableWidth,
  );
  const targetHeight = Math.min(window.innerHeight * 0.54, rootFontSize * MEDIA_PREVIEW_MAX_HEIGHT_REM, availableHeight);

  return {
    sourceX: sourceRect.left,
    sourceY: sourceRect.top,
    sourceScaleX: sourceRect.width / targetWidth,
    sourceScaleY: sourceRect.height / targetHeight,
    targetX: (window.innerWidth - targetWidth) / 2,
    targetY: (window.innerHeight - targetHeight) / 2,
    targetWidth,
    targetHeight,
  };
}

function getMediaPreviewStyle(mediaPreviewGeometry: MediaPreviewGeometry): MediaPreviewStyle {
  return {
    "--media-preview-source-x": `${mediaPreviewGeometry.sourceX}px`,
    "--media-preview-source-y": `${mediaPreviewGeometry.sourceY}px`,
    "--media-preview-source-scale-x": String(mediaPreviewGeometry.sourceScaleX),
    "--media-preview-source-scale-y": String(mediaPreviewGeometry.sourceScaleY),
    "--media-preview-target-x": `${mediaPreviewGeometry.targetX}px`,
    "--media-preview-target-y": `${mediaPreviewGeometry.targetY}px`,
    "--media-preview-target-width": `${mediaPreviewGeometry.targetWidth}px`,
    "--media-preview-target-height": `${mediaPreviewGeometry.targetHeight}px`,
  };
}

export function MePage() {
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);
  const [activeMediaCardIndex, setActiveMediaCardIndex] = useState<number | null>(null);
  const [visibleMediaItems, setVisibleMediaItems] = useState<MediaStripGalleryItem[]>(getRandomMediaStripItems);
  const [mediaPreviewPhase, setMediaPreviewPhase] = useState<MediaPreviewPhase>(MediaPreviewPhase.Active);
  const [mediaPreviewGeometry, setMediaPreviewGeometry] = useState<MediaPreviewGeometry | null>(null);
  const mediaPreviewCloseTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const stackToolsRef = useRef<HTMLUListElement>(null);
  const [canScrollStackLeft, setCanScrollStackLeft] = useState(false);
  const [canScrollStackRight, setCanScrollStackRight] = useState(false);
  const [stackHasOverflow, setStackHasOverflow] = useState(false);

  // Stack tools row gets the same pulsating arrows + scroll mechanic as the Visual Gallery.
  useLayoutEffect(() => {
    const toolsList = stackToolsRef.current;

    if (!toolsList) {
      return;
    }

    const updateStackScrollState = () => {
      const maxScrollLeft = toolsList.scrollWidth - toolsList.clientWidth;
      const hasMeasuredOverflow = maxScrollLeft > 1;
      const hasResponsiveOverflow =
        window.matchMedia(STACK_SCROLL_HINT_QUERY).matches &&
        toolsList.children.length > MINIMUM_SCROLLABLE_STACK_TOOL_COUNT;

      setStackHasOverflow(hasMeasuredOverflow || hasResponsiveOverflow);
      setCanScrollStackLeft(toolsList.scrollLeft > 1);
      setCanScrollStackRight(
        hasMeasuredOverflow ? toolsList.scrollLeft < maxScrollLeft - 1 : hasResponsiveOverflow,
      );
    };

    updateStackScrollState();
    const animationFrameId = window.requestAnimationFrame(updateStackScrollState);
    const resizeObserver = new ResizeObserver(updateStackScrollState);

    resizeObserver.observe(toolsList);

    if (toolsList.parentElement) {
      resizeObserver.observe(toolsList.parentElement);
    }

    toolsList.addEventListener("scroll", updateStackScrollState, { passive: true });
    window.addEventListener("resize", updateStackScrollState);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      toolsList.removeEventListener("scroll", updateStackScrollState);
      window.removeEventListener("resize", updateStackScrollState);
    };
  }, []);

  const scrollStackTools = (direction: "left" | "right") => {
    const toolsList = stackToolsRef.current;

    if (!toolsList) {
      return;
    }

    toolsList.scrollBy({
      left: direction === "right" ? toolsList.clientWidth * 0.72 : -toolsList.clientWidth * 0.72,
      behavior: "smooth",
    });
  };
  const testimonialMarqueeRows = [false, true];
  const activeMediaItem = activeMediaCardIndex === null ? null : visibleMediaItems[activeMediaCardIndex] ?? null;
  const activeMediaCardLabel = activeMediaItem?.label ?? mePageContent.mediaPreviewLabel;
  const mediaPreviewStyle = mediaPreviewGeometry === null ? undefined : getMediaPreviewStyle(mediaPreviewGeometry);

  const clearMediaPreviewCloseTimeout = useCallback(() => {
    if (mediaPreviewCloseTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(mediaPreviewCloseTimeoutRef.current);
    mediaPreviewCloseTimeoutRef.current = null;
  }, []);

  const openMediaPreview = (mediaCardIndex: number, sourceElement: HTMLElement) => {
    clearMediaPreviewCloseTimeout();
    setMediaPreviewGeometry(createMediaPreviewGeometry(sourceElement));
    setMediaPreviewPhase(MediaPreviewPhase.Active);
    setActiveMediaCardIndex(mediaCardIndex);
  };

  const shuffleVisibleMediaItems = useCallback(() => {
    setVisibleMediaItems((currentMediaItems) => getNextRandomMediaStripItems(currentMediaItems));
  }, []);

  const closeMediaPreview = useCallback(() => {
    if (activeMediaCardIndex === null || mediaPreviewPhase === MediaPreviewPhase.Closing) {
      return;
    }

    setMediaPreviewPhase(MediaPreviewPhase.Closing);
    mediaPreviewCloseTimeoutRef.current = window.setTimeout(() => {
      setActiveMediaCardIndex(null);
      setMediaPreviewGeometry(null);
      setMediaPreviewPhase(MediaPreviewPhase.Active);
      mediaPreviewCloseTimeoutRef.current = null;
    }, MEDIA_PREVIEW_EXIT_DURATION_MS);
  }, [activeMediaCardIndex, mediaPreviewPhase]);

  const toggleExperienceCard = (experienceId: string) => {
    setOpenExperienceId((currentExperienceId) => (currentExperienceId === experienceId ? null : experienceId));
  };

  useEffect(() => {
    return clearMediaPreviewCloseTimeout;
  }, [clearMediaPreviewCloseTimeout]);

  useEffect(() => {
    if (activeMediaCardIndex !== null || mediaStripGalleryItems.length <= MEDIA_STRIP_VISIBLE_CARD_COUNT) {
      return;
    }

    const reducedMotionMediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    if (reducedMotionMediaQuery.matches) {
      return;
    }

    const shuffleIntervalId = window.setInterval(shuffleVisibleMediaItems, MEDIA_STRIP_SHUFFLE_INTERVAL_MS);

    return () => {
      window.clearInterval(shuffleIntervalId);
    };
  }, [activeMediaCardIndex, shuffleVisibleMediaItems]);

  useEffect(() => {
    if (activeMediaCardIndex === null) {
      return;
    }

    const closeMediaPreviewOnEscape = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) {
        closeMediaPreview();
      }
    };

    window.addEventListener("keydown", closeMediaPreviewOnEscape);

    return () => {
      window.removeEventListener("keydown", closeMediaPreviewOnEscape);
    };
  }, [activeMediaCardIndex, closeMediaPreview]);

  return (
    <PageLayout>
      <main className="me-page">
        <section className="me-page__hero content-container reveal-on-load" aria-labelledby="me-title">
          <h1 className="me-page__headline" id="me-title">
            {mePageContent.headlineSegments.map((segment) => (
              <span className={`me-page__headline-segment me-page__headline-segment--${segment.tone}`} key={segment.text}>
                {segment.text}
              </span>
            ))}
          </h1>
          <div className="me-page__copy">
            {mePageContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="me-page__media-strip" aria-label={mePageContent.mediaStripLabel}>
          <button className="me-page__media-shuffle-button" type="button" onClick={shuffleVisibleMediaItems}>
            {mePageContent.mediaShuffleLabel}
          </button>
          {visibleMediaItems.map((mediaItem, index) => (
            <button
              className="me-page__media-card"
              aria-label={mediaItem.label}
              aria-haspopup="dialog"
              key={`${mediaItem.id}-${index}`}
              type="button"
              data-card-index={index}
              data-preview-hidden={activeMediaCardIndex === index}
              onClick={(event) => openMediaPreview(index, event.currentTarget)}
            >
              <img
                className="me-page__media-card-image"
                src={mediaItem.imageSource}
                alt=""
                aria-hidden="true"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
            </button>
          ))}
        </section>
        {activeMediaCardIndex !== null && mediaPreviewStyle !== undefined ? (
          <div
            className="me-page__media-preview"
            role="dialog"
            aria-label={mePageContent.mediaPreviewLabel}
            aria-modal="true"
            data-phase={mediaPreviewPhase}
            style={mediaPreviewStyle}
          >
            <button
              className="me-page__media-preview-backdrop"
              type="button"
              aria-label={mePageContent.mediaPreviewCloseLabel}
              onClick={closeMediaPreview}
            />
            {/* The preview is separate from the source card so absolute-positioned Figma layout never fights fixed overlay motion. */}
            <div className="me-page__media-preview-card" role="img" aria-label={activeMediaCardLabel}>
              {activeMediaItem ? (
                <img className="me-page__media-preview-image" src={activeMediaItem.imageSource} alt="" aria-hidden="true" />
              ) : null}
            </div>
          </div>
        ) : null}
        <section className="me-page__overview content-container scroll-reveal" aria-labelledby="me-overview-title">
          <h2 className="me-page__section-title" id="me-overview-title">
            {mePageContent.overview.title}
          </h2>
          <div className="me-page__section-copy">
            {mePageContent.overview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="me-page__tags" aria-label={mePageContent.overview.title}>
            {mePageContent.overview.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </section>
        <section className="me-page__stack-showcase scroll-reveal" aria-labelledby="me-stack-title">
          <div className="me-page__stack-inner content-container">
            <div className="me-page__stack-heading">
              <h2 id="me-stack-title">{mePageContent.stackShowcase.title}</h2>
              <p>{mePageContent.stackShowcase.subtitle}</p>
            </div>
            <div
              className="me-page__stack-scroller"
              data-can-scroll-left={canScrollStackLeft}
              data-can-scroll-right={canScrollStackRight}
              data-has-overflow={stackHasOverflow}
            >
              <button
                className="me-page__stack-scroll-button me-page__stack-scroll-button--left"
                type="button"
                aria-label={uiCopy.scrollStackLeftAriaLabel}
                disabled={!canScrollStackLeft}
                onClick={() => scrollStackTools("left")}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <ul className="me-page__stack-tools" aria-label={mePageContent.stackShowcase.title} ref={stackToolsRef}>
                {stackTools.map((tool) => (
                  <li className="me-page__stack-tool interactive-lift" key={tool.name}>
                    <span className="me-page__stack-icon-frame">
                      <img className={tool.iconClassName} src={tool.iconSource} alt={tool.name} />
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="me-page__stack-scroll-button me-page__stack-scroll-button--right"
                type="button"
                aria-label={uiCopy.scrollStackRightAriaLabel}
                disabled={!canScrollStackRight}
                onClick={() => scrollStackTools("right")}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>
          <div className="me-page__project-previews sibling-dim-group" aria-label={mePageContent.stackShowcase.title}>
            {mePageContent.stackShowcase.projectLabels.map((label, index) => (
              <article
                className="me-page__project-preview sibling-dim-card"
                key={`${label}-${index}`}
                data-preview-index={index}
              >
                <div className="me-page__project-preview-media media-mask-hover" aria-hidden="true" />
                <p>{label}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="me-page__experience content-container scroll-reveal" aria-labelledby="me-experience-title">
          <div className="me-page__center-heading">
            <h2 id="me-experience-title">{mePageContent.experience.title}</h2>
            <p>{mePageContent.experience.subtitle}</p>
          </div>
          <div className="me-page__experience-grid">
            {mePageContent.experience.entries.map((entry) => {
              const isExperienceOpen = openExperienceId === entry.id;
              const experienceDescriptionId = `experience-description-${entry.id}`;

              return (
                <article className="me-page__experience-card" data-expanded={isExperienceOpen} key={entry.id}>
                  <button
                    className="me-page__experience-card-header"
                    type="button"
                    aria-expanded={isExperienceOpen}
                    aria-controls={experienceDescriptionId}
                    onClick={() => toggleExperienceCard(entry.id)}
                  >
                    <span className="me-page__experience-card-summary">
                      <span className="me-page__experience-company">{entry.company}</span>
                      <span className="me-page__experience-role">{entry.role}</span>
                      <span className="me-page__experience-period">{entry.period}</span>
                    </span>
                    <span className="me-page__experience-chevron" aria-hidden="true" />
                  </button>
                  <div className="me-page__experience-panel" id={experienceDescriptionId} aria-hidden={!isExperienceOpen}>
                    <p className="me-page__experience-description">{entry.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section className="me-page__creating content-container scroll-reveal" aria-labelledby="me-creating-title">
          <h2 className="me-page__section-title" id="me-creating-title">
            {mePageContent.creating.title}
          </h2>
          <div className="me-page__section-copy">
            {mePageContent.creating.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="me-page__testimonials scroll-reveal" aria-labelledby="me-testimonials-title">
          <div className="me-page__center-heading content-container">
            <h2 id="me-testimonials-title">{mePageContent.testimonials.title}</h2>
          </div>
          <div className="me-page__testimonial-window">
            <div className="me-page__testimonial-track sibling-dim-group">
              {testimonialMarqueeRows.map((isDuplicateRow) => (
                <div className="me-page__testimonial-group" aria-hidden={isDuplicateRow} key={String(isDuplicateRow)}>
                  {mePageContent.testimonials.items.map((testimonial, index) => (
                    <article className="me-page__testimonial-card sibling-dim-card" key={`${testimonial.author}-${index}`}>
                      <span className="me-page__quote-mark" aria-hidden="true">
                        {mePageContent.testimonials.quoteSymbol}
                      </span>
                      <p>{testimonial.quote}</p>
                      <div className="me-page__testimonial-author">
                        <strong>{testimonial.author}</strong>
                        <span>{testimonial.role}</span>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        <ContactSection
          availabilityLabel={profile.contactAvailability}
          title={profile.contactTitle}
          subtitle={profile.contactSubtitle}
          fields={contactFields}
          buttonLabel={profile.contactButtonLabel}
        />
      </main>
    </PageLayout>
  );
}
