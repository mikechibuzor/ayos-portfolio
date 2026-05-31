import { useMemo, useState, type CSSProperties } from "react";
import type { HomeAudienceId, HomeAudienceIntro } from "../../types/site";
import "./IntroHero.css";

type IntroHeroProps = {
  audienceIntros: HomeAudienceIntro[];
  audienceLabel: string;
  locationStartLabel: string;
  locationEndLabel: string;
};

export function IntroHero({ audienceIntros, audienceLabel, locationStartLabel, locationEndLabel }: IntroHeroProps) {
  const [activeAudienceId, setActiveAudienceId] = useState<HomeAudienceId>(audienceIntros[0]?.id ?? "everyone");
  const activeAudienceIntro = useMemo(
    () => audienceIntros.find((intro) => intro.id === activeAudienceId) ?? audienceIntros[0],
    [activeAudienceId, audienceIntros],
  );

  if (!activeAudienceIntro) {
    return null;
  }

  return (
    <section className="intro-hero section-block" id="home" aria-labelledby="intro-title">
      <div className="intro-hero__inner">
        <div className="intro-hero__audience-tabs reveal-on-load" aria-label={audienceLabel}>
          {audienceIntros.map((intro) => {
            const isActive = intro.id === activeAudienceId;

            return (
              <button
                className="intro-hero__audience-button"
                type="button"
                aria-pressed={isActive}
                data-active={isActive}
                key={intro.id}
                onClick={() => setActiveAudienceId(intro.id)}
              >
                {intro.label}
              </button>
            );
          })}
        </div>
        {/* Keying by audience id remounts the heading on each tab click so the per-word cascade replays. */}
        <h1
          className="intro-hero__title"
          id="intro-title"
          key={activeAudienceIntro.id}
          aria-label={activeAudienceIntro.title}
        >
          {activeAudienceIntro.title.split(" ").map((word, index) => (
            <span
              className="intro-hero__title-word"
              style={{ "--word-index": index } as CSSProperties}
              key={`${word}-${index}`}
              aria-hidden="true"
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
      <span className="intro-hero__location intro-hero__location--start" aria-hidden="true">
        {locationStartLabel}
      </span>
      <span className="intro-hero__location intro-hero__location--end" aria-hidden="true">
        {locationEndLabel}
      </span>
    </section>
  );
}
