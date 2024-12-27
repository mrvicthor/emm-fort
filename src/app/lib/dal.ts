import { cookies } from "next/headers";
import { decrypt } from "../actions/session";

export async function verifySession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
}
