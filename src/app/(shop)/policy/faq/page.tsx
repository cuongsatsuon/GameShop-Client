import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = { title: "Câu hỏi thường gặp" };

const faqs = [
  {
    q: "Mua nick có an toàn không?",
    a: "Hoàn toàn an toàn. Mỗi tài khoản đều được kiểm duyệt thông tin và bảo hành, giao dịch được ghi nhận minh bạch để bảo vệ quyền lợi khách hàng.",
  },
  {
    q: "Bao lâu nhận được nick?",
    a: "Ngay sau khi thanh toán thành công, thông tin đăng nhập sẽ được gửi tự động trong vài phút. Nếu chậm trễ, hãy liên hệ hotline để được hỗ trợ ngay.",
  },
  {
    q: "Chính sách bảo hành thế nào?",
    a: "Chúng tôi bảo hành thông tin đăng nhập trọn đời. Nếu tài khoản gặp lỗi do phía shop, bạn sẽ được khôi phục hoặc hoàn tiền theo quy định.",
  },
  {
    q: "Thanh toán bằng cách nào?",
    a: "Bạn có thể thanh toán qua chuyển khoản ngân hàng, ví điện tử hoặc nạp thẻ cào. Tất cả phương thức đều được xử lý tự động và bảo mật.",
  },
  {
    q: "Nạp thẻ sai mệnh giá thì sao?",
    a: "Trường hợp nạp sai mệnh giá, vui lòng giữ lại mã thẻ và liên hệ bộ phận hỗ trợ. Chúng tôi sẽ đối soát và cộng đúng giá trị vào tài khoản của bạn.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-page py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Câu hỏi thường gặp" }]}
        />

        <h1 className="font-display text-3xl font-extrabold uppercase">
          Câu hỏi thường gặp
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Tổng hợp những thắc mắc phổ biến nhất từ khách hàng. Nếu chưa tìm thấy câu
          trả lời, đừng ngần ngại liên hệ đội ngũ hỗ trợ 24/7 của chúng tôi.
        </p>

        {faqs.map(({ q, a }) => (
          <div key={q} className="space-y-1">
            <h3 className="font-semibold text-foreground">{q}</h3>
            <p className="text-muted-foreground">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
