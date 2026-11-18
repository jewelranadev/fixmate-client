import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Headings — geometric-humanist display face (A01 decision)
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

// Body/UI — high-readability workhorse (A01 decision)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: {
    default: "FixMate — Book expert device & appliance repair",
    template: "%s | FixMate",
  },
  description:
    "FixMate connects you with verified technicians for smartphones, laptops, air conditioners, refrigerators, TVs, washing machines and electrical work. Book in minutes and track every step of the repair.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
