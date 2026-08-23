import type { Service } from "@/types";
import { GameImage } from "@/components/ui/game-image";
import { formatVND } from "@/lib/utils";

/** Card for a single "cày thuê" (boosting) service package group. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="surface surface-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9]">
        <GameImage
          src={service.cover}
          alt={service.title}
          className="h-full w-full"
          sizes="(max-width:768px) 100vw, 380px"
        />
        <span
          className={`absolute bottom-3 left-3 rounded-md bg-gradient-to-br ${service.badgeGradient} px-2 py-0.5 text-[11px] font-bold uppercase text-white`}
        >
          {service.game}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold">{service.title}</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="block text-[11px] uppercase text-muted-foreground">Từ</span>
            <span className="font-display text-lg font-bold text-primary">
              {formatVND(service.fromPrice)}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{service.packages} gói</span>
        </div>
      </div>
    </div>
  );
}
