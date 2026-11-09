import PrivateRoute from "@/components/PrivateRoute";
import AddBookForm from "./AddBookForm";
export const metadata = { title: "BookNook | Add Book" };
export default function Page() { return <PrivateRoute><AddBookForm /></PrivateRoute>; }
