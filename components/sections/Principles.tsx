import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const principles: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Compassionate Care", text: "Care given with kindness." },
  { icon: "users", title: "Personalised Support", text: "Shaped around each client." },
  { icon: "shield", title: "Dignity & Respect", text: "For every client we serve." },
  { icon: "award", title: "Professional Service", text: "Reliable home-based care." },
];

/** Floating strip that overlaps the hero, as in the posters. */
export function Principles() {
  return (
    <section className="principles" aria-label="Our care principles">
      <div className="container">
        <Reveal as="ul" className="principles__strip">
          {principles.map((p) => (
            <li key={p.title} className="principle">
              <span className="principle__icon">
                <Icon name={p.icon} size={26} />
              </span>
              <span>
                <span className="principle__title">{p.title}</span>
                <span className="principle__text">{p.text}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
