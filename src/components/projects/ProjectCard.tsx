import { Link } from "react-router-dom";
import type { Project } from "../../types/site";
import { uiCopy } from "../../data/uiCopy";
import arrowRightUpIcon from "../../assets/icons/actions/arrow-right-up.svg";
import lockIcon from "../../assets/icons/actions/lock.svg";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const caseStudyIconSource = project.isCaseStudyLocked ? lockIcon : arrowRightUpIcon;
  const caseStudyIconClassName = project.isCaseStudyLocked ? "project-card__lock-icon" : "project-card__arrow-icon";

  return (
    <article className="project-card">
      <div className="project-card__media" role="img" aria-label={project.imageDescription}>
        {project.imageSource ? <img className="project-card__image" src={project.imageSource} alt="" aria-hidden="true" /> : null}
      </div>
      <div className="project-card__body">
        <div className="project-card__heading">
          <h3>{project.title}</h3>
          <span>{project.year}</span>
        </div>
        <ul className="project-card__tags" aria-label={`${project.title} ${uiCopy.projectCategoriesAriaLabelSuffix}`}>
          {project.categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__actions">
          <div className="project-card__primary-action">
            {project.caseStudyHref ? (
              <Link className="project-card__action-link" to={project.caseStudyHref}>
                <span>{uiCopy.caseStudyLabel}</span>
                <span className={caseStudyIconClassName} aria-hidden="true">
                  <img src={caseStudyIconSource} alt="" />
                </span>
              </Link>
            ) : (
              <span className="project-card__locked" aria-label={uiCopy.caseStudyLockedAriaLabel}>
                <span>{uiCopy.caseStudyLabel}</span>
                <span className="project-card__lock-icon" aria-hidden="true">
                  <img src={lockIcon} alt="" />
                </span>
              </span>
            )}
          </div>
          {project.liveHref ? (
            <a className="project-card__action-link project-card__action-link--live" href={project.liveHref}>
              <span>{uiCopy.liveWebsiteLabel}</span>
              <span className="project-card__arrow-icon" aria-hidden="true">
                <img src={arrowRightUpIcon} alt="" />
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
