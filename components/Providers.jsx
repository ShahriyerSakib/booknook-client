"use client";
import { Toaster } from "react-hot-toast";
export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3500, style: { borderRadius: "10px" } }} />
    </>
  );
}
