import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = { title: "Chính sách bảo hành" };

export default function WarrantyPolicyPage() {
  return (
    <div className="container-page py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Chính sách bảo hành" }]}
        />

        <h1 className="font-display text-3xl font-extrabold uppercase">
          Chính sách bảo hành
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          VUAROLOX cam kết bảo hành trọn đời thông tin đăng nhập cho mọi tài khoản
          được bán ra. Trong trường hợp phát sinh lỗi liên quan đến quyền sở hữu, đội
          ngũ hỗ trợ sẽ xử lý nhanh chóng và minh bạch.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Phạm vi bảo hành
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Chúng tôi bảo hành đối với các trường hợp mất tài khoản do lỗi từ phía shop,
          sai lệch thông tin so với mô tả, hoặc tài khoản bị thu hồi trong thời gian bảo
          hành. Các trường hợp do người mua tự thay đổi thông tin không được đề cập sẽ
          không nằm trong phạm vi này.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Quy trình xử lý
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Khách hàng liên hệ hotline hoặc Zalo, cung cấp mã đơn hàng và mô tả sự cố.
          Bộ phận kỹ thuật xác minh trong vòng 24 giờ và tiến hành khôi phục hoặc hoàn
          tiền tùy theo tình huống cụ thể.
        </p>

        <h2 className="font-display text-lg uppercase text-foreground">
          Cam kết
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Mọi giao dịch đều được ghi nhận và lưu trữ để bảo vệ quyền lợi của khách hàng.
          VUAROLOX ưu tiên uy tín và sự an tâm của bạn trong suốt quá trình sử dụng.
        </p>
      </div>
    </div>
  );
}
