import Image from "next/image";
import { ArrowRight, CheckCircle2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

const trustTags = ["Account kiểm tra thủ công", "Bàn giao nhanh", "Hỗ trợ 24/7"];

export function HeroSection() {
  return (
    <section className="container-page pt-5 sm:pt-7">
      <div className="relative min-h-[580px] overflow-hidden rounded-[2rem] border border-violet-400/20 bg-[#170b3d] shadow-[0_30px_100px_-45px_rgba(124,58,237,.9)] sm:min-h-[540px] lg:min-h-[590px]">
        <Image src="/images/home/roblox-hero.png" alt="Những nhân vật khối vuông vui nhộn đang khám phá thế giới đảo bay" fill priority sizes="(max-width: 1280px) 100vw, 1240px" className="object-cover object-[67%_center] sm:object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,7,53,.98)_0%,rgba(18,7,53,.88)_34%,rgba(18,7,53,.3)_62%,rgba(18,7,53,.05)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,7,53,.86)_0%,transparent_40%)] sm:bg-none" />
        <div className="relative z-10 flex min-h-[580px] max-w-2xl flex-col justify-end px-5 py-8 sm:min-h-[540px] sm:justify-center sm:px-10 lg:min-h-[590px] lg:px-14">
          <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur"><Sparkles className="h-3.5 w-3.5" /> Thế giới account Roblox</div>
          <h1 className="max-w-xl font-display text-4xl font-black uppercase leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">Chọn account.<span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">Bật mood chơi.</span></h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-violet-100/80 sm:text-base">Tìm account theo game, level và ngân sách. Thông tin rõ ràng, được kiểm tra trước khi đăng và có đội ngũ hỗ trợ khi bạn cần.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/category/roblox" variant="gradient" size="lg" className="rounded-xl">Khám phá account <ArrowRight className="h-4 w-4" /></ButtonLink>
            <ButtonLink href="#chon-theo-game" variant="outline" size="lg" className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"><Search className="h-4 w-4" /> Chọn theo game</ButtonLink>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-violet-100/75">
            {trustTags.map((tag) => <span key={tag} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-lime-300" /> {tag}</span>)}
          </div>
          <p className="mt-5 flex max-w-lg items-start gap-2 rounded-xl border border-white/10 bg-black/15 px-3 py-2.5 text-[11px] leading-5 text-violet-100/65 backdrop-blur"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />Nếu bạn dưới 16 tuổi, hãy trao đổi với cha mẹ hoặc người giám hộ trước khi mua.</p>
        </div>
      </div>
    </section>
  );
}
