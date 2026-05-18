import { type FormEvent, useState } from "react";
import type { ContactField } from "../../types/site";
import { uiCopy } from "../../data/uiCopy";
import "./ContactSection.css";

type ContactSectionProps = {
  availabilityLabel: string;
  title: string;
  subtitle: string;
  fields: ContactField[];
  buttonLabel: string;
};

type ContactFormStatus = "IDLE" | "SENDING" | "SUCCESS" | "ERROR";

type ContactFormState = {
  fullName: string;
  email: string;
  message: string;
};

const initialFormState: ContactFormState = {
  fullName: "",
  email: "",
  message: "",
};

function isContactFieldId(fieldId: string): fieldId is keyof ContactFormState {
  return fieldId === "fullName" || fieldId === "email" || fieldId === "message";
}

export function ContactSection({ availabilityLabel, title, subtitle, fields, buttonLabel }: ContactSectionProps) {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [formStatus, setFormStatus] = useState<ContactFormStatus>("IDLE");
  const [statusMessage, setStatusMessage] = useState("");
  const isSending = formStatus === "SENDING";
  const isModalOpen = formStatus === "SUCCESS" || formStatus === "ERROR";

  const updateField = (fieldId: string, value: string) => {
    if (!isContactFieldId(fieldId)) {
      return;
    }

    setFormState((currentFormState) => ({
      ...currentFormState,
      [fieldId]: value,
    }));
  };

  const closeStatusModal = () => {
    setFormStatus("IDLE");
    setStatusMessage("");
  };

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("SENDING");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? uiCopy.contactErrorMessage);
      }

      setFormState(initialFormState);
      setFormStatus("SUCCESS");
      setStatusMessage(uiCopy.contactSuccessMessage);
    } catch (error) {
      setFormStatus("ERROR");
      setStatusMessage(error instanceof Error ? error.message : uiCopy.contactErrorMessage);
    }
  };

  return (
    <section className="contact-section section-block scroll-reveal" id="contact" aria-labelledby="contact-title">
      <div className="contact-section__inner content-container">
        <div className="contact-section__content">
          <div className="contact-section__heading">
            <span className="contact-section__badge">{availabilityLabel}</span>
            <h2 id="contact-title">{title}</h2>
            <p>{subtitle}</p>
          </div>
          <form className="contact-section__form" onSubmit={submitContactForm}>
            {fields.map((field) => (
              <label className="contact-section__field" htmlFor={field.id} key={field.id}>
                <span className="visually-hidden">{field.label}</span>
                {field.inputType === "textarea" ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    placeholder={field.label}
                    rows={4}
                    required
                    value={isContactFieldId(field.id) ? formState[field.id] : ""}
                    onChange={(event) => updateField(field.id, event.target.value)}
                  />
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    placeholder={field.label}
                    type={field.inputType}
                    required
                    value={isContactFieldId(field.id) ? formState[field.id] : ""}
                    onChange={(event) => updateField(field.id, event.target.value)}
                  />
                )}
              </label>
            ))}
            <button className="contact-section__button" type="submit" disabled={isSending}>
              {isSending ? uiCopy.contactSendingLabel : buttonLabel}
            </button>
          </form>
        </div>
      </div>
      {isModalOpen ? (
        <div className="contact-section__modal-backdrop" role="presentation">
          <div
            className="contact-section__modal"
            data-status={formStatus}
            role="alertdialog"
            aria-modal="true"
            aria-label={uiCopy.contactModalAriaLabel}
          >
            <span className="contact-section__modal-orb" aria-hidden="true" />
            <h3>{formStatus === "SUCCESS" ? uiCopy.contactSuccessTitle : uiCopy.contactErrorTitle}</h3>
            <p>{statusMessage}</p>
            <button className="contact-section__modal-button" type="button" onClick={closeStatusModal}>
              {uiCopy.contactModalCloseLabel}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
