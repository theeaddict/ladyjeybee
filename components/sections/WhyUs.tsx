import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "A compassionate approach", text: "Care given with compassion, kindness and patience." },
  { icon: "users", title: "Individual attention", text: "Support arranged around each client's needs and circumstances." },
  { icon: "shield", title: "Respect for every client", text: "Every client is treated with dignity and respect." },
  { icon: "home", title: "The comfort of home", text: "Care received in familiar surroundings, close to loved ones." },
  { icon: "heartHand", title: "Support for families", text: "Help for families caring for someone they love." },
  { icon: "award", title: "Committed to dignified care", text: "Care is not just a job to us — it is a calling." },
];

export function WhyUs() {
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="container why__grid">
        <Reveal className="why__intro">
          <p className="eyebrow eyebrow--light">Why Families Choose Us</p>
          <h2 id="why-title" className="display display--light">
            Care is not just a job, <em>but a calling.</em>
          </h2>
          <span className="gold-rule" aria-hidden="true" />
          <p>
            Choosing someone to care for a loved one is a big decision. Our care is built on compassion, dignity,
            comfort and respect, and the support we provide is discussed and agreed with each family.
          </p>
          <p className="why__sign">— {site.fullName}</p>
        </Reveal>
        <ul className="why__list">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} className="why__item" delay={i * 70}>
              <span className="why__icon">
                <Icon name={r.icon} size={24} />
              </span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
