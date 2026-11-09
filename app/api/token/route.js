import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const token = jwt.sign({ email: session.user.email, name: session.user.name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return Response.json({ token });
}
