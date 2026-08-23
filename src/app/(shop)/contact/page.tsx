import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/input";

export const metadata = { title: "Liên hệ" };

const channels = [
  { icon: Phone, title: "Hotline", value: "1900 6868" },
  { icon: Mail, title: "Email", value: "support@shopnick.vn" },
  { icon: MessageCircle, title: "Zalo / Telegram", value: "@shopnick" },
  { icon: Clock, title: "Giờ làm việc", value: "24/7 — kể cả lễ tết" },
];

export default function ContactPage() {
  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]} />

      <div className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold uppercase">
          Liên <span className="text-gradient-brand">Hệ</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Hỗ trợ 24/7 — phản hồi trong vài phút.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {channels.map(({ icon: Icon, title, value }) => (
            <div key={title} className="surface flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand-soft text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="surface space-y-4 p-6">
          <div>
            <FieldLabel>Họ tên</FieldLabel>
            <Input placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <div>
            <FieldLabel>Tiêu đề</FieldLabel>
            <Input placeholder="Tôi cần hỗ trợ về..." />
          </div>
          <div>
            <FieldLabel>Nội dung</FieldLabel>
            <textarea
              className="flex min-h-32 w-full rounded-lg border border-input bg-secondary/60 p-3.5 text-sm placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none"
              placeholder="Mô tả chi tiết..."
            />
          </div>
          <Button variant="gradient" size="lg" className="w-full">
            Gửi liên hệ
          </Button>
        </form>
      </div>
    </div>
  );
}
