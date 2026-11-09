import Link from "next/link";
export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="BookNook logo" className="h-9 w-9" />
      <span className="font-display text-2xl font-bold">BookNook</span>
    </Link>
  );
}
