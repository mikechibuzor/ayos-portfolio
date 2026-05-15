import { ProjectCategory, type Project } from "../types/site";

export function getProjectsByCategory(projects: Project[], activeCategory: ProjectCategory): Project[] {
  if (activeCategory === ProjectCategory.All) {
    return projects;
  }

  return projects.filter((project) => project.categories.includes(activeCategory));
}

export function getProjectCountByCategory(projects: Project[], category: ProjectCategory): number {
  if (category === ProjectCategory.All) {
    return projects.length;
  }

  return projects.filter((project) => project.categories.includes(category)).length;
}

export function getProjectBySlug(projects: Project[], slug: string | undefined): Project | undefined {
  if (!slug) {
    return undefined;
  }

  return projects.find((project) => project.slug === slug);
}
