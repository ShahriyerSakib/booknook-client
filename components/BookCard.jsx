import Link from "next/link";

export default function BookCard({ book }) {
  const out = book.availableCopies <= 0;
  return (
    <div className="catalog-card flex h-full flex-col overflow-hidden">
      <div className="relative h-64 w-full bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.image} alt={book.title} className="h-64 w-full object-cover" loading="lazy" />
        <span className="badge badge-secondary absolute left-3 top-3">{book.category}</span>
        {out && <span className="stamp absolute right-3 top-3 bg-base-100 px-2 py-0.5 text-xs font-bold">Checked out</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-1 text-lg font-bold">{book.title}</h3>
        <p className="line-clamp-1 text-sm opacity-70">by {book.author}</p>
        <Link href={`/books/${book._id}`} className="btn btn-primary mt-auto w-full rounded-lg">
          View Details
        </Link>
      </div>
    </div>
  );
}
