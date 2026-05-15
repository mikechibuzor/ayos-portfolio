import type { ContactField } from "../../types/site";
import "./ContactSection.css";

type ContactSectionProps = {
  availabilityLabel: string;
  title: string;
  subtitle: string;
  fields: ContactField[];
  buttonLabel: string;
};

export function ContactSection({ availabilityLabel, title, subtitle, fields, buttonLabel }: ContactSectionProps) {
  return (
    <section className="contact-section section-block scroll-reveal" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__inner content-container">
        <div className="contact-section__content">
          <div className="contact-section__heading">
            <span className="contact-section__badge">{availabilityLabel}</span>
            <h2 id="contact-title">{title}</h2>
            <p>{subtitle}</p>
          </div>
          <form className="contact-section__form">
            {fields.map((field) => (
              <label className="contact-section__field" htmlFor={field.id} key={field.id}>
                <span className="visually-hidden">{field.label}</span>
                {field.inputType === "textarea" ? (
                  <textarea id={field.id} name={field.id} placeholder={field.label} rows={4} />
                ) : (
                  <input id={field.id} name={field.id} placeholder={field.label} type={field.inputType} />
                )}
              </label>
            ))}
            <button className="contact-section__button" type="button">
              {buttonLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
