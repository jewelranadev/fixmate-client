// TEMPORARY: delete in phase A16.
// Visual review page for the FixMate design system (phase A02).
// Static props only — no state, no fetching, no dynamic APIs.

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Field from "@/components/ui/Field";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import StatusBadge from "@/components/shared/StatusBadge";
import PaymentBadge from "@/components/shared/PaymentBadge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesGrid from "@/components/services/ServicesGrid";
import { ServiceCardSkeleton } from "@/components/shared/ServiceCard";

export const metadata = {
  title: "Design Preview",
  description: "Temporary design system review page (phase A02).",
};

const COLORS = [
  ["primary", "#C2410C", "bg-primary"],
  ["primary-hover", "#9A3412", "bg-primary-hover"],
  ["primary-bright", "#EA580C", "bg-primary-bright"],
  ["primary-soft", "#FFEDD5", "bg-primary-soft"],
  ["secondary", "#0F766E", "bg-secondary"],
  ["secondary-hover", "#115E59", "bg-secondary-hover"],
  ["secondary-soft", "#CCFBF1", "bg-secondary-soft"],
  ["ink", "#0A1B2A", "bg-ink"],
  ["navy", "#10263B", "bg-navy"],
  ["background", "#FAFAF9", "bg-background"],
  ["surface", "#FFFFFF", "bg-surface"],
  ["surface-soft", "#F5F5F4", "bg-surface-soft"],
  ["border", "#E7E5E4", "bg-border"],
  ["border-strong", "#D6D3D1", "bg-border-strong"],
  ["foreground", "#1C1917", "bg-foreground"],
  ["muted", "#57534E", "bg-muted"],
  ["placeholder", "#A8A29E", "bg-placeholder"],
  ["success", "#15803D", "bg-success"],
  ["success-soft", "#DCFCE7", "bg-success-soft"],
  ["warning", "#B45309", "bg-warning"],
  ["warning-soft", "#FEF3C7", "bg-warning-soft"],
  ["danger", "#B91C1C", "bg-danger"],
  ["danger-hover", "#991B1B", "bg-danger-hover"],
  ["danger-soft", "#FEE2E2", "bg-danger-soft"],
  ["info", "#1D4ED8", "bg-info"],
  ["info-soft", "#DBEAFE", "bg-info-soft"],
];

const STATUSES = [
  "Requested",
  "Accepted",
  "In Progress",
  "Completed",
  "Rejected",
  "Cancelled",
];

const BADGE_TONES = [
  "neutral",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
];

const SHADOWS = ["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"];

function Section({ title, description, children }) {
  return (
    <section className="space-y-4 border-t border-border pt-10">
      <div>
        <h2>{title}</h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignPreviewPage() {
  return (
    <Container className="py-12 space-y-10">
      <div className="space-y-3">
        <Badge tone="warning">TEMPORARY: delete in phase A16</Badge>
        <h1 className="text-[2.25rem] leading-[1.15] tracking-[-0.02em] font-heading font-bold md:text-[3.5rem] md:leading-[1.1]">
          FixMate Design System
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Art direction “Steady Signal” — every token, primitive and badge from
          phase A02. All data below is static.
        </p>
      </div>

      <Section
        title="Colors"
        description="Tokens from app/globals.css — palette, semantic pairs and status tints."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map(([name, hex, cls]) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-field border border-border bg-surface p-3"
            >
              <span
                className={`size-10 shrink-0 rounded-field border border-border ${cls}`}
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">
                  {name}
                </span>
                <span className="block text-xs text-muted">{hex}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Typography"
        description="Plus Jakarta Sans for headings, Inter for body. Type scale per A01 §4."
      >
        <div className="space-y-4">
          <p className="font-heading text-[2.25rem] leading-[1.15] tracking-[-0.02em] font-bold md:text-[3.5rem] md:leading-[1.1]">
            Display 36/56 — Book a repair in minutes
          </p>
          <h1>H1 — 30/40, weight 700</h1>
          <h2>H2 — 24/32, weight 700</h2>
          <h3>H3 — 20/24, weight 600</h3>
          <p className="text-lg">
            Body large — 18/1.6. Verified technicians, transparent pricing and
            status updates at every step.
          </p>
          <p className="font-body">
            Body — 16/1.6. The quick brown fox jumps over the lazy dog while a
            washing machine drains quietly in the background.
          </p>
          <p className="text-sm">
            Small — 14/1.5. Table rows, metadata and secondary UI text.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            Caption / overline — 12, uppercase
          </p>
        </div>
      </Section>

      <Section
        title="Buttons"
        description="Variants × sizes, plus disabled, loading and link rendering."
      >
        <div className="space-y-4">
          {["sm", "md", "lg"].map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <Button size={size} variant="primary">
                Primary {size}
              </Button>
              <Button size={size} variant="secondary">
                Secondary
              </Button>
              <Button size={size} variant="ghost">
                Ghost
              </Button>
              <Button size={size} variant="destructive">
                Destructive
              </Button>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="secondary" loading>
              Loading
            </Button>
            <Button variant="primary" href="/services">
              Link button
            </Button>
            <Button variant="ghost" href="/about" disabled>
              Disabled link
            </Button>
          </div>
        </div>
      </Section>

      <Section
        title="Form fields"
        description="Label, Input, Textarea, Select with default, helper, error, disabled and read-only states."
      >
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <Field label="Full name" htmlFor="dp-name" helper="As shown on your ID.">
            <Input id="dp-name" placeholder="e.g. Amina Yusuf" />
          </Field>
          <Field
            label="Email address"
            htmlFor="dp-email"
            error="Enter a valid email address."
            required
          >
            <Input id="dp-email" type="email" error placeholder="you@example.com" />
          </Field>
          <Field label="Phone number" htmlFor="dp-phone">
            <Input id="dp-phone" disabled placeholder="Disabled field" />
          </Field>
          <Field label="Booking reference" htmlFor="dp-ref">
            <Input id="dp-ref" readOnly value="FM-2026-004182" />
          </Field>
          <Field label="Device category" htmlFor="dp-category">
            <Select id="dp-category" defaultValue="">
              <option value="" disabled>
                Choose a category
              </option>
              <option>Smartphone</option>
              <option>Laptop &amp; PC</option>
              <option>AC</option>
              <option>Refrigerator</option>
              <option>TV</option>
              <option>Washing Machine</option>
              <option>Electrical</option>
            </Select>
          </Field>
          <Field
            label="Describe the issue"
            htmlFor="dp-issue"
            helper="Static preview only — nothing is submitted."
            className="sm:col-span-2"
          >
            <Textarea
              id="dp-issue"
              rows={4}
              placeholder="The unit powers on but the drum does not spin…"
            />
          </Field>
          <div className="space-y-1.5">
            <Label>Bare label</Label>
            <Input placeholder="Input without Field wrapper" />
          </div>
        </div>
      </Section>

      <Section title="Avatars" description="Initials fallback when no image is set.">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name="Amina Yusuf" size="sm" />
          <Avatar name="Amina Yusuf" size="md" />
          <Avatar name="Amina Yusuf" size="lg" />
          <Avatar name="David Chen" size="md" />
          <Avatar name="Sara Lin" size="md" />
          <Avatar size="md" />
        </div>
      </Section>

      <Section title="Badges" description="Generic tones (Badge) — all AA verified.">
        <div className="flex flex-wrap items-center gap-3">
          {BADGE_TONES.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </div>
      </Section>

      <Section
        title="Booking statuses"
        description="StatusBadge — identical pills across every dashboard."
      >
        <div className="flex flex-wrap items-center gap-3">
          {STATUSES.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
          <StatusBadge status="SomethingElse" />
        </div>
      </Section>

      <Section
        title="Payment states"
        description="PaymentBadge — solid green for Paid, dashed outline for Unpaid."
      >
        <div className="flex flex-wrap items-center gap-3">
          <PaymentBadge status="Paid" />
          <PaymentBadge status="Unpaid" />
        </div>
      </Section>

      <Section
        title="Cards & shadows"
        description="Card surface, optional hover lift, and the four navy-tinted shadow tokens."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="p-6">
            <h3>Default card</h3>
            <p className="mt-2 text-sm text-muted">
              Rounded 16px, border-border, shadow-xs. Compose padding via
              className.
            </p>
          </Card>
          <Card hover className="p-6">
            <h3>Hover card</h3>
            <p className="mt-2 text-sm text-muted">
              Shadow lifts to shadow-md on hover — for service and list cards.
            </p>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {SHADOWS.map((shadow) => (
            <div
              key={shadow}
              className={`flex h-24 items-center justify-center rounded-card border border-border bg-surface ${shadow}`}
            >
              <span className="text-sm text-muted">{shadow}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Navbar variants (A04 preview)"
        description="Logged-out plus three logged-in roles. Dropdowns and the mobile panel (below 768px) are interactive here too."
      >
        <div className="space-y-10">
          {[
            ["Logged out", null],
            ["Logged in — customer", { name: "Amina Yusuf", email: "amina@example.com", role: "customer" }],
            ["Logged in — technician", { name: "David Chen", email: "david.chen@example.com", role: "technician" }],
            ["Logged in — admin", { name: "Sara Lin", email: "sara.lin@fixmate.app", role: "admin" }],
          ].map(([caption, mockUser]) => (
            <div key={caption} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                {caption}
              </p>
              {/* [&>header]:static neutralizes the sticky bar for preview */}
              <div className="relative rounded-card border border-border [&>header]:static">
                <Navbar user={mockUser} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Footer (A04)" description="Navy footer — fake contact details and placeholder social links by design.">
        <div className="rounded-card border border-border">
          <Footer />
        </div>
      </Section>

      <Section
        title="Services states (A06 preview)"
        description="Empty state and loading skeleton for /services — same grid classes as the real page, no logic involved."
      >
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty state
            </p>
            <ServicesGrid services={[]} />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Loading skeleton
            </p>
            <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
