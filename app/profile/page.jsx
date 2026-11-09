import PrivateRoute from "@/components/PrivateRoute";
import Profile from "./Profile";
export const metadata = { title: "BookNook | My Profile" };
export default function Page() { return <PrivateRoute><Profile /></PrivateRoute>; }
