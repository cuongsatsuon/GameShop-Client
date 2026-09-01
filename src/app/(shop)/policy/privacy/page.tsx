import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = { title: "Chính sách bảo mật" };

export default function PrivacyPage() {
  return (
    <div className="container-page py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Chính sách bảo mật" }]}
        />

        <h1 className="font-display text-3xl font-extrabold uppercase">
          Chính sách bảo mật
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          VUAROLOX tôn trọng và cam kết bảo vệ thông tin cá nhân của khách hàng. Chính
          sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của
          bạn.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Thu thập thông tin
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Chúng tôi chỉ thu thập những thông tin cần thiết cho việc xử lý đơn hàng và
          chăm sóc khách hàng, bao gồm họ tên, số điện thoại và email. Dữ liệu được thu
          thập một cách minh bạch và có sự đồng ý của bạn.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Sử dụng và lưu trữ
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Thông tin của bạn được lưu trữ an toàn trên hệ thống được mã hóa và chỉ sử
          dụng cho mục đích đã nêu. Chúng tôi không chia sẻ dữ liệu cho bên thứ ba khi
          chưa có sự cho phép của bạn.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Quyền của khách hàng
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình
          bất kỳ lúc nào. Mọi yêu cầu liên quan đến quyền riêng tư sẽ được xử lý nhanh
          chóng qua bộ phận hỗ trợ.
        </p>
      </div>
    </div>
  );
}
