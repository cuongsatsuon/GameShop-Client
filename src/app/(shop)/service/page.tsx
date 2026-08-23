import { apiGet } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BoostingShop } from "@/components/service/boosting-shop";
import {
  mapGame,
  mapService,
  mapPackage,
  type ApiGame,
  type ApiService,
  type ApiPackage,
  type BoostingGame,
} from "@/lib/boosting";
import { cn } from "@/lib/utils";

export const metadata = { title: "Cày thuê" };

const toneClass: Record<string, string> = {
  primary: "text-primary",
  success: "text-success",
  accent: "text-accent",
  amber: "text-amber-400",
};

async function loadTree(): Promise<BoostingGame[]> {
  const games = await apiGet<ApiGame[]>("/boosting/games");
  return Promise.all(
    games.map(async (g) => {
      const services = await apiGet<ApiService[]>(`/boosting/games/${g.id}/services`);
      const withPkgs = await Promise.all(
        services.map(async (s) => {
          const pkgs = await apiGet<ApiPackage[]>(`/boosting/services/${s.id}/packages`);
          return mapService(s, pkgs.map(mapPackage));
        })
      );
      return mapGame(g, withPkgs);
    })
  );
}

export default async function ServicePage() {
  let tree: BoostingGame[] = [];
  try {
    tree = await loadTree();
  } catch {
    // leave empty — BoostingShop renders an empty state
  }
  const user = await getSession();

  const serviceCount = tree.reduce((n, g) => n + g.services.length, 0);
  const packageCount = tree.reduce(
    (n, g) => n + g.services.reduce((m, s) => m + s.packages.length, 0),
    0
  );
  const stats = [
    { label: "Game hỗ trợ", value: String(tree.length), tone: "primary" },
    { label: "Dịch vụ", value: String(serviceCount), tone: "success" },
    { label: "Gói cày", value: String(packageCount), tone: "accent" },
    { label: "Kinh nghiệm", value: "5+ năm", tone: "amber" },
  ];

  return (
    <div className="container-page space-y-6 py-8">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ cày thuê" }]} />

      <header className="space-y-2">
        <h1 className="font-display text-3xl font-extrabold uppercase">
          Dịch Vụ <span className="text-gradient-brand">Cày Thuê</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Đội ngũ thợ cày uy tín 5+ năm. Bảo hành nick, cam kết tiến độ.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="surface p-5">
            <p className={cn("font-display text-2xl font-extrabold", toneClass[s.tone])}>{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <BoostingShop games={tree} isLoggedIn={!!user} />
    </div>
  );
}
