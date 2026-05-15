import { useMemo, useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { ContactSection } from "../components/sections/ContactSection";
import { IntroHero } from "../components/sections/IntroHero";
import { StackSection } from "../components/sections/StackSection";
import { WorkSection } from "../components/sections/WorkSection";
import { contactFields, profile } from "../data/profile";
import { projectFilters, projects } from "../data/projects";
import { stackTools } from "../data/stacks";
import { ProjectCategory } from "../types/site";
import { getProjectCountByCategory, getProjectsByCategory } from "../utils/projects";

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(ProjectCategory.All);

  // The page owns filter state because both the filter bar and project grid depend on it.
  const visibleProjects = useMemo(() => getProjectsByCategory(projects, activeCategory), [activeCategory]);

  const getProjectCount = (category: ProjectCategory) => getProjectCountByCategory(projects, category);

  return (
    <PageLayout>
      <main>
        <IntroHero title={profile.heroTitle} subtitle={profile.heroSubtitle} />
        <WorkSection
          filters={projectFilters}
          projects={visibleProjects}
          activeCategory={activeCategory}
          getProjectCount={getProjectCount}
          onCategoryChange={setActiveCategory}
        />
        <StackSection title={profile.stacksTitle} subtitle={profile.stacksSubtitle} tools={stackTools} />
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
