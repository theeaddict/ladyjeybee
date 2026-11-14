"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site, telHref } from "@/content/site";
import {
  buildEnquiryText,
  contactMethods,
  emptyCareRequest,
  recipientOptions,
  serviceToSupport,
  summaryRows,
  supportOptions,
  todayISO,
  validateStep,
  type CareRequest,
  type Errors,
} from "@/lib/careRequest";
import { trackEvent } from "@/lib/analytics";
import { mailtoUrl, whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { useLenis } from "@/components/layout/SmoothScroll";
import { ChoiceGroup, Field } from "./fields";

const STEPS = [
  { label: "About You", title: "About you", sub: "Tell us who we should get back to." },
  { label: "Who Needs Care", title: "Who needs care?", sub: "Choose the option that fits best." },
  { label: "Support Required", title: "Type of support required", sub: "Select all that apply." },
  { label: "Care Requirements", title: "Care requirements", sub: "A few details help us prepare for our conversation." },
  { label: "Review & Submit", title: "Review your request", sub: "Check your details before submitting." },
] as const;

export function CareRequestWizard() {
  const params = useSearchParams();
  const lenis = useLenis();
  const [step, setStep] = useState(0);
  // Pre-select a support type when arriving from a service page.
  const [data, setData] = useState<CareRequest>(() => {
    const option = serviceToSupport[params.get("service") ?? ""];
    return option ? { ...emptyCareRequest, support: [option] } : emptyCareRequest;
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "preparing" | "ready">("idle");
  const [copied, setCopied] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef("0-idle");

  // Move focus and scroll to the form when the step or result changes (not on first load).
  useEffect(() => {
    const key = `${step}-${status}`;
    if (shown.current === key || status === "preparing") return;
    shown.current = key;
    heading.current?.focus({ preventScroll: true });
    if (root.current) {
      if (lenis) lenis.scrollTo(root.current, { offset: -110 });
      else root.current.scrollIntoView({ block: "start" });
    }
  }, [step, status, lenis]);

  const set = <K extends keyof CareRequest>(key: K, value: CareRequest[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleSupport = (opt: string) => {
    set("support", data.support.includes(opt) ? data.support.filter((s) => s !== opt) : [...data.support, opt]);
  };

  const next = () => {
    const e = validateStep(step, data);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => s + 1);
    else heading.current?.focus();
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const editStep = (i: number) => {
    setErrors({});
    setStep(i);
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (step < STEPS.length - 1) return next();
    // Re-validate everything before preparing the enquiry.
    for (let i = 0; i < STEPS.length - 1; i++) {
      const e = validateStep(i, data);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(i);
        return;
      }
    }
    setStatus("preparing");
    // No backend yet: the enquiry is prepared here and sent by the visitor via WhatsApp or email.
    window.setTimeout(() => {
      setStatus("ready");
      trackEvent("Lead");
    }, 700);
  };

  const enquiry = buildEnquiryText(data);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(enquiry);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const errorList = Object.values(errors).filter(Boolean) as string[];
  const rows = summaryRows(data);

  if (status === "ready") {
    return (
      <div ref={root} className="form-shell form-shell--done">
        <div className="form-body" aria-live="polite">
          <div className="success">
            <span className="success__icon">
              <Icon name="check" size={40} />
            </span>
            <h2 ref={heading} tabIndex={-1} className="form-title">
              Your care request is ready to send
            </h2>
            <p className="form-sub" style={{ maxWidth: 560, marginInline: "auto" }}>
              Thank you, {data.name.split(" ")[0]}. To reach our team, send your request using one of the options
              below. It opens with all your details filled in — just press send.
            </p>
            <div className="success__actions">
              <a className="btn btn--gold" href={whatsappUrl(enquiry)} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} />
                <span>Send via WhatsApp</span>
              </a>
              <a className="btn btn--teal" href={mailtoUrl(`Care request from ${data.name}`, enquiry)}>
                <Icon name="mail" size={18} />
                <span>Send by Email</span>
              </a>
              <button type="button" className="btn btn--outline" onClick={copy}>
                <Icon name={copied ? "check" : "copy"} size={18} />
                <span>{copied ? "Copied" : "Copy Summary"}</span>
              </button>
            </div>
            <p className="notice" style={{ textAlign: "left" }}>
              <Icon name="clock" size={18} />
              <span>
                This website doesn&apos;t send your request automatically. If you prefer, call us on{" "}
                <a href={telHref} style={{ fontWeight: 600, textDecoration: "underline" }}>
                  {site.phone.display}
                </a>
                .
              </span>
            </p>
            <button
              type="button"
              className="review__edit"
              style={{ marginTop: 18 }}
              onClick={() => {
                setStatus("idle");
                setStep(STEPS.length - 1);
              }}
            >
              Go back and edit my request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={root} className="form-shell">
      <aside className="form-steps" aria-label="Form progress">
        <h2>Request Care</h2>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.label} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
              <span className="form-steps__dot">{i < step ? <Icon name="check" size={16} /> : i + 1}</span>
              <span className="form-steps__label">{s.label}</span>
            </li>
          ))}
        </ol>
        <div className="form-steps__help">
          Prefer to talk to someone?
          <a href={telHref}>
            <Icon name="phone" size={18} /> {site.phone.display}
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> Chat on WhatsApp
          </a>
        </div>
      </aside>

      <form className="form-body" onSubmit={onSubmit} noValidate>
        <div className="form-progress" aria-hidden="true">
          <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
        <p className="form-step-label">
          Step {step + 1} of {STEPS.length}
        </p>
        <h2 ref={heading} tabIndex={-1} className="form-title">
          {STEPS[step].title}
        </h2>
        <p className="form-sub">{STEPS[step].sub}</p>

        <div aria-live="assertive">
          {errorList.length > 0 && (
            <div className="error-summary" role="alert">
              Please check the following:
              <ul>
                {errorList.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div key={step} className="step-enter">
          {step === 0 && (
            <div className="field-grid">
              <Field id="name" label="Full name" required error={errors.name} full>
                {(p) => (
                  <input {...p} className="input" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />
                )}
              </Field>
              <Field id="phone" label="Phone number" required error={errors.phone} hint="We'll use this to get back to you.">
                {(p) => (
                  <input
                    {...p}
                    className="input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="07XX XXX XXX"
                    value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                )}
              </Field>
              <Field id="email" label="Email address" error={errors.email}>
                {(p) => (
                  <input
                    {...p}
                    className="input"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                )}
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="field-grid">
              <ChoiceGroup
                name="recipient"
                legend="The person who needs care is"
                type="radio"
                options={recipientOptions}
                value={data.recipient}
                onChange={(v) => set("recipient", v)}
                error={errors.recipient}
              />
              {data.recipient === "Other" && (
                <Field id="recipientOther" label="Please describe" required error={errors.recipientOther} full>
                  {(p) => (
                    <input {...p} className="input" value={data.recipientOther} onChange={(e) => set("recipientOther", e.target.value)} />
                  )}
                </Field>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="field-grid">
              <ChoiceGroup
                name="support"
                legend="Support needed"
                type="checkbox"
                options={supportOptions}
                value={data.support}
                onChange={toggleSupport}
                error={errors.support}
              />
              {data.support.includes("Other") && (
                <Field id="supportOther" label="Other support" required error={errors.supportOther} full>
                  {(p) => (
                    <input {...p} className="input" value={data.supportOther} onChange={(e) => set("supportOther", e.target.value)} />
                  )}
                </Field>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="field-grid">
              <Field
                id="description"
                label="Brief description of the support needed"
                required
                error={errors.description}
                full
                hint="A few sentences is enough. Please don't include medical records or detailed medical history."
              >
                {(p) => (
                  <textarea
                    {...p}
                    className="input"
                    maxLength={800}
                    value={data.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                )}
              </Field>
              <Field id="location" label="Preferred care location" required error={errors.location} hint="Town or area, e.g. Diani.">
                {(p) => (
                  <input {...p} className="input" autoComplete="address-level2" value={data.location} onChange={(e) => set("location", e.target.value)} />
                )}
              </Field>
              <Field id="startDate" label="Preferred start date" error={errors.startDate}>
                {(p) => (
                  <input
                    {...p}
                    className="input"
                    type="date"
                    min={todayISO()}
                    value={data.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                  />
                )}
              </Field>
              <ChoiceGroup
                name="contactMethod"
                legend="Preferred contact method"
                type="radio"
                options={contactMethods}
                value={data.contactMethod}
                onChange={(v) => set("contactMethod", v)}
                error={errors.contactMethod}
              />
            </div>
          )}

          {step === 4 && (
            <div className="review">
              {(
                [
                  ["About you", rows.about, 0],
                  ["Who needs care", rows.recipient, 1],
                  ["Support required", rows.support, 2],
                  ["Care requirements", rows.requirements, 3],
                ] as const
              ).map(([title, items, target]) => (
                <section key={title} className="review__section">
                  <div className="review__head">
                    <h3>{title}</h3>
                    <button type="button" className="review__edit" onClick={() => editStep(target)}>
                      Edit<span className="sr-only"> {title}</span>
                    </button>
                  </div>
                  <dl>
                    {items.map(([k, v]) => (
                      <div key={k} style={{ display: "contents" }}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
              <p className="notice">
                <Icon name="shield" size={18} />
                <span>
                  When you submit, we&apos;ll prepare your request so you can send it to us on WhatsApp or by email.
                  Your details are not stored on this website.
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="form-nav">
          {step > 0 ? (
            <button type="button" className="btn btn--outline" onClick={back}>
              <Icon name="arrowLeft" size={18} />
              <span>Back</span>
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button type="submit" className="btn btn--teal">
              <span>Continue</span>
              <Icon name="arrowRight" size={18} />
            </button>
          ) : (
            <button type="submit" className="btn btn--gold" disabled={status === "preparing"} aria-busy={status === "preparing"}>
              {status === "preparing" ? <span className="spinner" aria-hidden="true" /> : <Icon name="check" size={18} />}
              <span>{status === "preparing" ? "Preparing…" : "Submit Request"}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
