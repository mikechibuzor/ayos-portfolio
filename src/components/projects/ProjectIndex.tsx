import type { Project, ProjectCategory, ProjectFilter } from "../../types/site";
import { ProjectGrid } from "./ProjectGrid";
import { WorkFilterBar } from "./WorkFilterBar";
import "./ProjectIndex.css";

type ProjectIndexProps = {
  filters: ProjectFilter[];
  projects: Project[];
  activeCategory: ProjectCategory;
  getProjectCount: (category: ProjectCategory) => number;
  onCategoryChange: (category: ProjectCategory) => void;
  className?: string;
};

export function ProjectIndex({
  filters,
  projects,
  activeCategory,
  getProjectCount,
  onCategoryChange,
  className,
}: ProjectIndexProps) {
  const classNames = ["project-index", className].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      <WorkFilterBar
        filters={filters}
        activeCategory={activeCategory}
        getCount={getProjectCount}
        onCategoryChange={onCategoryChange}
      />
      <ProjectGrid projects={projects} />
    </div>
  );
}
