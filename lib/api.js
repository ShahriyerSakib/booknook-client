const API = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, options = {}) {
  const tokenRes = await fetch("/api/token", { cache: "no-store" });
  if (!tokenRes.ok) throw new Error("Please log in again");
  const { token } = await tokenRes.json();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
    method: "POST",
    body: fd,
  });
  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed. Try a smaller image.");
  return data.data.url;
}

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];
