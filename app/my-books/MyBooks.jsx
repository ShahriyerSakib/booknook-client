"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, uploadImage, CATEGORIES } from "@/lib/api";
import Spinner from "@/components/Spinner";

export default function MyBooks() {
  const { data: session } = authClient.useSession();
  const [books, setBooks] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const editModal = useRef(null);
  const delModal = useRef(null);

  useEffect(() => {
    if (!session) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?email=${encodeURIComponent(session.user.email)}`)
      .then((r) => r.json()).then(setBooks).catch(() => toast.error("Could not load your books"));
  }, [session]);

  const openEdit = (b) => { setEditing(b); editModal.current.showModal(); };
  const openDelete = (b) => { setDeleting(b); delModal.current.showModal(); };

  const saveEdit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      let image = editing.image;
      const file = f.get("image");
      if (file && file.size > 0) image = await uploadImage(file);
      const updated = {
        title: f.get("title"), author: f.get("author"), category: f.get("category"),
        description: f.get("description"), image,
      };
      await apiFetch(`/books/${editing._id}`, { method: "PATCH", body: JSON.stringify(updated) });
      setBooks(books.map((b) => (b._id === editing._id ? { ...b, ...updated } : b)));
      toast.success("Book updated successfully");
      editModal.current.close();
    } catch (err) { toast.error(err.message); }
    finally { setBusy(false); }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks(books.filter((b) => b._id !== deleting._id));
      toast.success("Book deleted");
      delModal.current.close();
    } catch (err) { toast.error(err.message); }
    finally { setBusy(false); }
  };

  if (!books) return <Spinner label="Loading your books..." />;

  return (
    <section className="container-x pt-14">
      <h1 className="section-title">My Books</h1>
      <p className="section-sub mt-2">Books you added to the library. Edit the details or remove a book.</p>

      {books.length === 0 ? (
        <div className="mt-8 rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="font-semibold">You haven&apos;t added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary mt-4 rounded-lg">Add Book</Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead><tr><th>Cover</th><th>Title</th><th>Author</th><th>Category</th><th>Copies</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <td><img src={b.image} alt={b.title} className="h-16 w-12 rounded object-cover" /></td>
                  <td className="font-semibold">{b.title}</td>
                  <td>{b.author}</td>
                  <td><span className="badge badge-secondary">{b.category}</span></td>
                  <td>{b.availableCopies} / {b.totalCopies}</td>
                  <td className="space-x-2 text-right">
                    <button onClick={() => openEdit(b)} className="btn btn-sm btn-primary rounded-lg">Edit</button>
                    <button onClick={() => openDelete(b)} className="btn btn-sm btn-error btn-outline rounded-lg">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit modal */}
      <dialog ref={editModal} className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="text-xl font-bold">Edit book</h3>
          {editing && (
            <form key={editing._id} onSubmit={saveEdit} className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="block"><span className="text-sm font-semibold">Title</span>
                <input name="title" defaultValue={editing.title} required className="input input-bordered mt-1 w-full" /></label>
              <label className="block"><span className="text-sm font-semibold">Author</span>
                <input name="author" defaultValue={editing.author} required className="input input-bordered mt-1 w-full" /></label>
              <label className="block md:col-span-2"><span className="text-sm font-semibold">Category</span>
                <select name="category" defaultValue={editing.category} className="select select-bordered mt-1 w-full">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select></label>
              <label className="block md:col-span-2"><span className="text-sm font-semibold">Replace image (optional)</span>
                <input name="image" type="file" accept="image/*" className="file-input file-input-bordered mt-1 w-full" /></label>
              <label className="block md:col-span-2"><span className="text-sm font-semibold">Description</span>
                <textarea name="description" defaultValue={editing.description} required rows={4} className="textarea textarea-bordered mt-1 w-full" /></label>
              <div className="modal-action md:col-span-2">
                <button type="button" className="btn" onClick={() => editModal.current.close()}>Cancel</button>
                <button className="btn btn-primary" disabled={busy}>{busy ? <span className="loading loading-spinner loading-sm" /> : "Save changes"}</button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>

      {/* Delete confirm modal */}
      <dialog ref={delModal} className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Delete this book?</h3>
          <p className="mt-2 opacity-80">“{deleting?.title}” will be removed from the library. This cannot be undone.</p>
          <div className="modal-action">
            <button className="btn" onClick={() => delModal.current.close()}>Cancel</button>
            <button className="btn btn-error" onClick={confirmDelete} disabled={busy}>
              {busy ? <span className="loading loading-spinner loading-sm" /> : "Delete book"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </section>
  );
}
