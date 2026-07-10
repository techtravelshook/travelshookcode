import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin-token")?.value;

  if (!token) return null;

  return verifyToken(token);
}