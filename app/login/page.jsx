import { Suspense } from "react";
import LoginForm from "./LoginForm";
import Spinner from "@/components/Spinner";
export const metadata = { title: "BookNook | Login" };
export default function Page() {
  return <Suspense fallback={<Spinner />}><LoginForm /></Suspense>;
}
