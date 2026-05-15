import { useMemo, useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { ProjectIndex } from "../components/projects/ProjectIndex";
import { ContactSection } from "../components/sections/ContactSection";
import { pageIntros } from "../data/pageContent";
import { contactFields, profile } from "../data/profile";
import { projectFilters, projects } from "../data/projects";
import { uiCopy } from "../data/uiCopy";
import { ProjectCategory } from "../types/site";
import { getProjectCountByCategory, getProjectsByCategory } from "../utils/projects";
import "./WorksPage.css";

export function WorksPage() {
  const intro = pageIntros.works;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.All);

  // The route keeps its own filter state so the home page and works page remain independent.
  const visibleProjects = useMemo(() => getProjectsByCategory(projects, activeCategory), [activeCategory]);
  const getProjectCount = (category: ProjectCategory) => getProjectCountByCategory(projects, category);

  return (
    <PageLayout>
      <main className="works-page">
        <section className="works-page__hero content-container reveal-on-load" aria-labelledby="works-title">
          <h1 id="works-title">{intro.title}</h1>
          <p>{intro.description}</p>
        </section>
        <section className="works-page__projects content-container scroll-reveal" aria-labelledby="works-projects-title">
          <h2 className="visually-hidden" id="works-projects-title">
            {uiCopy.workSectionTitle}
          </h2>
          <ProjectIndex
            className="works-page__project-index"
            filters={projectFilters}
            projects={visibleProjects}
            activeCategory={activeCategory}
            getProjectCount={getProjectCount}
            onCategoryChange={setActiveCategory}
          />
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
