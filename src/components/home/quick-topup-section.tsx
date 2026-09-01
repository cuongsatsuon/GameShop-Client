import { Clock3, Headphones, ShieldCheck } from "lucide-react";
import { TopupWidget } from "./topup-widget";

const benefits = [
  { icon: Clock3, title: "Xử lý nhanh", text: "Thẻ hợp lệ được kiểm tra và cập nhật số dư tự động." },
  { icon: ShieldCheck, title: "Thông tin rõ ràng", text: "Hiển thị mệnh giá đã chọn trước khi bạn xác nhận." },
  { icon: Headphones, title: "Có người hỗ trợ", text: "Liên hệ đội ngũ hỗ trợ nếu giao dịch cần kiểm tra." },
];

export function QuickTopupSection() {
  return (
    <section className="container-page">
      <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/15 bg-[linear-gradient(135deg,rgba(124,58,237,.16),rgba(34,211,238,.05))] p-4 sm:p-7 lg:p-9">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-12">
          <div className="px-2 sm:px-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Nạp một lần · Chơi thỏa thích</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight sm:text-4xl">Nạp card nhanh ngay tại Home</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Thêm số dư để chọn account hoặc vật phẩm bạn thích mà không cần rời trang.</p>
            <div className="mt-7 space-y-4">
              {benefits.map((benefit) => <div key={benefit.title} className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300"><benefit.icon className="h-5 w-5" /></span><div><h3 className="text-sm font-bold text-white">{benefit.title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{benefit.text}</p></div></div>)}
            </div>
          </div>
          <TopupWidget />
        </div>
      </div>
    </section>
  );
}
