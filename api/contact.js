import { Resend } from "resend";

const MAX_FIELD_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESPONSE_COPY = {
  methodNotAllowed: "Only POST requests are supported.",
  notConfigured: "Contact form is not configured yet.",
  missingFields: "Please fill in your name, email, and message.",
  invalidEmail: "Please enter a valid email address.",
  success: "Message sent.",
  failure: "Could not send your message. Please try again.",
};
const EMAIL_COPY = {
  subjectPrefix: "Portfolio enquiry from",
  title: "New portfolio enquiry",
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message",
};

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
}

function sanitizeText(value) {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml({ fullName, email, message }) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111;">
      <h2>${EMAIL_COPY.title}</h2>
      <p><strong>${EMAIL_COPY.nameLabel}:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>${EMAIL_COPY.emailLabel}:</strong> ${escapeHtml(email)}</p>
      <p><strong>${EMAIL_COPY.messageLabel}:</strong></p>
      <div style="white-space: pre-wrap;">${escapeHtml(message)}</div>
    </div>
  `;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { message: RESPONSE_COPY.methodNotAllowed });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    sendJson(response, 500, { message: RESPONSE_COPY.notConfigured });
    return;
  }

  const body = typeof request.body === "object" && request.body !== null ? request.body : {};
  const fullName = sanitizeText(body.fullName);
  const email = sanitizeText(body.email);
  const message = sanitizeText(body.message);

  if (!fullName || !email || !message) {
    sendJson(response, 400, { message: RESPONSE_COPY.missingFields });
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    sendJson(response, 400, { message: RESPONSE_COPY.invalidEmail });
    return;
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `${EMAIL_COPY.subjectPrefix} ${fullName}`,
      html: buildEmailHtml({ fullName, email, message }),
      text: `${EMAIL_COPY.title}\n\n${EMAIL_COPY.nameLabel}: ${fullName}\n${EMAIL_COPY.emailLabel}: ${email}\n\n${message}`,
    });

    sendJson(response, 200, { message: RESPONSE_COPY.success });
  } catch (error) {
    console.error("Contact form email failed", error);
    sendJson(response, 500, { message: RESPONSE_COPY.failure });
  }
}
