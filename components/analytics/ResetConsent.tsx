"use client";

import { CONSENT_KEY } from "@/lib/analytics";

/** Clears the stored cookie choice so the consent notice appears again. */
export function ResetConsent() {
  return (
    <button
      type="button"
      className="btn btn--outline"
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_KEY);
        } catch {
          // Storage blocked; nothing stored to clear.
        }
        window.location.reload();
      }}
    >
      Change my cookie choice
    </button>
  );
}
