import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

/**
 * AuthLayout — shared frame for /sign-up and /sign-in.
 *
 * Desktop (>= lg): form card on the left, decorative image panel on the right.
 * Mobile/tablet: one centered column; the image panel is hidden.
 * Renders inside the public layout, so Navbar and Footer stay visible.
 *
 * Presentational only — no session checks, no redirects.
 */
export default function AuthLayout({
  title,
  subtitle,
  children,
  footer = null,
  imageSrc = "/images/workbench-tools.jpg",
  imageAlt = "Repair workbench with precision tools and a phone under service",
  brandMessage = "Track every repair. Pay only after the job is done.",
}) {
  return (
    <div className="bg-background py-10 sm:py-12 lg:py-16">
      <Container>
        <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <Card className="p-6 shadow-sm sm:p-8">
                <header>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    FixMate account
                  </p>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {subtitle}
                    </p>
                  )}
                </header>

                <div className="mt-6">{children}</div>

                {footer && (
                  <div className="mt-6 border-t border-border pt-5 text-sm text-muted">
                    {footer}
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="relative hidden overflow-hidden rounded-modal bg-navy lg:block">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1023px) 0px, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/25"
            />
            <div className="relative flex h-full min-h-[560px] flex-col justify-end p-10">
              <span className="flex size-12 items-center justify-center rounded-field bg-white/10 text-white">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-6 max-w-sm font-heading text-2xl font-bold leading-snug text-white xl:text-3xl">
                {brandMessage}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                Verified technicians, clear quotes and updates at every step.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
