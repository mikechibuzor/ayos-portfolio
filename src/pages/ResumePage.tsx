import { PageLayout } from "../components/layout/PageLayout";
import { MoreProjectsCarousel } from "../components/projects/MoreProjectsCarousel";
import { ContactSection } from "../components/sections/ContactSection";
import { pageIntros } from "../data/pageContent";
import { contactFields, profile, resumeEntries } from "../data/profile";
import { projects } from "../data/projects";
import { uiCopy } from "../data/uiCopy";
import "./RoutePage.css";

export function ResumePage() {
  const intro = pageIntros.resume;

  return (
    <PageLayout>
      <main className="resume-page">
        <section className="resume-page__content" aria-labelledby="resume-title">
          <h1 className="visually-hidden" id="resume-title">
            {intro.eyebrow}
          </h1>
          <ol className="resume-page__experience">
            {resumeEntries.map((entry) => (
              <li className="resume-page__entry scroll-reveal" key={`${entry.role}-${entry.company}`}>
                <span className="resume-page__badge">
                  <img className="resume-page__logo" src={entry.logoSource} alt={entry.logoAlt} loading="lazy" />
                </span>
                <span className="resume-page__company">{entry.company}</span>
                <h2 className="resume-page__role">{entry.role}</h2>
                <span className="resume-page__period">{entry.period}</span>
                <p className="resume-page__description">{entry.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <div className="resume-page__more content-container">
          <MoreProjectsCarousel title={uiCopy.moreProjectsTitle} projects={projects} />
        </div>
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
