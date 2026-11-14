import { site } from "./site";

/**
 * Search phrases families use when looking for home care on Kenya's South Coast.
 * Used in page metadata; the same terms also appear naturally in page copy and the FAQ.
 */
export const keywords = [
  "home care Diani",
  "home care services Diani",
  "home care Ukunda",
  "home care Kwale County",
  "home based care Diani",
  "home nursing Diani",
  "home nursing Ukunda",
  "nurse at home Diani",
  "caregiver Diani",
  "caregiver Ukunda",
  "elderly care Diani",
  "elderly care Kwale County",
  "care for the elderly at home Kenya",
  "palliative care at home Kwale",
  "end of life care at home Diani",
  "post-operative care at home Ukunda",
  "wound dressing at home Diani",
  "childcare Diani",
  "home care South Coast Kenya",
  "Lady Jeybee Aurelia",
];

export type Faq = { question: string; answer: string };

/**
 * Plain question-and-answer content for families, search engines and AI assistants.
 * Answers only state what the organisation has confirmed — no prices, coverage or credentials.
 */
export const faqs: Faq[] = [
  {
    question: "What home-care services does Lady Jeybee Aurelia provide?",
    answer:
      "We provide elderly and personal care, home-based nursing support, palliative and end-of-life care, post-operative care and recovery, care for sick and chronically ill individuals, childcare, wound dressing and basic nursing procedures, personal hygiene and grooming, medication reminders and monitoring, and help with feeding, mobility, companionship and vital signs monitoring.",
  },
  {
    question: "Where is Lady Jeybee Aurelia based?",
    answer: `We are based in ${site.location.full}, on Kenya's South Coast. Care is provided in clients' own homes — contact us to confirm availability in your area.`,
  },
  {
    question: "How do I request home care?",
    answer: `Fill in the Request Care form on this website, message us on WhatsApp, or call ${site.phone.display}. We will discuss the care your loved one needs, agree suitable arrangements with you, and then begin care according to those arrangements and our availability.`,
  },
  {
    question: "Do you provide nursing care at home?",
    answer:
      "Yes. We provide home-based nursing support according to each client's needs and our available professional capabilities, including wound dressing and basic nursing procedures within our professional scope.",
  },
  {
    question: "Can you care for someone at home after surgery?",
    answer:
      "Yes. Our post-operative care supports individuals at home while they recover after surgical procedures, including help with daily activities and personal care.",
  },
  {
    question: "Do you offer palliative and end-of-life care at home?",
    answer:
      "Yes. We offer compassionate palliative and end-of-life support at home, focused on comfort, dignity and quality of life.",
  },
  {
    question: "Do you look after children?",
    answer: "Yes. We provide care and support for children according to each child's individual needs.",
  },
  {
    question: "How much does home care cost?",
    answer:
      "The cost depends on the type of support needed and the care arrangements agreed. Contact us and we will discuss your loved one's needs with you.",
  },
];
