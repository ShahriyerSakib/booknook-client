"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const password = f.get("password");
    if (!/[A-Z]/.test(password)) return setPassError("Password must have an uppercase letter");
    if (!/[a-z]/.test(password)) return setPassError("Password must have a lowercase letter");
    if (password.length < 6) return setPassError("Password must be at least 6 characters long");
    setPassError("");
    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: f.get("name"), email: f.get("email"), password, image: f.get("photo"),
    });
    setBusy(false);
    if (error) {
      setError(error.message || "Registration failed");
      return toast.error(error.message || "Registration failed");
    }
    toast.success("Account created! Please log in.");
    router.push("/login");
  };

  return (
    <section className="container-x flex justify-center py-14">
      <div className="catalog-card w-full max-w-md p-8">
        <h1 className="section-title text-center">Create your account</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block"><span className="text-sm font-semibold">Name</span>
            <input name="name" required className="input input-bordered mt-1 w-full" placeholder="Your full name" /></label>
          <label className="block"><span className="text-sm font-semibold">Email</span>
            <input name="email" type="email" required className="input input-bordered mt-1 w-full" placeholder="you@example.com" /></label>
          <label className="block"><span className="text-sm font-semibold">Photo URL</span>
            <input name="photo" type="url" required className="input input-bordered mt-1 w-full" placeholder="https://..." /></label>
          <label className="block"><span className="text-sm font-semibold">Password</span>
            <input name="password" type="password" required className="input input-bordered mt-1 w-full" placeholder="Uppercase, lowercase, 6+ characters" />
            {passError && <span className="mt-1 block text-sm text-error" role="alert">{passError}</span>}</label>
          {error && <p className="rounded-lg bg-error/10 p-3 text-sm text-error" role="alert">{error}</p>}
          <button className="btn btn-primary w-full rounded-lg" disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Register"}
          </button>
        </form>
        <div className="divider">or</div>
        <button onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })} className="btn btn-outline w-full rounded-lg">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>
        <p className="mt-6 text-center text-sm">Already a member? <Link href="/login" className="link link-primary font-semibold">Login</Link></p>
      </div>
    </section>
  );
}
