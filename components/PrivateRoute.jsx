"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isPending, session, pathname, router]);

  if (isPending || !session) return <Spinner />;
  return children;
}
