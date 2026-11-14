import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
};

/** Poster-style heading: gold rules either side of an italic serif title. */
export function SectionHeading({ eyebrow, title, intro, align = "center", tone = "dark", as: H = "h2" }: SectionHeadingProps) {
  return (
    <Reveal className={`section-heading section-heading--${align} section-heading--${tone}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H className="section-heading__title">
        {align === "center" && <span className="rule" aria-hidden="true" />}
        <span>{title}</span>
        {align === "center" && <span className="rule" aria-hidden="true" />}
      </H>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </Reveal>
  );
}
