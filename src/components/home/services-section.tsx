import Link from "next/link";
import { ArrowRight, Clock3, Gamepad2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

const services = [
  { icon: "⚔️", title: "Cày level Blox Fruits", description: "Lên level và hoàn thành nhiệm vụ theo mốc bạn chọn.", meta: "Theo tiến độ", tone: "from-violet-500/25 to-fuchsia-500/5" },
  { icon: "🐉", title: "Race V4 & Fighting Style", description: "Hỗ trợ mở tộc, nâng gear và kỹ năng chiến đấu.", meta: "Có kiểm tra", tone: "from-cyan-500/25 to-blue-500/5" },
  { icon: "🌱", title: "Grow a Garden", description: "Hỗ trợ phát triển vườn, seed và pet theo yêu cầu.", meta: "Nhiều gói", tone: "from-lime-500/20 to-emerald-500/5" },
  { icon: "🐾", title: "Adopt Me!", description: "Hỗ trợ nhiệm vụ, pet và các mục tiêu trong game.", meta: "Linh hoạt", tone: "from-amber-500/20 to-orange-500/5" },
];

export function ServicesSection() {
  return (
    <section className="container-page">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300"><Gamepad2 className="h-4 w-4" /> Dịch vụ Roblox</p>
          <h2 className="font-display text-2xl font-black uppercase sm:text-4xl">Cần hỗ trợ? Đã có team lo</h2>
          <p className="mt-2 text-sm text-muted-foreground">Chọn mục tiêu, theo dõi tiến độ và nhận hỗ trợ khi cần.</p>
        </div>
        <ButtonLink href="/service" variant="outline" className="w-fit rounded-xl">Xem tất cả dịch vụ <ArrowRight className="h-4 w-4" /></ButtonLink>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link key={service.title} href="/service" className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${service.tone} p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/40`}>
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/15 text-2xl transition-transform group-hover:scale-110">{service.icon}</span>
              <Sparkles className="h-4 w-4 text-white/20 transition group-hover:text-cyan-300" />
            </div>
            <h3 className="mt-5 font-bold text-white">{service.title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{service.description}</p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-violet-200"><Clock3 className="h-3.5 w-3.5" /> {service.meta}</span>
              <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> Chỉ cung cấp thông tin đăng nhập trong luồng đặt dịch vụ bảo mật. Hãy đổi mật khẩu sau khi hoàn tất.</span>
        <span className="flex shrink-0 items-center gap-1.5 font-semibold text-violet-200"><Zap className="h-3.5 w-3.5" /> Hỗ trợ 24/7</span>
      </div>
    </section>
  );
}
