import { ButtonLink } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container-page">
      <div className="surface relative overflow-hidden bg-gradient-brand-soft p-8 text-center sm:p-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--primary)/0.25),transparent_70%)]" />
        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold uppercase sm:text-5xl">
            Sẵn sàng <span className="text-gradient-brand">săn nick</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Đăng ký ngay để nhận ưu đãi tân thủ, cộng tiền chào mừng và tham gia vòng quay
            miễn phí.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/register" variant="gradient" size="lg">
              Đăng ký miễn phí
            </ButtonLink>
            <ButtonLink href="/spin" variant="outline" size="lg">
              Thử vòng quay
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
