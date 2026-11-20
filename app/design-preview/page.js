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
import RequestRepairPanel from "@/components/services/RequestRepairPanel";
import SignUpForm from "@/components/auth/SignUpForm";
import SignInForm from "@/components/auth/SignInForm";
import DonutChart from "@/components/charts/DonutChart";
import BarChart from "@/components/charts/BarChart";
import BookingsSection from "@/components/dashboard/customer/BookingsSection";
import PaymentsSection from "@/components/dashboard/customer/PaymentsSection";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ErrorState from "@/components/ui/ErrorState";
import ApprovalBadge from "@/components/shared/ApprovalBadge";
import Switch from "@/components/ui/Switch";
import FileInput from "@/components/ui/FileInput";
import Modal from "@/components/ui/Modal";
import Alert from "@/components/ui/Alert";
import AddServiceSection from "@/components/dashboard/technician/AddServiceSection";
import MyServicesSection from "@/components/dashboard/technician/MyServicesSection";
import RequestsSection from "@/components/dashboard/technician/RequestsSection";
import ServiceFields from "@/components/dashboard/technician/ServiceFields";
import { technician } from "@/data/mock/technicianServices";
import UsersSection from "@/components/dashboard/admin/UsersSection";
import AdminServicesSection from "@/components/dashboard/admin/ServicesSection";
import AdminBookingsSection from "@/components/dashboard/admin/BookingsSection";
import TransactionsSection from "@/components/dashboard/admin/TransactionsSection";
import RoleBadge from "@/components/shared/RoleBadge";
import { currentAdmin } from "@/data/mock/adminUsers";
import ProfileSection from "@/components/dashboard/ProfileSection";
import { profileUser } from "@/data/mock/profile";
import { ServiceCardSkeleton } from "@/components/shared/ServiceCard";
import PaymentResult from "@/components/system/PaymentResult";
import PaymentCancelled from "@/components/system/PaymentCancelled";
import NotFoundView from "@/components/system/NotFoundView";
import ForbiddenState from "@/components/system/ForbiddenState";
import PageErrorView from "@/components/system/PageErrorView";

// Technician variant used only by the A11 profile preview.
const PREVIEW_TECHNICIAN = {
  name: "Marcus Hale",
  email: "marcus.hale@fixmate.example",
  image: "",
  role: "technician",
  phone: "+880 1700 000 101",
  area: "Mirpur, Dhaka",
  bio: "Bench-trained electronics technician with nine years on phone screens, laptop boards and split AC servicing. Clear quotes before any part is ordered.",
  createdAt: "2026-02-18T09:00:00.000Z",
};

// Sample service used only by the A09 edit-modal preview.
const PREVIEW_SERVICE = {
  _id: "svc_preview",
  title: "Split AC Deep Cleaning",
  category: "AC",
  description:
    "Indoor and outdoor units washed, filters and coils cleaned, and drainage checked so cooling runs at full strength.",
  image: "/images/ac-outdoor-unit.jpg",
  basePrice: 55,
  estimatedDuration: "2-3 hours",
  serviceMode: "Home Visit",
  serviceArea: "Mirpur, Dhaka",
  approvalStatus: "approved",
  isAvailable: true,
};

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

      <Section
        title="Request repair states (A07 preview)"
        description="Guest, customer (clean, errors, duplicate, success) and the technician/admin notices - props only, no session or validation logic."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            {
              caption: "Guest - default on /services/svc_001",
              props: { variant: "guest" },
            },
            {
              caption: "Customer - clean form",
              props: { variant: "customer" },
            },
            {
              caption: "Customer - all four field errors",
              props: {
                variant: "customer",
                errors: {
                  phone: "Phone number is required",
                  address: "Address is required",
                  preferredDate: "Choose today or a future date",
                  problemDescription:
                    "Describe the problem in at least 20 characters",
                },
              },
            },
            {
              caption: "Customer - duplicate request",
              props: { variant: "customer", status: "duplicate" },
            },
            {
              caption: "Customer - success",
              props: { variant: "customer", status: "success" },
            },
            {
              caption: "Technician account",
              props: { variant: "technician" },
            },
            {
              caption: "Admin account",
              props: { variant: "admin" },
            },
          ].map(({ caption, props }, index) => (
            <div key={caption} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                {caption}
              </p>
              <RequestRepairPanel
                serviceId="svc_001"
                serviceTitle="iPhone Screen Replacement"
                idPrefix={`preview-repair-${index}`}
                {...props}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Auth states (A08 preview)"
        description="Sign-up and sign-in in default, error, success and submitting states — props only, no validation or auth logic. The decorative image panel is omitted here."
      >
        <div className="space-y-10">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
              Sign-up
            </h3>
            <div className="mt-3 grid gap-6 lg:grid-cols-2">
              {[
                { caption: "Default (idle)", props: {} },
                {
                  caption: "All fields with errors",
                  props: {
                    errors: {
                      name: "Full name is required",
                      email: "Enter a valid email address",
                      password: "Password must be at least 6 characters",
                      role: "Choose an account type",
                    },
                  },
                },
                {
                  caption: "Top alert - error",
                  props: {
                    status: "error",
                    message: "An account with this email already exists",
                  },
                },
                {
                  caption: "Top alert - success",
                  props: {
                    status: "success",
                    message:
                      "Account created. Redirecting to your dashboard...",
                  },
                },
                {
                  caption: "Submitting / loading",
                  props: { isSubmitting: true },
                },
              ].map(({ caption, props }) => (
                <div key={caption} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    {caption}
                  </p>
                  <Card className="p-5 sm:p-6">
                    <SignUpForm {...props} />
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
              Sign-in
            </h3>
            <div className="mt-3 grid gap-6 lg:grid-cols-2">
              {[
                { caption: "Default (idle)", props: {} },
                {
                  caption: "All fields with errors",
                  props: {
                    errors: {
                      email: "Enter a valid email address",
                      password: "Password must be at least 6 characters",
                    },
                  },
                },
                {
                  caption: "Top alert - error",
                  props: {
                    status: "error",
                    message: "Invalid email or password",
                  },
                },
                {
                  caption: "Top alert - success",
                  props: {
                    status: "success",
                    message: "Signed in. Redirecting to your dashboard...",
                  },
                },
                {
                  caption: "Submitting / loading",
                  props: { isSubmitting: true },
                },
              ].map(({ caption, props }) => (
                <div key={caption} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    {caption}
                  </p>
                  <Card className="p-5 sm:p-6">
                    <SignInForm {...props} />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Customer dashboard states (A08b preview)"
        description="Charts, empty bookings and payments, the bookings skeleton, the error presentation and a live confirmation dialog — all props only, no fetching or business logic."
      >
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Charts — status donut + category bars
            </p>
            <div className="mt-2 grid gap-6 lg:grid-cols-2">
              <DonutChart
                title="Bookings by status (sample)"
                centerLabel="bookings"
                data={[
                  {
                    label: "Requested",
                    value: 1,
                    color: "var(--color-status-requested)",
                  },
                  {
                    label: "Accepted",
                    value: 1,
                    color: "var(--color-status-accepted)",
                  },
                  {
                    label: "In Progress",
                    value: 1,
                    color: "var(--color-status-progress)",
                  },
                  {
                    label: "Completed",
                    value: 3,
                    color: "var(--color-status-completed)",
                  },
                  {
                    label: "Rejected",
                    value: 1,
                    color: "var(--color-status-rejected)",
                  },
                  {
                    label: "Cancelled",
                    value: 1,
                    color: "var(--color-status-cancelled)",
                  },
                ]}
              />
              <BarChart
                title="Bookings by category (sample)"
                data={[
                  { label: "Smartphone", value: 2 },
                  { label: "Laptop & PC", value: 1 },
                  { label: "AC", value: 1 },
                  { label: "Refrigerator", value: 1 },
                  { label: "Washing Machine", value: 2 },
                  { label: "TV", value: 1 },
                ]}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty bookings
            </p>
            <div className="mt-2">
              <BookingsSection bookings={[]} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty payments
            </p>
            <div className="mt-2">
              <PaymentsSection payments={[]} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Bookings loading skeleton
            </p>
            <div className="mt-2">
              <BookingsSection bookings={[]} loading />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Error presentation
            </p>
            <div className="mt-2">
              <ErrorState />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Cancel request dialog — click the trigger
            </p>
            <div className="mt-2">
              <ConfirmDialog
                title="Cancel this request?"
                description="This cancels your request for Split AC Deep Cleaning. You can book the service again later."
                confirmLabel="Cancel request"
                tone="danger"
                trigger={
                  <Button
                    type="button"
                    variant="ghost"
                    className="border border-danger/40 text-danger hover:bg-danger-soft"
                  >
                    Cancel request
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Technician dashboard states (A09 preview)"
        description="Approval badges, availability switches, the file picker, empty service/request lists, add-service error/success/submitting states and the edit modal — all presentation only."
      >
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Approval badges · switch states · file input
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ApprovalBadge status="pending" />
              <ApprovalBadge status="approved" />
              <ApprovalBadge status="rejected" />
            </div>
            <div className="mt-5 flex flex-wrap gap-8">
              <Switch
                id="preview-switch-on"
                label="Available"
                ariaLabel="Availability preview (on)"
                defaultChecked
              />
              <Switch
                id="preview-switch-off"
                label="Available"
                ariaLabel="Availability preview (off)"
              />
            </div>
            <div className="mt-5 max-w-md">
              <FileInput id="preview-file" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty my services
            </p>
            <div className="mt-2">
              <MyServicesSection services={[]} technician={technician} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty requests
            </p>
            <div className="mt-2">
              <RequestsSection requests={[]} idPrefix="preview-empty" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              List loading and error states
            </p>
            <div className="mt-2 space-y-6">
              <MyServicesSection
                services={[]}
                technician={technician}
                loading
              />
              <MyServicesSection services={[]} technician={technician} error />
              <RequestsSection requests={[]} loading idPrefix="preview-loading" />
              <RequestsSection requests={[]} error idPrefix="preview-error" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Add service — error, success and submitting
            </p>
            <div className="mt-2 space-y-6">
              <AddServiceSection
                technician={technician}
                status="error"
                errors={{
                  title: "Enter a service title.",
                  category: "Choose a category.",
                  basePrice: "Enter a starting price.",
                }}
                message="Check the highlighted fields and try again."
              />
              <AddServiceSection technician={technician} status="success" />
              <AddServiceSection technician={technician} isSubmitting />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Edit service modal — click the trigger
            </p>
            <div className="mt-2">
              <Modal
                title="Edit service"
                description="Update the listing details. The image is replaced only when you choose a new file."
                confirmLabel="Save changes"
                size="lg"
                trigger={
                  <Button
                    type="button"
                    variant="ghost"
                    className="border border-border-strong"
                  >
                    Edit service
                  </Button>
                }
              >
                <div className="space-y-5">
                  <Alert
                    variant="warning"
                    title="Saving changes sends this service back to pending review."
                  />
                  <ServiceFields
                    idPrefix="preview-edit-svc_preview"
                    service={PREVIEW_SERVICE}
                    technician={technician}
                  />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Admin dashboard states (A10 preview)"
        description="Role badges, the locked own-role row, and the empty, loading and error states for users, services, bookings and transactions — all presentation only."
      >
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Role badges
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RoleBadge role="customer" />
              <RoleBadge role="technician" />
              <RoleBadge role="admin" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Own-role row — select and Save disabled
            </p>
            <div className="mt-2">
              <UsersSection
                users={[currentAdmin]}
                currentUserId={currentAdmin._id}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty users
            </p>
            <div className="mt-2">
              <UsersSection users={[]} currentUserId={currentAdmin._id} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty services
            </p>
            <div className="mt-2">
              <AdminServicesSection
                services={[]}
                idPrefix="preview-admin-svc-empty"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty bookings
            </p>
            <div className="mt-2">
              <AdminBookingsSection
                bookings={[]}
                idPrefix="preview-admin-booking-empty"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Empty transactions
            </p>
            <div className="mt-2">
              <TransactionsSection payments={[]} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Loading lists
            </p>
            <div className="mt-2 space-y-6">
              <UsersSection users={[]} currentUserId={currentAdmin._id} loading />
              <AdminServicesSection
                services={[]}
                loading
                idPrefix="preview-admin-svc-loading"
              />
              <AdminBookingsSection
                bookings={[]}
                loading
                idPrefix="preview-admin-booking-loading"
              />
              <TransactionsSection payments={[]} loading />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Error states
            </p>
            <div className="mt-2 space-y-6">
              <UsersSection users={[]} error />
              <AdminServicesSection services={[]} error />
              <AdminBookingsSection bookings={[]} error />
              <TransactionsSection payments={[]} error />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Profile states (A11 preview)"
        description="Shared profile layout for each role, plus the field-error, success and submitting presentations — all presentation only."
      >
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Technician profile (bio helper visible)
            </p>
            <div className="mt-2">
              <ProfileSection
                user={PREVIEW_TECHNICIAN}
                idPrefix="preview-profile-tech"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Customer profile
            </p>
            <div className="mt-2">
              <ProfileSection
                user={profileUser}
                idPrefix="preview-profile-customer"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Error state with field errors
            </p>
            <div className="mt-2">
              <ProfileSection
                user={profileUser}
                idPrefix="preview-profile-error"
                status="error"
                errors={{
                  name: "Enter your full name.",
                  phone: "Enter a valid phone number.",
                }}
                message="We couldn't update your profile. Please review the fields and try again."
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Success state
            </p>
            <div className="mt-2">
              <ProfileSection
                user={PREVIEW_TECHNICIAN}
                idPrefix="preview-profile-success"
                status="success"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Submitting state
            </p>
            <div className="mt-2">
              <ProfileSection
                user={profileUser}
                idPrefix="preview-profile-submitting"
                isSubmitting
              />
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="System pages (A12 preview)"
        description="Payment outcomes, the 404 and access states, and the shared error fallbacks — all presentation only."
      >
        <div className="space-y-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Payment result — success
            </p>
            <div className="mt-2 rounded-card border border-dashed border-border-strong">
              <PaymentResult
                headingLevel="h2"
                status="success"
                amount={95}
                transactionId="pi_mock_0001"
                serviceTitle="Refrigerator Cooling Repair"
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Payment result — verifying
            </p>
            <div className="mt-2 rounded-card border border-dashed border-border-strong">
              <PaymentResult headingLevel="h2" status="verifying" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Payment result — error
            </p>
            <div className="mt-2 rounded-card border border-dashed border-border-strong">
              <PaymentResult
                headingLevel="h2"
                status="error"
                message="The payment reference could not be matched. Nothing has been charged twice — check your bookings before trying again."
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Payment cancelled
            </p>
            <div className="mt-2 rounded-card border border-dashed border-border-strong">
              <PaymentCancelled headingLevel="h2" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              404 — not found
            </p>
            <div className="mt-2 rounded-card border border-dashed border-border-strong">
              <NotFoundView headingLevel="h2" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              403 — forbidden (default dashboard link)
            </p>
            <div className="mt-2 rounded-card border border-dashed border-border-strong">
              <ForbiddenState headingLevel="h2" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Page error (without a retry handler)
            </p>
            <div className="mt-2 rounded-card border border-dashed border-border-strong p-4">
              <PageErrorView headingLevel="h2" />
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
}
