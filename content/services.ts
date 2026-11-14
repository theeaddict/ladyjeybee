import type { ImageKey } from "./images";
import type { IconName } from "@/components/ui/Icon";

/**
 * Service content. Wording stays close to what the client has confirmed:
 * no clinical procedures, credentials or promises beyond the brief.
 */
export type Service = {
  slug: string;
  title: string;
  /** Short title for compact UI such as the icon strip and form options. */
  shortTitle: string;
  summary: string;
  intro: string;
  involves: string[];
  whoBenefits: string[];
  related: string[];
  image: ImageKey;
  icon: IconName;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "elderly-care",
    title: "Elderly Care & Personal Care",
    shortTitle: "Elderly & Personal Care",
    summary:
      "Support for older individuals who need assistance with daily activities, comfort and companionship.",
    intro:
      "We support older individuals who need help with daily activities, so they can stay comfortable in their own homes, with dignity and companionship.",
    involves: [
      "Assistance with daily activities",
      "Personal care, given with patience and respect",
      "Comfort and companionship",
    ],
    whoBenefits: [
      "Older adults who need help with daily activities",
      "Older people who would value regular companionship",
      "Families looking for support for an elderly relative",
    ],
    related: ["personal-hygiene", "mobility-companionship", "medication-reminders"],
    image: "elderly",
    icon: "elderly",
    seoDescription:
      "Elderly care at home in Diani, Ukunda and Kwale County — assistance with daily activities, personal care, comfort and companionship.",
  },
  {
    slug: "home-nursing-support",
    title: "Home-Based Nursing Support",
    shortTitle: "Home Nursing Support",
    summary:
      "Home-based nursing support according to the client's needs and our available professional capabilities.",
    intro:
      "We provide home-based nursing support according to each client's needs and our available professional capabilities.",
    involves: [
      "Nursing support provided at home",
      "Support matched to the client's needs",
      "Care within our available professional capabilities",
    ],
    whoBenefits: [
      "Individuals who need nursing support at home",
      "Families who prefer their loved one to receive support at home",
    ],
    related: ["wound-dressing", "medication-reminders", "chronic-illness-care"],
    image: "nursing",
    icon: "nurse",
    seoDescription:
      "Home-based nursing support in Ukunda and Diani, Kwale County, according to each client's needs.",
  },
  {
    slug: "palliative-care",
    title: "Palliative & End-of-Life Care",
    shortTitle: "Palliative Care",
    summary: "Compassionate support focused on comfort, dignity and quality of life.",
    intro:
      "We offer compassionate support for people living with serious illness and at the end of life, focused on comfort, dignity and quality of life.",
    involves: [
      "Support focused on comfort",
      "Care that protects the person's dignity",
      "Attention to quality of life",
      "Compassionate companionship",
    ],
    whoBenefits: [
      "Individuals receiving palliative or end-of-life care at home",
      "Families who wish their loved one to be cared for at home",
    ],
    related: ["chronic-illness-care", "personal-hygiene", "elderly-care"],
    image: "palliative",
    icon: "heartHand",
    seoDescription:
      "Palliative and end-of-life care at home in Kwale County, focused on comfort, dignity and quality of life.",
  },
  {
    slug: "post-operative-care",
    title: "Post-Operative Care & Recovery",
    shortTitle: "Post-Operative Care",
    summary: "Support for individuals recovering after surgical procedures.",
    intro: "We support individuals at home while they recover after surgical procedures.",
    involves: [
      "Support at home during recovery after surgery",
      "Help with daily activities while recovering",
      "Personal care and companionship",
    ],
    whoBenefits: [
      "Individuals returning home after surgery",
      "Families who need help caring for a loved one during recovery",
    ],
    related: ["wound-dressing", "mobility-companionship", "medication-reminders"],
    image: "postOp",
    icon: "bed",
    seoDescription:
      "Post-operative home care in Kwale, Diani and Ukunda — support at home while recovering after surgery.",
  },
  {
    slug: "chronic-illness-care",
    title: "Care for Sick & Chronically Ill Individuals",
    shortTitle: "Chronic Illness Care",
    summary: "Personalised home-based support for individuals who require ongoing assistance.",
    intro:
      "We provide personalised, home-based support for people who are sick or living with a long-term illness and need ongoing assistance.",
    involves: [
      "Ongoing support at home",
      "Assistance personalised to the individual",
      "Help with everyday needs",
    ],
    whoBenefits: [
      "Individuals living with a long-term illness",
      "People who are unwell and need assistance at home",
    ],
    related: ["home-nursing-support", "medication-reminders", "palliative-care"],
    image: "chronic",
    icon: "heartbeat",
    seoDescription:
      "Personalised home-based care for sick and chronically ill individuals in Diani, Ukunda and Kwale County.",
  },
  {
    slug: "childcare",
    title: "Childcare & Children's Support",
    shortTitle: "Childcare",
    summary: "Care and support for children according to their individual needs.",
    intro: "We provide care and support for children according to each child's individual needs.",
    involves: [
      "Care for children at home",
      "Support according to each child's individual needs",
    ],
    whoBenefits: [
      "Parents and guardians who need care for a child",
      "Families with a child who needs extra support",
    ],
    related: ["chronic-illness-care", "personal-hygiene", "mobility-companionship"],
    image: "childcare",
    icon: "child",
    seoDescription:
      "Childcare and children's support at home in Diani and Ukunda, Kwale County, according to each child's needs.",
  },
  {
    slug: "wound-dressing",
    title: "Wound Dressing & Basic Nursing Procedures",
    shortTitle: "Wound Dressing",
    summary: "Wound dressing and basic nursing support within our professional scope.",
    intro: "We provide wound dressing and basic nursing support at home, within our professional scope.",
    involves: [
      "Wound dressing within our professional scope",
      "Basic nursing procedures within our professional scope",
    ],
    whoBenefits: [
      "Individuals who need wound dressing at home",
      "Clients recovering after surgery",
    ],
    related: ["post-operative-care", "home-nursing-support", "chronic-illness-care"],
    image: "wound",
    icon: "bandage",
    seoDescription:
      "Wound dressing and basic nursing support at home in Kwale County, within our professional scope.",
  },
  {
    slug: "personal-hygiene",
    title: "Personal Hygiene, Bathing & Grooming",
    shortTitle: "Hygiene & Grooming",
    summary: "Assistance with personal hygiene and everyday grooming.",
    intro: "We assist with personal hygiene, bathing and everyday grooming, with respect for privacy and dignity.",
    involves: [
      "Assistance with personal hygiene",
      "Help with bathing",
      "Everyday grooming",
      "Respect for privacy and dignity",
    ],
    whoBenefits: [
      "People who need help with personal care",
      "Individuals with limited mobility",
      "Clients recovering from illness or surgery",
    ],
    related: ["elderly-care", "mobility-companionship", "palliative-care"],
    image: "hygiene",
    icon: "shower",
    seoDescription:
      "Personal hygiene, bathing and grooming support at home in Diani, Ukunda and Kwale County.",
  },
  {
    slug: "medication-reminders",
    title: "Medication Reminders & Monitoring",
    shortTitle: "Medication Reminders",
    summary: "Support with medication reminders and monitoring.",
    intro: "We support clients with medication reminders and monitoring.",
    involves: ["Medication reminders", "Medication monitoring support"],
    whoBenefits: [
      "People who need help remembering their medication",
      "Individuals with a long-term illness",
    ],
    related: ["chronic-illness-care", "elderly-care", "home-nursing-support"],
    image: "medication",
    icon: "pill",
    seoDescription:
      "Medication reminders and monitoring support at home in Kwale County, Diani and Ukunda.",
  },
  {
    slug: "mobility-companionship",
    title: "Feeding, Mobility, Companionship & Vital Signs Monitoring",
    shortTitle: "Mobility & Companionship",
    summary:
      "Assistance with everyday needs, mobility, companionship and monitoring vital signs.",
    intro:
      "We assist with everyday needs — feeding, moving around and companionship — and with monitoring vital signs.",
    involves: [
      "Assistance with feeding",
      "Mobility assistance",
      "Companionship",
      "Vital signs monitoring",
    ],
    whoBenefits: [
      "People who need help with meals or moving around",
      "Individuals who would value companionship at home",
    ],
    related: ["elderly-care", "personal-hygiene", "post-operative-care"],
    image: "mobility",
    icon: "walker",
    seoDescription:
      "Feeding, mobility assistance, companionship and vital signs monitoring at home in Diani, Ukunda and Kwale County.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
