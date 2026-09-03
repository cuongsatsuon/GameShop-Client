import type { Carrier } from "@/types";

/** Global, presentation-level site configuration (nav, brand, static option lists). */
export const siteConfig = {
  name: "VUAROLOX",
  wordmark: { first: "VUA", second: "ROLOX" },
  tagline: "ACCOUNT ROBLOX",
  description:
    "Cửa hàng account Roblox dễ chọn, thông tin rõ ràng và hỗ trợ 24/7.",
  legal: {
    copyright: "© 2026 VUAROLOX. Bản quyền thuộc về VUAROLOX.",
    license: "Giao dịch minh bạch · Hỗ trợ người dùng 24/7",
  },
} as const;

/** Primary navigation shown in the header. */
export const mainNav = [
  { label: "Trang chủ", href: "/" },
  { label: "Account Roblox", href: "/nick" },
  { label: "Blox Fruits", href: "/nick?q=blox" },
  { label: "Vật phẩm", href: "/items" },
  { label: "Hướng dẫn", href: "/policy/faq" },
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
  { label: "Account Roblox", href: "/nick" },
  { label: "Blox Fruits", href: "/nick?q=blox" },
  { label: "Grow a Garden", href: "/nick?q=grow" },
  { label: "Adopt Me!", href: "/nick?q=adopt" },
  { label: "Vật phẩm", href: "/items" },
];

/** Footer support links. */
export const footerSupport = [
  { label: "Câu hỏi thường gặp", href: "/policy/faq" },
  { label: "Chính sách bảo hành", href: "/policy" },
  { label: "Điều khoản sử dụng", href: "/policy/terms" },
  { label: "Bảo mật", href: "/policy/privacy" },
  { label: "Liên hệ", href: "/contact" },
];

