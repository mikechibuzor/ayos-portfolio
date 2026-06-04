import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { SiteHeader } from "./SiteHeader";
import { navigationItems, profile, socialLinks } from "../../data/profile";

type PageLayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
};

export function PageLayout({ children, showHeader = true, showFooter = true }: PageLayoutProps) {
  return (
    <div className="page-shell">
      {showHeader ? <SiteHeader navigationItems={navigationItems} socialLinks={socialLinks} /> : null}
      {children}
      {showFooter ? (
        <Footer
          title={profile.footerTitle}
          subtitle={profile.footerSubtitle}
          credit={profile.footerCredit}
          creditName={profile.footerCreditName}
          creditLinkedInHref={profile.footerCreditLinkedInHref}
          creditEmail={profile.footerCreditEmail}
          year={profile.footerYear}
          socialLinks={socialLinks}
        />
      ) : null}
    </div>
  );
}
