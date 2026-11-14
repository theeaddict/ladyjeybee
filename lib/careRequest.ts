import { isBlank, isEmail, isPhone } from "./validation";

export const recipientOptions = ["Elderly person", "Adult", "Child", "Post-operative patient", "Other"] as const;

export const supportOptions = [
  "Elderly care",
  "Home-based nursing support",
  "Palliative care",
  "Post-operative support",
  "Personal care",
  "Wound dressing",
  "Childcare",
  "Medication reminders",
  "Mobility assistance",
  "Other",
] as const;

export const contactMethods = ["Phone call", "WhatsApp", "Email"] as const;

/** Maps a service page slug to the matching support option, for ?service= pre-selection. */
export const serviceToSupport: Record<string, (typeof supportOptions)[number]> = {
  "elderly-care": "Elderly care",
  "home-nursing-support": "Home-based nursing support",
  "palliative-care": "Palliative care",
  "post-operative-care": "Post-operative support",
  "chronic-illness-care": "Home-based nursing support",
  childcare: "Childcare",
  "wound-dressing": "Wound dressing",
  "personal-hygiene": "Personal care",
  "medication-reminders": "Medication reminders",
  "mobility-companionship": "Mobility assistance",
};

export type CareRequest = {
  name: string;
  phone: string;
  email: string;
  recipient: string;
  recipientOther: string;
  support: string[];
  supportOther: string;
  description: string;
  location: string;
  startDate: string;
  contactMethod: string;
};

export const emptyCareRequest: CareRequest = {
  name: "",
  phone: "",
  email: "",
  recipient: "",
  recipientOther: "",
  support: [],
  supportOther: "",
  description: "",
  location: "",
  startDate: "",
  contactMethod: "",
};

export type Errors = Partial<Record<keyof CareRequest, string>>;

export function validateStep(step: number, d: CareRequest): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (isBlank(d.name)) e.name = "Enter your full name.";
    if (isBlank(d.phone)) e.phone = "Enter a phone number so we can reach you.";
    else if (!isPhone(d.phone)) e.phone = "Enter a valid phone number, for example 07XX XXX XXX or +254 7XX XXX XXX.";
    if (!isBlank(d.email) && !isEmail(d.email)) e.email = "Enter a valid email address, for example name@example.com.";
  }
  if (step === 1) {
    if (!d.recipient) e.recipient = "Choose who needs care.";
    else if (d.recipient === "Other" && isBlank(d.recipientOther)) e.recipientOther = "Tell us briefly who needs care.";
  }
  if (step === 2) {
    if (d.support.length === 0) e.support = "Choose at least one type of support.";
    else if (d.support.includes("Other") && isBlank(d.supportOther)) e.supportOther = "Describe the other support you need.";
  }
  if (step === 3) {
    if (d.description.trim().length < 10) e.description = "Add a short description of the support needed (at least 10 characters).";
    if (isBlank(d.location)) e.location = "Enter where care is needed, for example Diani or Kwale.";
    if (!d.contactMethod) e.contactMethod = "Choose how you would like us to contact you.";
    else if (d.contactMethod === "Email" && isBlank(d.email))
      e.contactMethod = "You chose email — add your email address in step 1, or pick another method.";
    if (d.startDate && d.startDate < todayISO()) e.startDate = "Choose today or a future date.";
  }
  return e;
}

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "Flexible";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });
}

export function summaryRows(d: CareRequest) {
  return {
    about: [
      ["Full name", d.name],
      ["Phone", d.phone],
      ["Email", d.email || "Not provided"],
    ],
    recipient: [["Who needs care", d.recipient === "Other" ? `Other — ${d.recipientOther}` : d.recipient]],
    support: [
      [
        "Support required",
        d.support.map((s) => (s === "Other" ? `Other — ${d.supportOther}` : s)).join(", "),
      ],
    ],
    requirements: [
      ["Description", d.description],
      ["Care location", d.location],
      ["Preferred start", formatDate(d.startDate)],
      ["Contact method", d.contactMethod],
    ],
  } as const;
}

/** Plain-text enquiry used for WhatsApp, email and copy-to-clipboard. */
export function buildEnquiryText(d: CareRequest): string {
  const rows = summaryRows(d);
  const lines = [
    "Care Request — Lady Jeybee Aurelia Health & Home Care Services",
    "",
    ...[...rows.about, ...rows.recipient, ...rows.support, ...rows.requirements].map(([k, v]) => `${k}: ${v}`),
  ];
  return lines.join("\n");
}
