import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic proxy guard: check only for a Better Auth session cookie.
// Full session verification and role authorization happen server-side in
// dashboard/role layouts and in protected API routes.
export function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
