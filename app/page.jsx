import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { FaSearch, FaHandHolding, FaUndoAlt, FaFeatherAlt, FaFlask, FaLandmark, FaChild, FaLayerGroup } from "react-icons/fa";

export const dynamic = "force-dynamic";
export const metadata = { title: "BookNook | Home" };

async function getLatest() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?sort=latest&limit=6`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const steps = [
  { icon: <FaSearch />, title: "Find a book", text: "Search the shelves by title, author or category." },
  { icon: <FaHandHolding />, title: "Borrow it", text: "Log in, open the book and confirm. It is yours for seven days." },
  { icon: <FaUndoAlt />, title: "Return it", text: "Done reading? Return it from My Borrows so the next reader can enjoy it." },
];

const cats = [
  { name: "Fiction", icon: <FaFeatherAlt />, text: "Novels and stories" },
  { name: "Science", icon: <FaFlask />, text: "Ideas that explain the world" },
  { name: "History", icon: <FaLandmark />, text: "People and past events" },
  { name: "Kids", icon: <FaChild />, text: "Picture books and early readers" },
  { name: "Others", icon: <FaLayerGroup />, text: "Self-growth, art and more" },
];

export default async function Home() {
  const books = await getLatest();
  return (
    <>
      <HeroSlider />

      <section className="container-x pt-20">
        <Reveal>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-sub mt-2">The six newest books added to the library.</p>
        </Reveal>
        {books.length === 0 ? (
          <div className="mt-8 rounded-box border border-dashed border-base-300 p-10 text-center">
            <p className="font-semibold">No books on the shelves yet.</p>
            <p className="mt-1 text-sm opacity-70">Be the first to add one.</p>
            <Link href="/add-book" className="btn btn-primary mt-4 rounded-lg">Add Book</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((b) => <BookCard key={b._id} book={b} />)}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link href="/books" className="btn btn-primary rounded-lg">See All Books</Link>
        </div>
      </section>

      <section className="container-x pt-24">
        <Reveal>
          <h2 className="section-title">How Borrowing Works</h2>
          <p className="section-sub mt-2">Three steps from shelf to sofa.</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="h-full">
              <div className="catalog-card h-full p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl text-primary-content">{s.icon}</div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 opacity-75">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x pt-24">
        <Reveal>
          <h2 className="section-title">Top Categories</h2>
          <p className="section-sub mt-2">Pick a shelf and start exploring.</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {cats.map((c) => (
            <Link key={c.name} href={`/books?category=${c.name}`} className="catalog-card flex h-full flex-col items-center gap-2 p-5 text-center">
              <span className="text-3xl text-primary">{c.icon}</span>
              <span className="font-display text-lg font-bold">{c.name}</span>
              <span className="text-sm opacity-70">{c.text}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
