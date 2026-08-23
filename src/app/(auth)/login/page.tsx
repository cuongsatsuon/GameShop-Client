import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata = { title: "Đăng nhập" };

export default function LoginPage() {
  return (
    <AuthShell
      heading1="Chào Mừng"
      heading2="Trở Lại!"
      subtitle="Đăng nhập để tiếp tục mua nick siêu phẩm và theo dõi đơn hàng của bạn."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
