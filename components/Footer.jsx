import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral text-neutral-content">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm opacity-80">
            A small online library. Add a book, borrow a book, return a book.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="text-lg font-bold">Explore</h3>
          <ul className="space-y-1 opacity-80">
            <li><Link href="/books" className="hover:underline">All Books</Link></li>
            <li><Link href="/add-book" className="hover:underline">Add a Book</Link></li>
            <li><Link href="/my-borrows" className="hover:underline">My Borrows</Link></li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <h3 className="text-lg font-bold">Contact</h3>
          <p className="opacity-80">hello@booknook.app<br />+880 1700-000000<br />Gazipur, Dhaka, Bangladesh</p>
          <div className="flex gap-3 text-lg">
            <a href="https://x.com" aria-label="X" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost border-neutral-content/30"><FaXTwitter /></a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost border-neutral-content/30"><FaFacebookF /></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost border-neutral-content/30"><FaInstagram /></a>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer" className="btn btn-circle btn-sm btn-ghost border-neutral-content/30"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-content/15 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
