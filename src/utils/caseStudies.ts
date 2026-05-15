import { caseStudies, caseStudyFallbackCopy } from "../data/caseStudies";
import { CaseStudyMetaIcon, type CaseStudy, type Project } from "../types/site";

export function getCaseStudyForProject(project: Project): CaseStudy {
  const authoredCaseStudy = caseStudies.find((caseStudy) => caseStudy.slug === project.slug);

  if (authoredCaseStudy) {
    return authoredCaseStudy;
  }

  const coverImageDescription = `${caseStudyFallbackCopy.coverImageDescriptionPrefix} ${project.title} ${caseStudyFallbackCopy.coverImageDescriptionSuffix}`;

  return {
    slug: project.slug,
    title: project.title,
    category: project.summaryLabel || caseStudyFallbackCopy.categoryFallback,
    liveHref: project.liveHref,
    coverImageDescription,
    metaItems: [
      { id: "role", icon: CaseStudyMetaIcon.Role, label: caseStudyFallbackCopy.roleLabel },
      { id: "lead-designer", icon: CaseStudyMetaIcon.Lead, label: caseStudyFallbackCopy.leadDesignerLabel },
      { id: "design-team", icon: CaseStudyMetaIcon.Team, label: caseStudyFallbackCopy.teamLabel },
      { id: "year", icon: CaseStudyMetaIcon.Calendar, label: project.year },
    ],
    textSections: [
      {
        id: "context",
        title: caseStudyFallbackCopy.contextTitle,
        paragraphs: [
          {
            text: `${caseStudyFallbackCopy.contextBodyPrefix} ${project.title}, ${caseStudyFallbackCopy.contextBodySuffix}`,
          },
        ],
      },
      {
        id: "challenge",
        title: caseStudyFallbackCopy.challengeTitle,
        paragraphs: [{ text: caseStudyFallbackCopy.challengeBody }],
      },
      {
        id: "discovery",
        title: caseStudyFallbackCopy.discoveryTitle,
        paragraphs: [{ text: caseStudyFallbackCopy.discoveryBody }],
      },
      {
        id: "exploration",
        title: caseStudyFallbackCopy.explorationTitle,
        paragraphs: [{ text: caseStudyFallbackCopy.explorationBody }],
      },
    ],
    impactTitle: caseStudyFallbackCopy.impactTitle,
    impactCards: [
      {
        id: "clarity",
        title: caseStudyFallbackCopy.impactCardOneTitle,
        label: caseStudyFallbackCopy.impactCardLabel,
      },
      {
        id: "patterns",
        title: caseStudyFallbackCopy.impactCardTwoTitle,
        label: caseStudyFallbackCopy.impactCardLabel,
      },
      {
        id: "foundation",
        title: caseStudyFallbackCopy.impactCardThreeTitle,
        label: caseStudyFallbackCopy.impactCardLabel,
      },
    ],
    reflection: {
      id: "reflection",
      title: caseStudyFallbackCopy.reflectionTitle,
      paragraphs: [{ text: caseStudyFallbackCopy.reflectionBody }],
    },
    galleryTitle: caseStudyFallbackCopy.galleryTitle,
    galleryItems: [
      { id: "gallery-one", label: `${project.title} gallery placeholder one` },
      { id: "gallery-two", label: `${project.title} gallery placeholder two` },
      { id: "gallery-three", label: `${project.title} gallery placeholder three` },
      { id: "gallery-four", label: `${project.title} gallery placeholder four` },
    ],
    moreProjectsTitle: caseStudyFallbackCopy.moreProjectsTitle,
  };
}
