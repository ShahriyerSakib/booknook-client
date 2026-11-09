import Link from "next/link";
export const metadata = { title: "BookNook | Page Not Found" };
export default function NotFound() {
  return (
    <div className="container-x flex min-h-[65vh] flex-col items-center justify-center gap-4 text-center">
      <div className="stamp px-5 py-2 text-5xl font-bold">404</div>
      <h1 className="section-title">This page is missing from the shelf</h1>
      <p className="section-sub">The link may be broken, or the page was moved. Head back home and keep browsing.</p>
      <Link href="/" className="btn btn-primary rounded-lg">Back to Home</Link>
    </div>
  );
}
