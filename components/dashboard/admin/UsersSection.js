import { Users as UsersIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Avatar from "@/components/ui/Avatar";
import Select from "@/components/ui/Select";
import RoleBadge from "@/components/shared/RoleBadge";
import ResponsiveDataList from "@/components/dashboard/ResponsiveDataList";
import { formatDate } from "@/lib/format/display";

/**
 * Admin UsersSection — presentational only.
 *
 * The role control is a plain <select> + type="button" Save. Nothing is
 * patched; the select is disabled on the signed-in admin's own row.
 * Wired by owner in M12: PATCH /api/admin/users/:id/role.
 */
function RoleControl({ user, currentUserId, variant, onChangeRole }) {
  const isSelf = user._id === currentUserId;
  const selectId = `role-${variant}-${user._id}`;
  const helperId = `role-${variant}-${user._id}-helper`;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Select
          id={selectId}
          name="role"
          defaultValue={user.role}
          disabled={isSelf}
          aria-label={`Role for ${user.name}`}
          aria-describedby={isSelf ? helperId : undefined}
          className="w-full min-w-32"
        >
          <option value="customer">Customer</option>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
        </Select>
        {/* Wired by owner in M12: PATCH /api/admin/users/:id/role. */}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={isSelf}
          className="min-h-11 shrink-0 border border-border-strong"
          onClick={
            onChangeRole
              ? () =>
                  onChangeRole(
                    user._id,
                    document.getElementById(selectId)?.value,
                  )
              : undefined
          }
        >
          Save
        </Button>
      </div>
      {isSelf && (
        <p id={helperId} className="text-xs text-muted">
          You can&apos;t change your own role
        </p>
      )}
    </div>
  );
}

function UserIdentity({ user }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar name={user.name} alt={user.name} size="md" />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {user.name}
        </p>
        <p className="text-xs text-muted">{user.area}</p>
      </div>
    </div>
  );
}

function Email({ user }) {
  return (
    <span
      title={user.email}
      className="block max-w-56 truncate text-sm text-foreground"
    >
      {user.email}
    </span>
  );
}

function Joined({ user }) {
  return (
    <span className="whitespace-nowrap text-sm text-foreground">
      {formatDate(user.createdAt)}
    </span>
  );
}

function UserCard({ user, currentUserId, onChangeRole }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <UserIdentity user={user} />
        <RoleBadge role={user.role} className="shrink-0" />
      </div>

      <dl className="grid grid-cols-1 gap-y-2 border-t border-border pt-3">
        <div>
          <dt className="text-xs text-muted">Email</dt>
          <dd className="mt-0.5">
            <Email user={user} />
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Joined</dt>
          <dd className="mt-0.5">
            <Joined user={user} />
          </dd>
        </div>
      </dl>

      <div className="border-t border-border pt-3">
        <p className="mb-1.5 text-xs font-medium text-muted">Change role</p>
        <RoleControl user={user} currentUserId={currentUserId} variant="card" onChangeRole={onChangeRole} />
      </div>
    </div>
  );
}

export default function UsersSection({
  users = [],
  currentUserId = null,
  loading = false,
  error = false,
  onChangeRole,
}) {
  if (error) {
    return (
      <ErrorState
        title="We couldn't load the user directory"
        description="User accounts are unavailable right now. Try again in a moment."
      />
    );
  }

 return (
  <ResponsiveDataList
    label="Users"
    loading={loading}
    rows={users}
    rowKey={(user) => user._id}
    minWidthClass="min-w-[1000px]"
    skeletonRows={6}
    empty={
      <EmptyState
        icon={UsersIcon}
        title="No users found"
        description="Registered customers, technicians and admins will appear here once accounts exist."
      />
    }
    columns={[
      {
        key: "user",
        header: "User",
        render: (user) => <UserIdentity user={user} />,
      },
      {
        key: "email",
        header: "Email",
        render: (user) => <Email user={user} />,
      },
      {
        key: "role",
        header: "Role",
        render: (user) => <RoleBadge role={user.role} />,
      },
      {
        key: "createdAt",
        header: "Joined",
        render: (user) => <Joined user={user} />,
      },
      {
        key: "actions",
        header: "Change role",
        render: (user) => (
          <RoleControl
            user={user}
            currentUserId={currentUserId}
            variant="table"
            onChangeRole={onChangeRole}
          />
        ),
      },
    ]}
    renderCard={(user) => (
      <UserCard
        user={user}
        currentUserId={currentUserId}
        onChangeRole={onChangeRole}
      />
    )}
  />
);
}
