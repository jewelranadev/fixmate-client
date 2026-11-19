import { CalendarDays, Mail, ShieldCheck } from "lucide-react";
import Alert from "@/components/ui/Alert";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import FileInput from "@/components/ui/FileInput";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import RoleBadge from "@/components/shared/RoleBadge";
import { formatDate } from "@/lib/format/display";

/**
 * ProfileSection — shared profile page presentation for all three roles.
 *
 * Server component. No upload, no saving, no validation and no session read:
 * every state is prop-driven so the owner can wire real auth later.
 *
 * The form never submits natively: the first submit button is a permanently
 * disabled sr-only default button, and the visible action is type="button".
 * Wired by owner in M11 (ImgBB upload, PATCH /api/users/profile, refresh
 * navbar/topbar without logout).
 */

const ROLE_LABELS = {
  customer: "Customer",
  technician: "Technician",
  admin: "Admin",
};

function ReadOnlyField({ id, name, label, value, Icon }) {
  return (
    <Field label={label} htmlFor={id} helper="Cannot be changed">
      <div className="relative">
        <Input
          id={id}
          name={name}
          type="text"
          value={value}
          readOnly
          aria-readonly="true"
          aria-describedby={`${id}-helper`}
          className="pr-10"
        />
        {Icon && (
          <Icon
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
        )}
      </div>
    </Field>
  );
}

export default function ProfileSection({
  user,
  errors = {},
  status = "idle",
  message = "",
  isSubmitting = false,
  // Unique id prefix: repeated preview instances must not collide.
  idPrefix = "profile",
}) {
  const roleLabel = ROLE_LABELS[user.role] || user.role;
  const isTechnician = user.role === "technician";

  const describedBy = (name, helper = false) => {
    if (errors[name]) return `${idPrefix}-${name}-error`;
    return helper ? `${idPrefix}-${name}-helper` : undefined;
  };

  const errorMessage =
    message || "We couldn't update your profile. Please review the fields and try again.";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-start">
      {/* ---------------------------------------------------------- identity */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar
            src={user.image || null}
            name={user.name}
            alt={user.name}
            size="lg"
          />
          <h2 className="mt-3 text-lg font-bold text-ink">{user.name}</h2>
          <p className="mt-0.5 break-all text-sm text-muted">{user.email}</p>
          <RoleBadge role={user.role} className="mt-3" />
        </div>

        <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays
              className="size-4 shrink-0 text-muted"
              aria-hidden="true"
            />
            <dt className="text-muted">Member since</dt>
            <dd className="font-medium text-foreground">
              {formatDate(user.createdAt)}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="size-4 shrink-0 text-muted"
              aria-hidden="true"
            />
            <dt className="text-muted">Signed in as</dt>
            <dd className="font-medium text-foreground">{roleLabel}</dd>
          </div>
        </dl>

        {isTechnician && (
          <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted">
            Your bio is shown to customers on your service pages.
          </p>
        )}
      </Card>

      {/* ------------------------------------------------------------ edit */}
      <Card className="p-5 sm:p-6">
        <h2 className="text-lg font-bold text-ink">Profile details</h2>
        <p className="mt-1 text-sm text-muted">
          Update how your name and contact details appear across FixMate.
        </p>

        <form noValidate className="mt-5 space-y-5">
          {/*
            Native submission guard. Pressing Enter fires a click on the form's
            default (first submit) button — this one is permanently disabled, so
            the form can never submit natively.
          */}
          <button
            type="submit"
            disabled
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
          >
            Save
          </button>

          {status === "success" && (
            <Alert variant="success" title="Profile updated successfully" />
          )}

          {status === "error" && (
            <Alert variant="error" title={errorMessage} />
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              htmlFor={`${idPrefix}-name`}
              error={errors.name}
              required
            >
              <Input
                id={`${idPrefix}-name`}
                name="name"
                type="text"
                defaultValue={user.name}
                autoComplete="name"
                placeholder="Your full name"
                error={Boolean(errors.name)}
                disabled={isSubmitting}
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={describedBy("name")}
              />
            </Field>

            <Field
              label="Phone"
              htmlFor={`${idPrefix}-phone`}
              error={errors.phone}
              helper="Used by technicians to reach you about a booking."
            >
              <Input
                id={`${idPrefix}-phone`}
                name="phone"
                type="tel"
                defaultValue={user.phone}
                autoComplete="tel"
                placeholder="+880 1XXX XXX XXX"
                error={Boolean(errors.phone)}
                disabled={isSubmitting}
                aria-invalid={errors.phone ? "true" : undefined}
                aria-describedby={describedBy("phone", true)}
              />
            </Field>

            <Field
              label="Area"
              htmlFor={`${idPrefix}-area`}
              error={errors.area}
              helper="City and neighbourhood, e.g. Mirpur, Dhaka."
            >
              <Input
                id={`${idPrefix}-area`}
                name="area"
                type="text"
                defaultValue={user.area}
                autoComplete="address-level2"
                placeholder="e.g. Dhanmondi, Dhaka"
                error={Boolean(errors.area)}
                disabled={isSubmitting}
                aria-invalid={errors.area ? "true" : undefined}
                aria-describedby={describedBy("area", true)}
              />
            </Field>

            <ReadOnlyField
              id={`${idPrefix}-email`}
              name="email"
              label="Email"
              value={user.email}
              Icon={Mail}
            />

            <div className="sm:col-span-2">
              <Field
                label="Bio"
                htmlFor={`${idPrefix}-bio`}
                error={errors.bio}
                helper="Technicians: describe your skills and experience."
              >
                <Textarea
                  id={`${idPrefix}-bio`}
                  name="bio"
                  rows={4}
                  defaultValue={user.bio}
                  placeholder="A short introduction customers will see."
                  error={Boolean(errors.bio)}
                  disabled={isSubmitting}
                  aria-invalid={errors.bio ? "true" : undefined}
                  aria-describedby={describedBy("bio", true)}
                />
              </Field>
            </div>

            <ReadOnlyField
              id={`${idPrefix}-role`}
              name="role"
              label="Role"
              value={roleLabel}
              Icon={ShieldCheck}
            />

            <div className="space-y-2 sm:col-span-2">
              <FileInput
                id={`${idPrefix}-image`}
                name="image"
                label="Profile photo"
                hint="PNG or JPG, max 2 MB"
              />
              {errors.image && (
                <p id={`${idPrefix}-image-error`} className="text-xs text-danger">
                  {errors.image}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              Your email and role are managed by FixMate support.
            </p>
            {/* Wired by owner in M11 (ImgBB upload, PATCH /api/users/profile,
                refresh navbar/topbar without logout). */}
            <Button
              type="button"
              loading={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
