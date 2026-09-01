import type { BlogPost } from "@/types";

/** Mock blog / news catalog. Swap for a CMS or API returning the same shape. */
export const blogPosts: BlogPost[] = [
  {
    slug: "top-5-nick-lien-quan",
    title: "Top 5 nick Liên Quân giá rẻ đáng mua nhất tháng này",
    excerpt:
      "Cập nhật mới nhất các nick Liên Quân khung Đồng - Bạc giá chỉ từ 50K, đầy đủ tướng meta...",
    category: "Liên Quân",
    cover: "https://picsum.photos/seed/blog-lq/800/500",
    author: "Admin",
    daysAgo: 2,
    readMinutes: 5,
    views: 1240,
    featured: true,
  },
  {
    slug: "huong-dan-nap-the",
    title: "Hướng dẫn nạp thẻ và mua nick chỉ trong 30 giây",
    excerpt:
      "Quy trình mua nick tự động 24/7, nhận tài khoản ngay sau khi thanh toán thành công...",
    category: "Hướng dẫn",
    cover: "https://picsum.photos/seed/blog-nap/800/500",
    author: "Admin",
    daysAgo: 5,
    readMinutes: 4,
    views: 2380,
  },
  {
    slug: "su-kien-vong-quay",
    title: "Sự kiện vòng quay may mắn — Quà cực khủng tháng này!",
    excerpt:
      "Chỉ với 5K mỗi lượt, cơ hội trúng iPhone 15, AirPods, nick siêu phẩm 100% có quà!",
    category: "Sự kiện",
    cover: "https://picsum.photos/seed/blog-spin/800/500",
    author: "Admin",
    daysAgo: 1,
    readMinutes: 3,
    views: 4120,
  },
  {
    slug: "free-fire-skin-moi",
    title: "Free Fire ra mắt skin mới — Có nên đầu tư nick FF lúc này?",
    excerpt:
      "Phân tích kỹ về meta và giá trị nick FF khi event mới ra mắt vào tuần sau...",
    category: "Free Fire",
    cover: "https://picsum.photos/seed/blog-ff/800/500",
    author: "Admin",
    daysAgo: 3,
    readMinutes: 6,
    views: 890,
  },
  {
    slug: "meo-bao-mat-game",
    title: "10 mẹo bảo mật tài khoản game không thể bỏ qua",
    excerpt:
      "Bảo vệ nick game khỏi hacker với 10 thủ thuật đơn giản từ chuyên gia...",
    category: "Hướng dẫn",
    cover: "https://picsum.photos/seed/blog-baomat/800/500",
    author: "Admin",
    daysAgo: 7,
    readMinutes: 5,
    views: 3210,
  },
  {
    slug: "lmht-meta-thang",
    title: "Liên Minh: Meta tướng top 1 mùa hiện tại",
    excerpt:
      "Cập nhật danh sách tướng mạnh nhất theo từng vị trí, tỉ lệ thắng cao nhất...",
    category: "Liên Minh",
    cover: "https://picsum.photos/seed/blog-lmht/800/500",
    author: "Admin",
    daysAgo: 10,
    readMinutes: 7,
    views: 1820,
  },
  {
    slug: "affiliate-shopnick",
    title: "Cách kiếm tiền từ Affiliate VUAROLOX — Thu nhập 5-10tr/tháng",
    excerpt:
      "Hướng dẫn chi tiết tận dụng hệ thống affiliate để có thu nhập thụ động...",
    category: "Hướng dẫn",
    cover: "https://picsum.photos/seed/blog-aff/800/500",
    author: "Admin",
    daysAgo: 14,
    readMinutes: 8,
    views: 5640,
  },
  {
    slug: "black-friday-2024",
    title: "Black Friday — Giảm giá đến 70% toàn bộ nick game",
    excerpt:
      "Sự kiện lớn nhất năm với hàng nghìn nick giảm giá sốc, không thể bỏ lỡ...",
    category: "Sự kiện",
    cover: "https://picsum.photos/seed/blog-bf/800/500",
    author: "Admin",
    daysAgo: 20,
    readMinutes: 4,
    views: 7890,
  },
];

/** Distinct blog categories with counts, for the filter tabs & sidebar. */
export const blogCategories = [
  { label: "Tất cả", count: blogPosts.length },
  { label: "Hướng dẫn", count: blogPosts.filter((p) => p.category === "Hướng dẫn").length },
  { label: "Sự kiện", count: blogPosts.filter((p) => p.category === "Sự kiện").length },
  { label: "Liên Quân", count: blogPosts.filter((p) => p.category === "Liên Quân").length },
  { label: "Free Fire", count: blogPosts.filter((p) => p.category === "Free Fire").length },
  { label: "Liên Minh", count: blogPosts.filter((p) => p.category === "Liên Minh").length },
  { label: "Tin tức", count: 0 },
];

const byBlogSlug = new Map(blogPosts.map((p) => [p.slug, p]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return byBlogSlug.get(slug);
}

export function featuredPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}
