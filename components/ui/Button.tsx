import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline" | "outline-light" | "teal" | "link";
  icon?: IconName;
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "gold", icon, className = "", external }: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`;
  const content = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {variant === "link" && <Icon name="arrowRight" size={16} className="btn__arrow" />}
    </>
  );
  const isNative = external || /^(https?:|tel:|mailto:)/.test(href);
  if (isNative) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
