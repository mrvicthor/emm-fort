import mongoose from "mongoose";
import { z } from "zod";
export const signupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long. " })
    .trim(),
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 numbers" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  referral: z.string().optional(),
});

export interface SignupFormData {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  referral?: string;
}

export type SignupActionResponse = {
  success: boolean;
  message: string;
  inputs?: SignupFormData;
  errors?: {
    [K in keyof SignupFormData]?: string[];
  };
};

export type SessionPayload = {
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
};

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Password can not be empty" }).trim(),
});

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginActionResponse = {
  success: boolean;
  message: string;
  inputs?: LoginFormData;
  errors?: {
    [K in keyof LoginFormData]?: string[];
  };
};
