"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { isBlank, isEmail, isPhone } from "@/lib/validation";
import { mailtoUrl, whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { Field } from "./fields";

type Data = { name: string; phone: string; email: string; message: string };
type Errors = Partial<Record<keyof Data, string>>;

const empty: Data = { name: "", phone: "", email: "", message: "" };

function validate(d: Data): Errors {
  const e: Errors = {};
  if (isBlank(d.name)) e.name = "Enter your name.";
  if (isBlank(d.phone) && isBlank(d.email)) e.phone = "Enter a phone number or an email address so we can reply.";
  if (!isBlank(d.phone) && !isPhone(d.phone)) e.phone = "Enter a valid phone number.";
  if (!isBlank(d.email) && !isEmail(d.email)) e.email = "Enter a valid email address.";
  if (d.message.trim().length < 5) e.message = "Enter your message.";
  return e;
}

/** Contact enquiry. There is no backend, so the message is handed to WhatsApp or email. */
export function ContactForm() {
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);

  const set = (key: keyof Data, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    setReady(false);
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    const valid = Object.keys(e).length === 0;
    setReady(valid);
    if (valid) trackEvent("Lead");
  };

  const text = [
    "Enquiry — Lady Jeybee Aurelia Health & Home Care Services",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Email: ${data.email || "Not provided"}`,
    "",
    data.message,
  ].join("\n");

  return (
    <form className="panel" onSubmit={onSubmit} noValidate>
      <h2 style={{ fontSize: "1.8rem", marginBottom: 6 }}>Send us a message</h2>
      <p className="form-sub">We&apos;ll get back to you as soon as we can.</p>
      <div className="field-grid">
        <Field id="c-name" label="Your name" required error={errors.name} full>
          {(p) => <input {...p} className="input" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />}
        </Field>
        <Field id="c-phone" label="Phone number" error={errors.phone}>
          {(p) => (
            <input {...p} className="input" type="tel" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
          )}
        </Field>
        <Field id="c-email" label="Email address" error={errors.email}>
          {(p) => (
            <input {...p} className="input" type="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
          )}
        </Field>
        <Field id="c-message" label="Message" required error={errors.message} full hint="Please don't include medical records.">
          {(p) => <textarea {...p} className="input" maxLength={1000} value={data.message} onChange={(e) => set("message", e.target.value)} />}
        </Field>
      </div>

      {ready ? (
        <div className="step-enter" aria-live="polite" style={{ marginTop: 24 }}>
          <p className="notice" style={{ marginTop: 0 }}>
            <Icon name="check" size={18} />
            <span>Your message is ready. Choose how to send it — it opens with your message filled in.</span>
          </p>
          <div className="success__actions" style={{ justifyContent: "flex-start" }}>
            <a className="btn btn--gold" href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              <span>Send via WhatsApp</span>
            </a>
            <a className="btn btn--teal" href={mailtoUrl(`Enquiry from ${data.name}`, text)}>
              <Icon name="mail" size={18} />
              <span>Send by Email</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="form-nav" style={{ justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn--teal">
            <span>Prepare Message</span>
            <Icon name="arrowRight" size={18} />
          </button>
        </div>
      )}
    </form>
  );
}
