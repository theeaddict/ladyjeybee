export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Accepts Kenyan local (07xx / 01xx) and international (+2547xx) style numbers. */
export function isPhone(value: string): boolean {
  const digits = value.replace(/[\s()-]/g, "");
  return /^\+?\d{9,15}$/.test(digits);
}

export function isBlank(value: string): boolean {
  return value.trim().length === 0;
}
