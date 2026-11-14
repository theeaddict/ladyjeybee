import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** Mission / Vision / Promise band, after the first poster's footer strip. */
export function VisionMission() {
  return (
    <section className="vm" aria-label="Our mission, vision and promise">
      <div className="container vm__grid">
        <Reveal className="vm__item">
          <Icon name="target" size={44} className="vm__icon" />
          <div>
            <h2>Our Mission</h2>
            <p>{site.mission}</p>
          </div>
        </Reveal>
        <Reveal className="vm__item" delay={100}>
          <Icon name="eye" size={44} className="vm__icon" />
          <div>
            <h2>Our Vision</h2>
            <p>{site.vision}</p>
          </div>
        </Reveal>
        <Reveal className="vm__item vm__item--promise" delay={200}>
          <Icon name="heart" size={44} className="vm__icon" />
          <div>
            <h2>Our Promise</h2>
            <p>{site.promise}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
