import { Gift, ShieldCheck, Zap } from "lucide-react";

interface AuthShellProps {
  children: React.ReactNode;
  heading1: string;
  heading2: string;
  subtitle: string;
}

const perks = [
  [ShieldCheck, "Bảo hành trọn đời mọi giao dịch"],
  [Zap, "Nhận nick tự động sau thanh toán"],
  [Gift, "Tham gia vòng quay & nhận quà tân thủ"],
] as const;

export function AuthShell({ children, heading1, heading2, subtitle }: AuthShellProps) {
  return (
    <div className="grid min-h-[70vh] items-center gap-10 py-8 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <h1 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">
          {heading1}
          <br />
          <span className="text-gradient-brand">{heading2}</span>
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">{subtitle}</p>
        <ul className="mt-8 space-y-3">
          {perks.map(([Icon, text]) => (
            <li key={text} className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand-soft text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm">{text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-1 flex justify-center lg:order-2 lg:justify-end">{children}</div>
    </div>
  );
}
