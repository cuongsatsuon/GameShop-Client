import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata = { title: "Đăng ký" };

export default function RegisterPage() {
  return (
    <AuthShell
      heading1="Bắt Đầu"
      heading2="Săn Nick Ngay"
      subtitle="Tạo tài khoản miễn phí — nhận ngay 50.000đ và lượt quay miễn phí."
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
