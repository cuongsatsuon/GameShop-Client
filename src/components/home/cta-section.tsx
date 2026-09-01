import { ArrowRight, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container-page">
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-violet-600/25 via-card to-cyan-500/10 px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-300"><ShieldCheck className="h-6 w-6" /></span>
          <h2 className="mt-5 font-display text-3xl font-black uppercase sm:text-5xl">Sẵn sàng vào game?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Chọn account phù hợp, đọc kỹ thông tin và nhờ người lớn hỗ trợ nếu bạn chưa đủ 16 tuổi.</p>
          <ButtonLink href="/category/roblox" variant="gradient" size="lg" className="mt-7 rounded-xl">Xem account Roblox <ArrowRight className="h-4 w-4" /></ButtonLink>
        </div>
      </div>
    </section>
  );
}
