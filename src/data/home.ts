import type { ActivityItem, LeaderboardEntry } from "@/types";

/** Hero carousel slides. */
export const heroSlides = [
  {
    id: "lien-quan",
    badge: "HOT",
    title: "Săn Nick Liên Quân Siêu Phẩm",
    subtitle:
      "Hơn 348 nick LQ chính chủ — bảo hành trọn đời, giao dịch tự động 24/7",
    cta: { label: "Khám phá ngay", href: "/category/lien-quan" },
    image: "https://picsum.photos/seed/hero-lq/1200/700",
  },
  {
    id: "flash-sale",
    badge: "SALE",
    title: "Flash Sale 24H Cuối Tuần",
    subtitle: "Giảm giá đến 50% cho hàng trăm nick game — số lượng có hạn",
    cta: { label: "Săn deal ngay", href: "/flash-sale" },
    image: "https://picsum.photos/seed/hero-sale/1200/700",
  },
  {
    id: "spin",
    badge: "NEW",
    title: "Vòng Quay May Mắn",
    subtitle: "5K mỗi lượt — cơ hội trúng iPhone 15, AirPods, 1000 Robux",
    cta: { label: "Quay ngay", href: "/spin" },
    image: "https://picsum.photos/seed/hero-spin/1200/700",
  },
  {
    id: "service",
    badge: "",
    title: "Cày Thuê Rank Toàn Game",
    subtitle: "Đội ngũ top 100 server VN — bảo hành nick, cam kết tiến độ",
    cta: { label: "Đặt cày ngay", href: "/service" },
    image: "https://picsum.photos/seed/hero-svc/1200/700",
  },
];

/** Trust stats row under the hero. */
export const heroStats = [
  { value: "50K+", label: "Khách hàng", icon: "users" as const },
  { value: "10K+", label: "Nick đang bán", icon: "package" as const },
  { value: "99.8%", label: "Hài lòng", icon: "trending" as const },
  { value: "24/7", label: "Hỗ trợ trực tuyến", icon: "clock" as const },
];

/** Live activity ticker items. */
export const activityFeed: ActivityItem[] = [
  { username: "vu***quan", action: "vừa mua nick Liên Quân Tier Cao Thủ — 850K" },
  { username: "ng***minh", action: "vừa nạp 500K qua Vietcombank" },
  { username: "ph***thao", action: "vừa trúng iPhone 15 từ Vòng quay" },
  { username: "le***duy", action: "vừa mua nick Free Fire Tier Bạch Kim — 420K" },
  { username: "tr***vinh", action: "vừa đặt cày rank Liên Minh — 200K" },
];

/** Monthly top-up leaderboard. */
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "vu***quan", amount: 12500000, reward: "Iphone 15 Pro" },
  { rank: 2, username: "th***hai", amount: 9800000, reward: "Xe SH" },
  { rank: 3, username: "ng***minh", amount: 7200000, reward: "Macbook Air" },
  { rank: 4, username: "le***duy", amount: 5400000 },
  { rank: 5, username: "ph***thao", amount: 4100000 },
  { rank: 6, username: "bu***long", amount: 3800000 },
  { rank: 7, username: "do***khanh", amount: 3200000 },
  { rank: 8, username: "ho***nam", amount: 2900000 },
  { rank: 9, username: "tr***vinh", amount: 2500000 },
  { rank: 10, username: "tu***anh", amount: 2100000 },
];
