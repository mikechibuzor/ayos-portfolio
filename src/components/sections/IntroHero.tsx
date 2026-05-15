import "./IntroHero.css";

type IntroHeroProps = {
  title: string;
  subtitle: string;
};

export function IntroHero({ title, subtitle }: IntroHeroProps) {
  return (
    <section className="intro-hero section-block" id="home" aria-labelledby="intro-title">
      <div className="intro-hero__inner content-container">
        <h1 className="intro-hero__title reveal-on-load" id="intro-title">
          {title}
        </h1>
        <p className="intro-hero__subtitle reveal-on-load reveal-delay-1">{subtitle}</p>
      </div>
    </section>
  );
}
