import type { ProjectCategory, ProjectFilter } from "../../types/site";
import { uiCopy } from "../../data/uiCopy";
import "./WorkFilterBar.css";

type WorkFilterBarProps = {
  filters: ProjectFilter[];
  activeCategory: ProjectCategory;
  getCount: (category: ProjectCategory) => number;
  onCategoryChange: (category: ProjectCategory) => void;
};

export function WorkFilterBar({ filters, activeCategory, getCount, onCategoryChange }: WorkFilterBarProps) {
  return (
    <div className="work-filter-bar" aria-label={uiCopy.filterProjectsAriaLabel}>
      {filters.map((filter) => {
        const isActive = filter.category === activeCategory;
        const filterCount = filter.displayCount ?? getCount(filter.category);

        return (
          <button
            className="work-filter-bar__button"
            type="button"
            aria-pressed={isActive}
            data-active={isActive}
            key={filter.category}
            onClick={() => onCategoryChange(filter.category)}
          >
            <span>{filter.label}</span>
            <span className="work-filter-bar__count">{filterCount}</span>
          </button>
        );
      })}
    </div>
  );
}
