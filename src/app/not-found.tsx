import { ButtonLink } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div className="space-y-4">
        <div className="flex justify-center">
          <BrandLogo withTagline={false} href="/" />
        </div>
        <p className="font-display text-7xl font-extrabold text-gradient-brand">404</p>
        <h1 className="font-display text-2xl font-bold uppercase">
          Trang không tồn tại
        </h1>
        <p className="text-muted-foreground">
          Trang bạn tìm có thể đã bị xoá hoặc di chuyển.
        </p>
        <ButtonLink href="/" variant="gradient" size="lg">
          Về trang chủ
        </ButtonLink>
      </div>
    </div>
  );
}
