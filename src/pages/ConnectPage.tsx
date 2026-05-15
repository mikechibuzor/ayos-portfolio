import { ContactSection } from "../components/sections/ContactSection";
import { PageLayout } from "../components/layout/PageLayout";
import { contactFields, profile } from "../data/profile";
import "./ConnectPage.css";

export function ConnectPage() {
  return (
    <PageLayout>
      <main className="connect-page">
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
