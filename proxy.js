import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const SECTION_ROLE = [
  ["/dashboard/customer", "customer"],
  ["/dashboard/technician", "technician"],
  ["/dashboard/admin", "admin"],
];

function requiredRole(pathname) {
  const match = SECTION_ROLE.find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  return match?.[1];
}

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;

  let session = null;
  try {
    session = await auth.api.getSession({ headers: request.headers });
  } catch {
    // Fail closed for protected dashboard routes when session verification fails.
    session = null;
  }

  const user = session?.user;
  if (!user) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  const role = requiredRole(pathname);
  if (role && user.role !== role) {
    // Send users to their own dashboard; DashboardGuard renders the forbidden
    // state for in-app navigation, but proxy prevents direct URL access.
    const target =
      user.role === "admin"
        ? "/dashboard/admin"
        : user.role === "technician"
          ? "/dashboard/technician"
          : "/dashboard/customer";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
