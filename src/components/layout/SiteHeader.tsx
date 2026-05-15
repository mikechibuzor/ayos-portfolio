import { NavLink } from "react-router-dom";
import type { NavigationItem, SocialLink } from "../../types/site";
import { uiCopy } from "../../data/uiCopy";
import { SocialLinks } from "../navigation/SocialLinks";
import { ThemeToggle } from "../navigation/ThemeToggle";
import "./SiteHeader.css";

type SiteHeaderProps = {
  navigationItems: NavigationItem[];
  socialLinks: SocialLink[];
};

export function SiteHeader({ navigationItems, socialLinks }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <nav className="site-header__nav content-container" aria-label={uiCopy.primaryNavigationAriaLabel}>
        <ul className="site-header__links">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <NavLink className="site-header__link" to={item.href}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ThemeToggle />
        <SocialLinks links={socialLinks} variant="icon" />
      </nav>
    </header>
  );
}
