import PrivateRoute from "@/components/PrivateRoute";
import MyBorrows from "./MyBorrows";
export const metadata = { title: "BookNook | My Borrows" };
export default function Page() { return <PrivateRoute><MyBorrows /></PrivateRoute>; }
