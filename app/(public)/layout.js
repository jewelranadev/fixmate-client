// Public route group layout: Navbar + content + Footer.
// Dashboard routes live in app/(dashboard) and do NOT get this chrome.


import Footer from "@/components/layout/Footer";
import SessionNavbar from "@/components/layout/SessionNavbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <SessionNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
