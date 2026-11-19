
import Footer from "@/components/layout/Footer";
import NotFoundView from "@/components/system/NotFoundView";
import SessionNavbar from "@/components/layout/SessionNavbar";

export const metadata = {
  title: "Page not found",
  description:
    "The page you were looking for could not be found. Browse FixMate services or head back home.",
};

// The root not-found file handles every unmatched URL. It is rendered inside
// the root layout but NOT inside the public route-group layout, so the public
// Navbar and Footer are composed here explicitly.
export default function NotFound() {
  return (
    <>
      <SessionNavbar />
      <main className="flex-1">
        <NotFoundView />
      </main>
      <Footer />
    </>
  );
}
