import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name must be at most 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter"
      ),
    confirmPassword: z.string(),
    role: z.enum(["SUPER_ADMIN", "AUDITOR", "PUBLIC_VIEWER"], {
      message: "Please select a valid role",
    }),
    agreed: z.literal(true, {
      message:
        "You must agree to the Accessibility Guidelines and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
