import type { Carrier } from "@/types";

/** Global, presentation-level site configuration (nav, brand, static option lists). */
export const siteConfig = {
  name: "SHOPNICK",
  wordmark: { first: "SHOP", second: "NICK" },
  tagline: "UY TÍN · 24/7",
  description:
    "Nền tảng mua bán nick game uy tín #1 Việt Nam — giao dịch tự động 24/7, bảo hành trọn đời, hỗ trợ đa kênh.",
  legal: {
    copyright: "© 2026 SHOPNICK. Bản quyền thuộc về SHOPNICK.",
    license: "Ngân hàng nhà nước cấp phép · MST: 0123456789",
  },
} as const;

/** Primary navigation shown in the header. */
export const mainNav = [
  { label: "Trang chủ", href: "/" },
  { label: "Mua nick", href: "/category/lien-quan" },
  { label: "Cày thuê", href: "/service" },
  { label: "Items", href: "/items" },
  { label: "Flash Sale", href: "/flash-sale", accent: true },
  { label: "Vòng quay", href: "/spin", accent: true },
  { label: "Blog", href: "/blog" },
] as const;

/** Mobile carriers for the card top-up widget. */
export const carriers: Carrier[] = [
  { code: "VTL", name: "Viettel", color: "from-emerald-500 to-green-600" },
  { code: "VNP", name: "Vinaphone", color: "from-sky-500 to-blue-600" },
  { code: "MBF", name: "Mobifone", color: "from-blue-500 to-indigo-600" },
  { code: "ZIN", name: "Zing", color: "from-amber-500 to-orange-600" },
  { code: "GRN", name: "Garena", color: "from-orange-500 to-red-600" },
  { code: "GTE", name: "Gate", color: "from-fuchsia-500 to-purple-600" },
];

/** Card denominations (đồng). */
export const denominations = [10000, 20000, 50000, 100000, 200000, 500000, 1000000];

/** Item / resource purchase amount presets (đồng). */
export const itemAmounts = [50000, 100000, 200000, 500000, 1000000, 2000000];

/** Footer product links. */
export const footerProducts = [
  { label: "Liên Quân", href: "/category/lien-quan" },
  { label: "Free Fire", href: "/category/free-fire" },
  { label: "Liên Minh", href: "/category/lien-minh" },
  { label: "Genshin Impact", href: "/category/genshin" },
  { label: "Roblox", href: "/category/roblox" },
];

/** Footer support links. */
export const footerSupport = [
  { label: "Câu hỏi thường gặp", href: "/policy/faq" },
  { label: "Chính sách bảo hành", href: "/policy" },
  { label: "Điều khoản sử dụng", href: "/policy/terms" },
  { label: "Bảo mật", href: "/policy/privacy" },
  { label: "Liên hệ", href: "/contact" },
];

/** Payment method chips shown in the footer. */
export const paymentMethods = [
  "VCB", "TCB", "ACB", "BIDV", "VPB", "TPB",
  "MOMO", "ZALO", "VIETTEL", "VINA", "MOBI",
];
