import Link from "next/link";
import { ArrowRight, BadgeCheck, Gamepad2, Headphones, KeyRound, SearchCheck, Sparkles } from "lucide-react";

const worlds = [
  { icon: "🍇", title: "Blox Fruits", note: "Level cao · Fruit xịn", tone: "from-violet-500/30 to-fuchsia-500/10", href: "/category/roblox?game=blox-fruits" },
  { icon: "🏡", title: "Grow a Garden", note: "Pet hiếm · Vườn đẹp", tone: "from-lime-500/25 to-emerald-500/10", href: "/category/roblox?game=grow-a-garden" },
  { icon: "🐾", title: "Adopt Me!", note: "Pet xịn · Đồ sưu tầm", tone: "from-cyan-500/25 to-blue-500/10", href: "/category/roblox?game=adopt-me" },
  { icon: "⚔️", title: "Anime Games", note: "Đội hình mạnh · Nhiều gem", tone: "from-amber-500/25 to-orange-500/10", href: "/category/roblox?game=anime" },
];

const steps = [
  { icon: SearchCheck, number: "01", title: "Chọn account", text: "Lọc theo game, level và ngân sách của bạn." },
  { icon: KeyRound, number: "02", title: "Thanh toán", text: "Xem kỹ thông tin và xác nhận cùng người giám hộ." },
  { icon: BadgeCheck, number: "03", title: "Nhận & kiểm tra", text: "Nhận thông tin, đăng nhập và đổi bảo mật ngay." },
];

export function RobloxDiscoverySection() {
  return (
    <>
      <section id="chon-theo-game" className="container-page scroll-mt-24">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300"><Gamepad2 className="h-4 w-4" /> Chọn thế giới của bạn</p><h2 className="font-display text-2xl font-black uppercase sm:text-4xl">Hôm nay chơi gì?</h2></div><Link href="/category/roblox" className="hidden items-center gap-1 text-sm font-semibold text-violet-300 hover:text-white sm:flex">Xem tất cả <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {worlds.map((world) => <Link key={world.title} href={world.href} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${world.tone} p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/40`}><span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-black/20 text-3xl shadow-lg transition-transform group-hover:rotate-3 group-hover:scale-110">{world.icon}</span><h3 className="mt-5 text-lg font-bold text-white">{world.title}</h3><p className="mt-1 text-sm text-muted-foreground">{world.note}</p><ArrowRight className="absolute bottom-5 right-5 h-5 w-5 text-white/35 transition group-hover:translate-x-1 group-hover:text-white" /></Link>)}
        </div>
      </section>
      <section className="container-page">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(124,58,237,.13),rgba(34,211,238,.04))] p-6 sm:p-9">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-300"><Sparkles className="h-4 w-4" /> Dễ hiểu · Dễ chọn</p><h2 className="font-display text-2xl font-black uppercase sm:text-4xl">Mua account trong 3 bước</h2></div><span className="flex items-center gap-2 text-sm text-muted-foreground"><Headphones className="h-4 w-4 text-cyan-300" /> Luôn có người hỗ trợ</span></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{steps.map((step) => <div key={step.number} className="relative rounded-2xl border border-white/10 bg-background/45 p-5"><span className="absolute right-5 top-4 font-display text-3xl font-black text-white/5">{step.number}</span><span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500/15 text-violet-300"><step.icon className="h-5 w-5" /></span><h3 className="mt-4 font-bold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p></div>)}</div>
        </div>
      </section>
    </>
  );
}
