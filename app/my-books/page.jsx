import PrivateRoute from "@/components/PrivateRoute";
import MyBooks from "./MyBooks";
export const metadata = { title: "BookNook | My Books" };
export default function Page() { return <PrivateRoute><MyBooks /></PrivateRoute>; }
