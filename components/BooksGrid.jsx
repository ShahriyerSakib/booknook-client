"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
import { CATEGORIES } from "@/lib/api";

export default function BooksGrid({ books }) {
  const params = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(CATEGORIES.includes(params.get("category")) ? params.get("category") : "All");

  const list = books.filter(
    (b) =>
      (cat === "All" || b.category === cat) &&
      (b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input className="input input-bordered w-full sm:max-w-sm" placeholder="Search by title or author" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="select select-bordered w-full sm:w-48" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {list.length === 0 ? (
        <p className="mt-10 rounded-box border border-dashed border-base-300 p-10 text-center">No books match your search. Try a different title or category.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => <BookCard key={b._id} book={b} />)}
        </div>
      )}
    </>
  );
}
