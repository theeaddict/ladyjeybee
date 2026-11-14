import Link from "next/link";
import { hasPhoto } from "@/content/images";
import type { Service } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const photo = hasPhoto(service.image);
  return (
    <article className="service-card">
      <Link href={`/services/${service.slug}`} className="service-card__link">
        <div className={`service-card__media ${photo ? "" : "service-card__media--icon"}`}>
          {photo ? (
            <Photo slot={service.image} sizes="(max-width: 640px) 80vw, (max-width: 1100px) 40vw, 300px" />
          ) : (
            <span className="service-card__big-icon">
              <Icon name={service.icon} size={52} />
            </span>
          )}
          {index !== undefined && <span className="service-card__num">{String(index + 1).padStart(2, "0")}</span>}
        </div>
        <div className="service-card__body">
          <h3 className="service-card__title">
            {photo && (
              <span className="service-card__icon">
                <Icon name={service.icon} size={26} />
              </span>
            )}
            <span>{service.title}</span>
          </h3>
          <p className="service-card__text">{service.summary}</p>
          <span className="service-card__more">
            Learn more <Icon name="arrowRight" size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
