"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMoon, FaSun } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("bn-theme") === "dark") {
        setDark(true);
        document.documentElement.setAttribute("data-theme", "booknook-dark");
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "booknook-dark" : "booknook");
    try { localStorage.setItem("bn-theme", next ? "dark" : "light"); } catch {}
  };

  const logout = async () => {
    await authClient.signOut();
    toast.success("Logged out");
    router.push("/");
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    ...(session
      ? [
          { href: "/add-book", label: "Add Book" },
          { href: "/my-books", label: "My Books" },
          { href: "/my-borrows", label: "My Borrows" },
        ]
      : []),
  ];

  const navLinks = links.map((l) => (
    <li key={l.href}>
      <Link href={l.href} className={pathname === l.href ? "font-bold text-primary" : ""}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="container-x navbar px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h12" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow">
              {navLinks}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="User" src={session.user.image || "https://api.dicebear.com/9.x/initials/svg?seed=" + encodeURIComponent(session.user.name)} />
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow">
                <li className="menu-title">{session.user.name}</li>
                <li><Link href="/profile">My Profile</Link></li>
                <li><button onClick={logout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-primary btn-sm sm:btn-md rounded-lg">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md rounded-lg">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
