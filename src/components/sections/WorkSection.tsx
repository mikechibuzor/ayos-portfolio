import type { Project, ProjectCategory, ProjectFilter } from "../../types/site";
import { uiCopy } from "../../data/uiCopy";
import { ProjectIndex } from "../projects/ProjectIndex";
import "./WorkSection.css";

type WorkSectionProps = {
  filters: ProjectFilter[];
  projects: Project[];
  activeCategory: ProjectCategory;
  getProjectCount: (category: ProjectCategory) => number;
  onCategoryChange: (category: ProjectCategory) => void;
};

export function WorkSection({
  filters,
  projects,
  activeCategory,
  getProjectCount,
  onCategoryChange,
}: WorkSectionProps) {
  return (
    <section className="work-section section-block scroll-reveal" id="works" aria-labelledby="work-title">
      <div className="content-container">
        <h2 className="visually-hidden" id="work-title">
          {uiCopy.workSectionTitle}
        </h2>
        <ProjectIndex
          className="work-section__content"
          filters={filters}
          projects={projects}
          activeCategory={activeCategory}
          getProjectCount={getProjectCount}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </section>
  );
}
