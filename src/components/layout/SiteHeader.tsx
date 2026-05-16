import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header" data-menu-open={isMobileMenuOpen}>
      <nav className="site-header__nav content-container" aria-label={uiCopy.primaryNavigationAriaLabel}>
        <button
          className="site-header__menu-button"
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? uiCopy.mobileMenuCloseAriaLabel : uiCopy.mobileMenuOpenAriaLabel}
          onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <div className="site-header__menu">
          <ul className="site-header__links">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <NavLink className="site-header__link" to={item.href}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="site-header__mobile-socials">
            <SocialLinks links={socialLinks} variant="icon" />
          </div>
        </div>
        <div className="site-header__actions">
          <ThemeToggle />
          <SocialLinks links={socialLinks} variant="icon" />
        </div>
      </nav>
    </header>
  );
}
