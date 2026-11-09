"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/";
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    setBusy(false);
    if (error) {
      setError(error.message || "Invalid email or password");
      return toast.error(error.message || "Invalid email or password");
    }
    toast.success("Welcome back!");
    router.push(redirect);
  };

  const google = () => authClient.signIn.social({ provider: "google", callbackURL: redirect });

  return (
    <section className="container-x flex justify-center py-14">
      <div className="catalog-card w-full max-w-md p-8">
        <h1 className="section-title text-center">Login to BookNook</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block"><span className="text-sm font-semibold">Email</span>
            <input name="email" type="email" required className="input input-bordered mt-1 w-full" placeholder="you@example.com" /></label>
          <label className="block"><span className="text-sm font-semibold">Password</span>
            <input name="password" type="password" required className="input input-bordered mt-1 w-full" placeholder="Your password" /></label>
          <button type="button" onClick={() => toast("Password reset is not available yet.")} className="link link-hover text-sm">Forgot password?</button>
          {error && <p className="rounded-lg bg-error/10 p-3 text-sm text-error" role="alert">{error}</p>}
          <button className="btn btn-primary w-full rounded-lg" disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}
          </button>
        </form>
        <div className="divider">or</div>
        <button onClick={google} className="btn btn-outline w-full rounded-lg"><FcGoogle className="text-xl" /> Continue with Google</button>
        <p className="mt-6 text-center text-sm">New to BookNook? <Link href="/register" className="link link-primary font-semibold">Create an account</Link></p>
      </div>
    </section>
  );
}
