import { Link } from "react-router-dom";
import type { Project } from "../../types/site";
import { uiCopy } from "../../data/uiCopy";
import { isExternalHref } from "../../utils/links";
import arrowRightUpIcon from "../../assets/icons/actions/arrow-right-up.svg";
import lockIcon from "../../assets/icons/actions/lock.svg";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

type ProjectActionLinkProps = {
  href: string;
  label: string;
  className?: string;
};

type LockedProjectActionProps = {
  label: string;
  ariaLabel: string;
};

function ProjectActionLink({ href, label, className = "" }: ProjectActionLinkProps) {
  const actionClassName = `project-card__action-link${className ? ` ${className}` : ""}`;
  const content = (
    <>
      <span>{label}</span>
      <span className="project-card__arrow-icon" aria-hidden="true">
        <img src={arrowRightUpIcon} alt="" />
      </span>
    </>
  );

  if (isExternalHref(href)) {
    return (
      <a className={actionClassName} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={actionClassName} to={href}>
      {content}
    </Link>
  );
}

function LockedProjectAction({ label, ariaLabel }: LockedProjectActionProps) {
  return (
    <span className="project-card__locked" aria-disabled="true" aria-label={ariaLabel}>
      <span>{label}</span>
      <span className="project-card__lock-icon" aria-hidden="true">
        <img src={lockIcon} alt="" />
      </span>
    </span>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const canOpenCaseStudy = Boolean(project.caseStudyHref) && !project.isCaseStudyLocked;

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
            {canOpenCaseStudy && project.caseStudyHref ? (
              <ProjectActionLink href={project.caseStudyHref} label={uiCopy.caseStudyLabel} />
            ) : (
              <LockedProjectAction label={uiCopy.caseStudyLabel} ariaLabel={uiCopy.caseStudyLockedAriaLabel} />
            )}
          </div>
          {project.liveHref ? (
            <ProjectActionLink
              className="project-card__action-link--live"
              href={project.liveHref}
              label={uiCopy.liveWebsiteLabel}
            />
          ) : (
            <LockedProjectAction label={uiCopy.liveWebsiteLabel} ariaLabel={uiCopy.liveWebsiteLockedAriaLabel} />
          )}
        </div>
      </div>
    </article>
  );
}
