import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = { title: "Điều khoản sử dụng" };

export default function TermsPage() {
  return (
    <div className="container-page py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Điều khoản sử dụng" }]}
        />

        <h1 className="font-display text-3xl font-extrabold uppercase">
          Điều khoản sử dụng
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Khi truy cập và sử dụng dịch vụ của SHOPNICK, bạn đồng ý tuân thủ các điều
          khoản dưới đây. Vui lòng đọc kỹ để đảm bảo quyền lợi của mình trong suốt quá
          trình giao dịch.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Quyền và nghĩa vụ
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Người dùng có trách nhiệm cung cấp thông tin chính xác khi đặt hàng và bảo mật
          thông tin tài khoản của mình. Mọi hành vi gian lận, lợi dụng dịch vụ vào mục
          đích xấu đều bị nghiêm cấm và có thể bị khóa tài khoản.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Giao dịch và thanh toán
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Tất cả giao dịch được thực hiện trên nền tảng chính thức của SHOPNICK. Chúng
          tôi không chịu trách nhiệm với các giao dịch phát sinh ngoài hệ thống hoặc
          thông qua bên thứ ba không được ủy quyền.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Thay đổi điều khoản
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          SHOPNICK có quyền cập nhật điều khoản bất kỳ lúc nào nhằm phù hợp với quy định
          pháp luật và chính sách vận hành. Các thay đổi sẽ được thông báo công khai
          trên website.
        </p>
      </div>
    </div>
  );
}
