import { useParams } from "react-router-dom";
import { CaseStudyDetail } from "../components/case-study/CaseStudyDetail";
import { PageLayout } from "../components/layout/PageLayout";
import { projects } from "../data/projects";
import { uiCopy } from "../data/uiCopy";
import { getCaseStudyForProject } from "../utils/caseStudies";
import { getProjectBySlug } from "../utils/projects";
import "./ProjectDetailPage.css";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(projects, slug);

  if (!project || project.isCaseStudyLocked) {
    return (
      <PageLayout>
        <main className="project-detail-page">
          <section className="project-detail-page__content content-container">
            <div className="project-detail-page__not-found">
              <h1>{uiCopy.projectNotFoundTitle}</h1>
              <p>{uiCopy.projectNotFoundDescription}</p>
            </div>
          </section>
        </main>
      </PageLayout>
    );
  }

  const caseStudy = getCaseStudyForProject(project);
  const relatedProjects = projects.filter((candidateProject) => candidateProject.slug !== project.slug).slice(0, 4);

  return (
    <PageLayout>
      <CaseStudyDetail caseStudy={caseStudy} relatedProjects={relatedProjects} />
    </PageLayout>
  );
}
