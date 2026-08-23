import type { Service } from "@/types";

/** "Cày thuê" (boosting) service packages. */
export const services: Service[] = [
  {
    id: "cay-lien-quan",
    game: "Liên Quân",
    gameSlug: "lien-quan",
    title: "Cày Rank Liên Quân",
    description: "Thợ cày kinh nghiệm 5+ năm. Cày 24/7. Bảo hành nick.",
    fromPrice: 50000,
    packages: 5,
    cover: "https://picsum.photos/seed/svc-lq/800/500",
    badgeGradient: "from-rose-500 to-red-600",
  },
  {
    id: "cay-free-fire",
    game: "Free Fire",
    gameSlug: "free-fire",
    title: "Cày Rank Free Fire",
    description: "Cày all rank, nhận bảo hành tụt rank.",
    fromPrice: 80000,
    packages: 4,
    cover: "https://picsum.photos/seed/svc-ff/800/500",
    badgeGradient: "from-orange-500 to-amber-600",
  },
  {
    id: "cay-lmht",
    game: "Liên Minh",
    gameSlug: "lien-minh",
    title: "Cày Rank LMHT",
    description: "Cày challenger top 100 server VN.",
    fromPrice: 100000,
    packages: 3,
    cover: "https://picsum.photos/seed/svc-lmht/800/500",
    badgeGradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "cay-genshin",
    game: "Genshin",
    gameSlug: "genshin",
    title: "Cày Mật Cảnh + Daily",
    description: "Cày daily quest, mật cảnh, phong ấn.",
    fromPrice: 150000,
    packages: 2,
    cover: "https://picsum.photos/seed/svc-gs/800/500",
    badgeGradient: "from-teal-500 to-cyan-600",
  },
];

/** Headline stats for the service landing page. */
export const serviceStats = [
  { value: "12.500+", label: "Khách đã cày", tone: "primary" as const },
  { value: "99.6%", label: "Tỷ lệ thành công", tone: "success" as const },
  { value: "84", label: "Đơn hôm nay", tone: "accent" as const },
  { value: "4", label: "Game hỗ trợ", tone: "amber" as const },
];
