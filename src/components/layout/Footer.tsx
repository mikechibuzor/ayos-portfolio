import type { SocialLink } from "../../types/site";
import { SocialLinks } from "../navigation/SocialLinks";
import "./Footer.css";

type FooterProps = {
  title: string;
  subtitle: string;
  credit: string;
  year: string;
  socialLinks: SocialLink[];
};

export function Footer({ title, subtitle, credit, year, socialLinks }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner content-container">
        <div className="site-footer__cta">
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <SocialLinks links={socialLinks} variant="framed" />
        </div>
        <div className="site-footer__meta">
          <span>{credit}</span>
          <span>{year}</span>
        </div>
      </div>
    </footer>
  );
}
