import type { SocialLink } from "../../types/site";
import { SocialLinks } from "../navigation/SocialLinks";
import "./Footer.css";

type FooterProps = {
  title: string;
  subtitle: string;
  credit: string;
  creditName: string;
  creditLinkedInHref: string;
  creditEmail: string;
  year: string;
  socialLinks: SocialLink[];
};

export function Footer({ title, subtitle, credit, creditName, creditLinkedInHref, creditEmail, year, socialLinks }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner content-container">
        <div className="site-footer__cta">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <SocialLinks links={socialLinks} variant="framed" />
        </div>
        <div className="site-footer__meta">
          <span className="site-footer__credit">
            <span>{credit}</span>
            {" "}
            <span className="site-footer__credit-cluster">
              <a className="site-footer__credit-name" href={creditLinkedInHref} target="_blank" rel="noreferrer">
                {creditName}
              </a>
              <span className="site-footer__credit-actions" aria-label={`${creditName} contact links`}>
                <a
                  className="site-footer__credit-action"
                  href={creditLinkedInHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${creditName} on LinkedIn`}
                  data-icon="in"
                />
                <a className="site-footer__credit-action" href={`mailto:${creditEmail}`} aria-label={`Email ${creditName}`} data-icon="@" />
              </span>
            </span>
          </span>
          <span>{year}</span>
        </div>
      </div>
    </footer>
  );
}
