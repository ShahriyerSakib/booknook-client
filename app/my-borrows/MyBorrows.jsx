"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiFetch, fmtDate } from "@/lib/api";
import Spinner from "@/components/Spinner";

export default function MyBorrows() {
  const [rows, setRows] = useState(null);
  const [returning, setReturning] = useState("");

  useEffect(() => {
    apiFetch("/borrows").then(setRows).catch((e) => { toast.error(e.message); setRows([]); });
  }, []);

  const giveBack = async (id) => {
    setReturning(id);
    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" });
      setRows(rows.filter((r) => r._id !== id));
      toast.success("Book returned. Thank you!");
    } catch (e) { toast.error(e.message); }
    finally { setReturning(""); }
  };

  if (!rows) return <Spinner label="Loading your borrows..." />;

  return (
    <section className="container-x pt-14">
      <h1 className="section-title">My Borrows</h1>
      <p className="section-sub mt-2">Books you currently have. Return them when you finish reading.</p>
      {rows.length === 0 ? (
        <div className="mt-8 rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="font-semibold">You have no borrowed books.</p>
          <Link href="/books" className="btn btn-primary mt-4 rounded-lg">Browse Books</Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead><tr><th>Cover</th><th>Title</th><th>Borrow Date</th><th>Return Date</th><th className="text-right">Action</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <td><img src={r.bookImage} alt={r.bookTitle} className="h-16 w-12 rounded object-cover" /></td>
                  <td className="font-semibold">{r.bookTitle}</td>
                  <td>{fmtDate(r.borrowDate)}</td>
                  <td>{fmtDate(r.returnDate)}</td>
                  <td className="text-right">
                    <button onClick={() => giveBack(r._id)} disabled={returning === r._id} className="btn btn-sm btn-primary rounded-lg">
                      {returning === r._id ? <span className="loading loading-spinner loading-xs" /> : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
