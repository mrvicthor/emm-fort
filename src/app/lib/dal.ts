import { cookies } from "next/headers";
import { decrypt } from "../actions/session";
import { redirect } from "next/navigation";
import { cache } from "react";
import User from "./schema";

export async function verifySession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
}

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await User.findById(session.userId);
    return {
      ...user,
      password: undefined,
      phoneNumber: undefined,
    };
  } catch (error) {
    console.log("Failed to fetch user: ", error);
    return null;
  }
});
