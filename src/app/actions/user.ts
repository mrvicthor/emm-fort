"use server";

import connectToDatabase from "../db";
import { verifySession } from "../lib/dal";
import {
  AddtierActionResponse,
  AddTierFormData,
  AddTierSchema,
} from "../lib/definitions";
import User from "../lib/schema";

export async function addTier(
  state: AddtierActionResponse | null,
  formData: FormData
) {
  connectToDatabase();

  const rawData: AddTierFormData = {
    tier: formData.get("tier") as string,
  };

  const validatedFields = AddTierSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please choose an option",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const { tier } = validatedFields.data;

  const session = await verifySession();

  await User.findByIdAndUpdate(
    session.userId,
    {
      tier,
    },
    { new: true }
  );

  return {
    success: true,
    message: "Add tier successful..",
  };
}
