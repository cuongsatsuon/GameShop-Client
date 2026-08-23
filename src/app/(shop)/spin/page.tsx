import { Sparkles, Gift, History } from "lucide-react";
import { apiGet } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { SpinWheel } from "@/components/spin/spin-wheel";
import { mapWheel, type ApiWheel, type SpinResultRow } from "@/lib/spin";

export const metadata = { title: "Vòng quay may mắn" };

function timeAgo(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
}

export default async function SpinPage() {
  let wheels: ApiWheel[] = [];
  let winners: SpinResultRow[] = [];
  try {
    [wheels, winners] = await Promise.all([
      apiGet<ApiWheel[]>("/spin/wheels"),
      apiGet<SpinResultRow[]>("/spin/results/recent"),
    ]);
  } catch {
    // leave empty — render the graceful empty state below
  }
  const user = await getSession();
  const wheel = wheels[0] ? mapWheel(wheels[0]) : null;

  return (
    <div className="container-page space-y-6 py-8">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Vòng quay may mắn" }]} />

      <div className="surface bg-gradient-brand-soft p-6">
        <Badge variant="accent">
          <Sparkles className="h-3 w-3" /> Sự kiện đặc biệt
        </Badge>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase text-gradient-brand">
          {wheel?.name ?? "Vòng Quay May Mắn"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cơ hội trúng iPhone 15, AirPods, Robux miễn phí mỗi lượt quay!
        </p>
      </div>

      {!wheel ? (
        <div className="surface py-16 text-center text-muted-foreground">
          Hiện chưa có vòng quay nào đang mở.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="surface grid place-items-center p-6">
            <SpinWheel wheel={wheel} isLoggedIn={!!user} />
          </div>

          <div className="space-y-6">
            <div className="surface p-5">
              <h2 className="flex items-center gap-2 font-display text-sm uppercase">
                <Gift className="h-4 w-4 text-primary" /> Phần thưởng
              </h2>
              <div className="space-y-1">
                {wheel.prizes.map((p, i) => (
                  <div key={`${p.label}-${i}`} className="flex items-center gap-3 py-2">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-lg text-lg"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.icon}
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold">{p.label}</span>
                      <span className="block text-xs text-muted-foreground">Tỉ lệ: {p.probability}%</span>
                    </div>
                    <Badge variant="muted">{p.probability}%</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface p-5">
              <h2 className="flex items-center gap-2 font-display text-sm uppercase">
                <History className="h-4 w-4 text-primary" /> Người trúng gần đây
              </h2>
              <div className="space-y-1">
                {winners.length === 0 && (
                  <p className="py-2 text-sm text-muted-foreground">Chưa có lượt quay nào.</p>
                )}
                {winners.map((w, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <span className="h-9 w-9 shrink-0 rounded-full bg-gradient-brand" />
                    <div className="flex-1 text-sm">
                      <span className="font-semibold">{w.username}</span> trúng{" "}
                      <span className="font-semibold text-primary">{w.prizeLabel}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{timeAgo(w.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
