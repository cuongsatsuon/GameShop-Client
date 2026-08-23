import Image from "next/image";
import { cn } from "@/lib/utils";

interface GameImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Fill image with a brand-tinted placeholder background, so the layout looks
 * intentional even before/if the remote placeholder image loads.
 */
export function GameImage({ src, alt, className, sizes, priority }: GameImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-brand-soft", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 50vw, 320px"}
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
