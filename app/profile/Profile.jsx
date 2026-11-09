"use client";
import { authClient } from "@/lib/auth-client";
export default function Profile() {
  const { data: session } = authClient.useSession();
  const u = session?.user;
  return (
    <section className="container-x flex justify-center py-14">
      <div className="catalog-card w-full max-w-md p-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={u?.image || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(u?.name || "U")}`} alt={u?.name} className="mx-auto h-28 w-28 rounded-full object-cover ring ring-primary ring-offset-4 ring-offset-base-100" />
        <h1 className="section-title mt-5">{u?.name}</h1>
        <p className="mt-1 opacity-75">{u?.email}</p>
      </div>
    </section>
  );
}
