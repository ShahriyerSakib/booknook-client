import { Suspense } from "react";
import BooksGrid from "@/components/BooksGrid";
import Spinner from "@/components/Spinner";

export const dynamic = "force-dynamic";
export const metadata = { title: "BookNook | All Books" };

export default async function BooksPage() {
  let books = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, { cache: "no-store" });
    if (res.ok) books = await res.json();
  } catch {}
  return (
    <section className="container-x pt-14">
      <h1 className="section-title">All Books</h1>
      <p className="section-sub mt-2">Every book on the shelves, shared by readers like you.</p>
      <Suspense fallback={<Spinner />}>
        <BooksGrid books={books} />
      </Suspense>
    </section>
  );
}
