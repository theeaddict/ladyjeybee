import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: "phone", title: "Contact Us", text: "Families get in touch and explain the type of care they need." },
  { icon: "users", title: "Discuss Your Needs", text: "We learn about the client's requirements and circumstances." },
  { icon: "calendar", title: "Plan the Support", text: "Suitable care arrangements are discussed and agreed upon." },
  { icon: "heart", title: "Begin Care", text: "Care begins according to the agreed arrangements and availability." },
];

export function Steps({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="section steps" aria-labelledby={showHeading ? "steps-title" : undefined} aria-label={showHeading ? undefined : "Steps"}>
      <div className="container">
        {showHeading && (
          <SectionHeading
            title={<span id="steps-title">How It Works</span>}
            intro="Arranging care is simple. Here is what happens after you reach out."
          />
        )}
        <ol className="steps__list">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="step" delay={i * 90}>
              <span className="step__badge">
                <Icon name={s.icon} size={26} />
                <span className="step__num">{i + 1}</span>
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="center">
          <Button href="/request-care" icon="calendar">
            Request Care
          </Button>
        </div>
      </div>
    </section>
  );
}
