// Public Navbar — sticky, "Steady Signal" system.
// Logged-out: Sign In (ghost) + Sign Up (primary). Logged-in: UserMenu
// dropdown. Below 768px: MobileNav hamburger panel. This file stays a server
// component; interactivity lives in NavLinks/UserMenu/MobileNav.

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

export default function Navbar({ user = null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Logo href="/" />
          <div className="hidden md:block">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <div className="hidden md:block">
              <UserMenu user={user} />
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" href="/sign-in">
                Sign In
              </Button>
              <Button variant="primary" href="/sign-up">
                Sign Up
              </Button>
            </div>
          )}
          <MobileNav user={user} />
        </div>
      </Container>
    </header>
  );
}
