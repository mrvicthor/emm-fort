"use server";
import bcrypt from "bcryptjs";
import {
  LoginActionResponse,
  LoginFormData,
  LoginFormSchema,
  SignupActionResponse,
  SignupFormData,
  signupFormSchema,
} from "../lib/definitions";
import connectToDatabase from "../db";
import User, { VerificationTokenModel } from "../lib/schema";
import { sendVerificationEmail } from "../mailer/sendMail";
import { createSession, deleteSession } from "./session";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

const APP_ORIGIN = "http://localhost:3000";
export async function signup(
  state: SignupActionResponse | null,
  formData: FormData
) {
  connectToDatabase();

  const rawData: SignupFormData = {
    name: formData.get("fullName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    referral: formData.get("referral") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = signupFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix errors in the form",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const { name, username, email, phoneNumber, referral, password } =
    validatedFields.data;

  const existingUser =
    (await User.exists({ email })) || (await User.exists({ phoneNumber }));

  if (existingUser) {
    return {
      success: false,
      message: "User already exist.",
      inputs: rawData,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    username,
    email,
    phoneNumber,
    password: hashedPassword,
    referredBy: referral,
  });

  const userId = user._id;
  const verificationToken = await VerificationTokenModel.create({
    userId,
    type: "email_verification",
    expiresAt: Date.now(),
  });

  const url = `${APP_ORIGIN}/email-verify/${verificationToken._id}`;

  await sendVerificationEmail(user.email, url);
  await createSession(userId as mongoose.Types.ObjectId);
  redirect("/dashboard");
  return {
    success: true,
    message: "Signup Successful. Email sent, please verify your email",
  };
}

export async function verifyEmail(code: string) {
  const validCode = await VerificationTokenModel.findOne({ _id: code });

  if (!validCode) {
    return {
      message: "Invalid or expired verification code",
    };
  }

  const user = await User.findByIdAndUpdate(
    validCode.userId,
    {
      isVerified: true,
    },
    {
      new: true,
    }
  );

  await validCode.deleteOne();

  return { user };
}

export async function login(state: LoginActionResponse, formData: FormData) {
  connectToDatabase();
  const rawData: LoginFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validateFields = LoginFormSchema.safeParse(rawData);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Please fix all errors in the form",
      errors: validateFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const { email, password } = validateFields.data;

  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  await createSession(user._id);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
}
