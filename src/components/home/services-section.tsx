import Link from "next/link";
import { ArrowRight, Clock3, Gamepad2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { fetchServices } from "@/data/remote";
import { formatVND } from "@/lib/utils";

const TONES = [
  "from-violet-500/25 to-fuchsia-500/5",
  "from-cyan-500/25 to-blue-500/5",
  "from-lime-500/20 to-emerald-500/5",
  "from-amber-500/20 to-orange-500/5",
];
const ICONS = ["⚔️", "🐉", "🌱", "🐾", "🔥", "⭐"];

export async function ServicesSection() {
  const services = await fetchServices(4);
  if (services.length === 0) return null; // no real services → hide the section

  return (
    <section className="container-page">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            <Gamepad2 className="h-4 w-4" /> Dịch vụ Roblox
          </p>
          <h2 className="font-display text-2xl font-black uppercase sm:text-4xl">Cần hỗ trợ? Đã có team lo</h2>
          <p className="mt-2 text-sm text-muted-foreground">Chọn mục tiêu, theo dõi tiến độ và nhận hỗ trợ khi cần.</p>
        </div>
        <ButtonLink href="/service" variant="outline" className="w-fit rounded-xl">
          Xem tất cả dịch vụ <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Link
            key={service.id}
            href="/service"
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${TONES[i % TONES.length]} p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/40`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/15 text-2xl transition-transform group-hover:scale-110">
                {ICONS[i % ICONS.length]}
              </span>
              <Sparkles className="h-4 w-4 text-white/20 transition group-hover:text-cyan-300" />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-violet-200">{service.game}</p>
            <h3 className="mt-1 font-bold text-white">{service.name}</h3>
            <p className="mt-2 min-h-12 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {service.note || `${service.packages} gói dịch vụ`}
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              {service.priceFrom > 0 ? (
                <span className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Từ</span>
                  <span className="font-display text-base font-bold text-primary">{formatVND(service.priceFrom)}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 font-semibold text-violet-200">
                  <Clock3 className="h-3.5 w-3.5" /> Liên hệ
                </span>
              )}
              <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> Chỉ cung cấp thông tin đăng nhập trong luồng đặt dịch vụ bảo mật. Hãy đổi mật khẩu sau khi hoàn tất.
        </span>
        <span className="flex shrink-0 items-center gap-1.5 font-semibold text-violet-200">
          <Zap className="h-3.5 w-3.5" /> Hỗ trợ 24/7
        </span>
      </div>
    </section>
  );
}
