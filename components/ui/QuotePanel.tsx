import { site } from "@/content/site";
import { LogoMark } from "./Logo";

/** Shown in place of a photo until the client supplies one. */
export function QuotePanel({ text = site.tagline }: { text?: string }) {
  return (
    <div className="quote-panel">
      <span className="quote-panel__mark" aria-hidden="true">
        &ldquo;
      </span>
      <p className="quote-panel__text">{text}</p>
      <span className="quote-panel__sign">
        <LogoMark size={44} />
        <span>{site.fullName}</span>
      </span>
    </div>
  );
}
