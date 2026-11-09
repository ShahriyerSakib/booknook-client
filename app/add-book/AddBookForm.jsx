"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, uploadImage, CATEGORIES } from "@/lib/api";

export default function AddBookForm() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    try {
      const image = await uploadImage(f.get("image"));
      await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          title: f.get("title"), author: f.get("author"), category: f.get("category"),
          description: f.get("description"), totalCopies: Number(f.get("totalCopies")), image,
        }),
      });
      toast.success("Book added successfully");
      form.reset();
      router.push("/my-books");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="container-x flex justify-center py-14">
      <div className="catalog-card w-full max-w-2xl p-8">
        <h1 className="section-title">Add a Book</h1>
        <p className="section-sub mt-1">Share a book with other readers.</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block"><span className="text-sm font-semibold">Book Title</span>
            <input name="title" required className="input input-bordered mt-1 w-full" /></label>
          <label className="block"><span className="text-sm font-semibold">Author Name</span>
            <input name="author" required className="input input-bordered mt-1 w-full" /></label>
          <label className="block"><span className="text-sm font-semibold">Category</span>
            <select name="category" required defaultValue="" className="select select-bordered mt-1 w-full">
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select></label>
          <label className="block"><span className="text-sm font-semibold">Total Copies</span>
            <input name="totalCopies" type="number" min="1" defaultValue="1" required className="input input-bordered mt-1 w-full" /></label>
          <label className="block md:col-span-2"><span className="text-sm font-semibold">Book Image</span>
            <input name="image" type="file" accept="image/*" required className="file-input file-input-bordered mt-1 w-full" /></label>
          <label className="block md:col-span-2"><span className="text-sm font-semibold">Short Description</span>
            <textarea name="description" required rows={4} className="textarea textarea-bordered mt-1 w-full" /></label>
          <label className="block"><span className="text-sm font-semibold">Your Name</span>
            <input className="input input-bordered mt-1 w-full" value={session?.user?.name || ""} readOnly /></label>
          <label className="block"><span className="text-sm font-semibold">Your Email</span>
            <input className="input input-bordered mt-1 w-full" value={session?.user?.email || ""} readOnly /></label>
          <button className="btn btn-primary rounded-lg md:col-span-2" disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Add Book"}
          </button>
        </form>
      </div>
    </section>
  );
}
