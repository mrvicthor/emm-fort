import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "../lib/definitions";
import mongoose from "mongoose";
import { SessionModel } from "../lib/schema";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session: ", error);
    return null;
  }
}

export async function createSession(id: mongoose.Types.ObjectId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // create a session in the db
  await SessionModel.create({
    userId: id,
    expiresAt,
  });

  const session = await encrypt({ userId: id, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  const now = Date.now();
  if (!session || !payload) return null;

  const sessionInDatabase = await SessionModel.findById(payload.userId);

  if (sessionInDatabase && sessionInDatabase.expiresAt.getTime() > now)
    return {
      message: "Session expired",
    };

  // refresh session if it expires in the next 24 hrs
  const sessionNeedsRefresh =
    sessionInDatabase.expiresAt.getTime() - now <= 24 * 60 * 60 * 1000;

  if (sessionNeedsRefresh) {
    sessionInDatabase.expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );
    await sessionInDatabase.save();
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
