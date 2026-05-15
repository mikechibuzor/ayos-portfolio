import { PageLayout } from "../components/layout/PageLayout";
import { pageIntros } from "../data/pageContent";
import { resumeEntries } from "../data/profile";
import "./RoutePage.css";

export function ResumePage() {
  const intro = pageIntros.resume;

  return (
    <PageLayout>
      <main className="route-page">
        <section className="route-page__content content-container" aria-labelledby="resume-title">
          <div className="route-page__intro">
            <p className="route-page__eyebrow">{intro.eyebrow}</p>
            <h1 id="resume-title">{intro.title}</h1>
            <p>{intro.description}</p>
          </div>
          <div className="route-page__resume-list">
            {resumeEntries.map((entry) => (
              <article className="route-page__resume-entry" key={`${entry.role}-${entry.company}`}>
                <span>{entry.period}</span>
                <h2>
                  {entry.role} · {entry.company}
                </h2>
                <p>{entry.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
