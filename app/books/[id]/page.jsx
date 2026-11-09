import PrivateRoute from "@/components/PrivateRoute";
import BookDetails from "./BookDetails";
export const metadata = { title: "BookNook | Book Details" };
export default function Page() {
  return <PrivateRoute><BookDetails /></PrivateRoute>;
}
