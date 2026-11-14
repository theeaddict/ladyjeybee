import Image from "next/image";
import { images, type ImageKey } from "@/content/images";
import { LogoMark } from "./Logo";
import { Parallax } from "./Parallax";

type PhotoProps = {
  slot: ImageKey;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Parallax strength passed to SmoothScroll (e.g. 0.08). */
  parallax?: number;
};

/** Fills its (positioned) parent. Falls back to a branded tonal placeholder. */
export function Photo({ slot, sizes, className = "", priority, parallax }: PhotoProps) {
  const img = images[slot];
  if (!img.src) {
    return (
      <div className={`photo photo--empty ${className}`} role="img" aria-label={img.alt}>
        <LogoMark size={56} />
      </div>
    );
  }
  const image = (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectPosition: img.position ?? "50% 50%" }}
    />
  );
  return <div className={`photo ${className}`}>{parallax ? <Parallax speed={parallax}>{image}</Parallax> : image}</div>;
}
