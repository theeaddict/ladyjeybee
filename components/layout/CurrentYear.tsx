"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Shows the current year from the visitor's clock, so the footer stays correct
 * even if the site is served as static files that are never rebuilt.
 * `fallback` (the year when the page was generated) is used for the initial HTML.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return <>{year}</>;
}
