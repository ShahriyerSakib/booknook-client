import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata = {
  title: "BookNook | Home",
  description: "BookNook is a small online library. Add a book, borrow a book, return a book.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="booknook" suppressHydrationWarning className={`${bricolage.variable} ${figtree.variable}`}>
      <body className="min-h-screen bg-base-100 text-base-content">
        <Providers>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
