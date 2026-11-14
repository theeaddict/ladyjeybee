import Link from "next/link";
import { telHref } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

/** Sticky contact actions shown on small screens only. */
export function MobileActionBar() {
  return (
    <div className="action-bar" role="region" aria-label="Quick contact">
      <a href={telHref}>
        <Icon name="phone" size={18} />
        <span>Call</span>
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
        <Icon name="whatsapp" size={18} />
        <span>WhatsApp</span>
      </a>
      <Link href="/request-care" className="action-bar__primary">
        <Icon name="calendar" size={18} />
        <span>Request Care</span>
      </Link>
    </div>
  );
}
