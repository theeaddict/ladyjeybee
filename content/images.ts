/**
 * Photo manifest. To change a photo, drop the file into /public/images and set `src` here.
 * Slots with `src: null` show a designed panel (quote or service icon) instead of a photo.
 *
 * Real client photos: caregiver-client, business-portrait, bedside-care.
 * Files named generated-*.jpg are AI-generated stand-ins — replace them with real photos when available.
 */
export type ImageSlot = {
  src: string | null;
  alt: string;
  /** CSS object-position, used to keep faces in frame when cropping. */
  position?: string;
};

const wheelchair = {
  src: "/images/caregiver-client.jpg",
  alt: "A caregiver in blue scrubs kneels and holds the hands of a smiling elderly woman seated in a wheelchair",
};

// The face of the business. Full, uncropped photo.
const teamMember = {
  src: "/images/business-portrait.jpg",
  alt: "The face of Lady Jeybee Aurelia Health & Home Care Services, wearing gloves and seated beside a care bed",
};

const bedside = {
  src: "/images/bedside-care.jpg",
  alt: "A caregiver in blue scrubs standing beside a client resting in bed",
};

export const images = {
  hero: { ...wheelchair, position: "50% 34%" },
  intro: { ...teamMember, position: "50% 30%" },
  aboutStory: { ...teamMember, position: "50% 30%" },
  aboutCare: { ...wheelchair, position: "50% 45%" },
  contact: { ...wheelchair, position: "50% 34%" },
  howItWorks: { ...teamMember, position: "50% 22%" },
  servicesHeader: { ...bedside, position: "50% 55%" },
  cta: {
    src: "/images/generated-cta.jpg",
    alt: "A caregiver in light blue scrubs laughing with an elderly man on the veranda of a coastal home",
    position: "65% 40%",
  },
  elderly: { ...wheelchair, position: "50% 38%" },
  nursing: { ...teamMember, position: "50% 18%" },
  palliative: {
    src: "/images/generated-palliative.jpg",
    alt: "A caregiver sitting beside an elderly woman resting in bed under a colourful blanket",
    position: "45% 40%",
  },
  postOp: {
    src: "/images/generated-post-op.jpg",
    alt: "A caregiver adjusting a cushion for a man resting on a sofa during recovery",
    position: "50% 35%",
  },
  chronic: { ...bedside, position: "50% 60%" },
  childcare: {
    src: "/images/generated-childcare.jpg",
    alt: "A caregiver reading a picture book with a smiling young girl",
    position: "55% 40%",
  },
  wound: {
    src: "/images/generated-wound.jpg",
    alt: "Gloved hands wrapping a clean bandage around a forearm",
    position: "50% 50%",
  },
  hygiene: {
    src: "/images/generated-hygiene.jpg",
    alt: "A caregiver brushing the hair of a smiling elderly woman",
    position: "50% 30%",
  },
  medication: {
    src: "/images/generated-medication.jpg",
    alt: "A caregiver handing a glass of water to an elderly man beside a pill organiser",
    position: "40% 50%",
  },
  mobility: {
    src: "/images/generated-mobility.jpg",
    alt: "A caregiver helping an elderly woman walk with a walking frame",
    position: "50% 30%",
  },
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;

export function hasPhoto(slot: ImageKey): boolean {
  return images[slot].src !== null;
}
