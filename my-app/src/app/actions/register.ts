"use server";

import { hash } from "bcryptjs";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { db } from "@/lib/db";

export type RegisterState = {
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]> | null;
};

const initialState: RegisterState = {
  success: false,
  error: null,
  fieldErrors: null,
};

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    role: formData.get("role") as string,
    agreed: formData.get("agreed") === "on" ? true : undefined,
  };

  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors,
    };
  }

  const { name, email, password, role } = parsed.data;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists. Please sign in instead.",
        fieldErrors: { email: ["An account with this email already exists"] },
      };
    }

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return {
      success: true,
      error: null,
      fieldErrors: null,
    };
  } catch (err) {
    console.error("Registration error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
      fieldErrors: null,
    };
  }
}
