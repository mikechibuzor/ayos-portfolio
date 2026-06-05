import type { SocialLink } from "../../types/site";
import { uiCopy } from "../../data/uiCopy";
import "./SocialLinks.css";

type SocialLinksProps = {
  links: SocialLink[];
  variant?: "plain" | "icon" | "framed";
};

export function SocialLinks({ links, variant = "plain" }: SocialLinksProps) {
  const shouldUseIconAssets = variant !== "plain";

  return (
    <ul className={`social-links social-links--${variant}`} aria-label={uiCopy.socialLinksAriaLabel}>
      {links.map((link) => (
        <li key={link.label}>
          <a className="social-links__item interactive-lift" href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
            {shouldUseIconAssets && link.iconSource ? (
              <span className="social-links__icon-frame">
                <img className={`social-links__icon ${link.iconClassName ?? ""}`} src={link.iconSource} alt="" aria-hidden="true" />
              </span>
            ) : (
              link.shortLabel
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
