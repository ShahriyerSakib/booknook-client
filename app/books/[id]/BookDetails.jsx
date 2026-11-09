"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, fmtDate } from "@/lib/api";
import Spinner from "@/components/Spinner";

export default function BookDetails() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const modal = useRef(null);

  useEffect(() => {
    apiFetch(`/books/${id}`).then(setBook).catch((e) => setError(e.message));
  }, [id]);

  const borrow = async () => {
    setBusy(true);
    try {
      await apiFetch("/borrows", { method: "POST", body: JSON.stringify({ bookId: book._id }) });
      toast.success("Book borrowed! Find it in My Borrows.");
      setBook({ ...book, availableCopies: book.availableCopies - 1 });
      modal.current.close();
    } catch (e) {
      toast.error(e.message);
      modal.current.close();
    } finally {
      setBusy(false);
    }
  };

  if (error) return <div className="container-x py-20 text-center"><p className="text-error font-semibold">{error}</p></div>;
  if (!book) return <Spinner label="Loading book..." />;

  const out = book.availableCopies <= 0;
  return (
    <section className="container-x grid gap-10 pt-14 md:grid-cols-[360px_1fr]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={book.image} alt={book.title} className="h-[28rem] w-full rounded-box border border-base-300 object-cover shadow-lg" />
      <div className="space-y-4">
        <span className="badge badge-secondary">{book.category}</span>
        <h1 className="section-title">{book.title}</h1>
        <p className="text-lg opacity-80">by {book.author}</p>
        <p className="leading-relaxed">{book.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="catalog-card p-3"><span className="opacity-60">Available copies</span><p className="text-xl font-bold">{book.availableCopies} / {book.totalCopies}</p></div>
          <div className="catalog-card p-3"><span className="opacity-60">Added on</span><p className="text-xl font-bold">{fmtDate(book.createdAt)}</p></div>
        </div>
        <p className="text-sm opacity-70">Added by <b>{book.userName}</b> ({book.userEmail})</p>
        <button className="btn btn-primary rounded-lg" disabled={out} onClick={() => modal.current.showModal()}>
          {out ? "Not Available" : "Borrow This Book"}
        </button>
      </div>

      <dialog ref={modal} className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Borrow “{book.title}”</h3>
          <p className="mt-1 text-sm opacity-70">You can keep it for 7 days.</p>
          <div className="mt-4 space-y-3">
            <label className="form-control block">
              <span className="text-sm font-semibold">Name</span>
              <input className="input input-bordered mt-1 w-full" value={session?.user?.name || ""} readOnly />
            </label>
            <label className="form-control block">
              <span className="text-sm font-semibold">Email</span>
              <input className="input input-bordered mt-1 w-full" value={session?.user?.email || ""} readOnly />
            </label>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => modal.current.close()}>Cancel</button>
            <button className="btn btn-primary" onClick={borrow} disabled={busy}>
              {busy ? <span className="loading loading-spinner loading-sm" /> : "Confirm Borrow"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </section>
  );
}
