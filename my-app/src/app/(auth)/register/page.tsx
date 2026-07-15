"use client";

import Link from "next/link";
import { useEffect, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  User,
  Accessibility,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { registerUser, type RegisterState } from "@/app/actions/register";
import { useRouter } from "next/navigation";

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  if (!errors || errors.length === 0) return null;
  return (
    <p
      id={`${id}-error`}
      role="alert"
      aria-live="assertive"
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {errors[0]}
    </p>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState<RegisterState, FormData>(
    registerUser,
    { success: false, error: null, fieldErrors: null }
  );

  const {
    register,
    formState: { errors: fieldErrors },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      agreed: undefined as unknown as true,
    },
  });

  useEffect(() => {
    if (state.success) {
      router.push("/login?registered=true");
    }
  }, [state.success, router]);

  function onSubmit(data: RegisterInput) {
    const fd = new FormData();
    fd.set("name", data.name);
    fd.set("email", data.email);
    fd.set("password", data.password);
    fd.set("confirmPassword", data.confirmPassword);
    fd.set("role", data.role);
    fd.set("agreed", data.agreed ? "on" : "");
    formAction(fd);
  }

  const getError = (field: keyof RegisterInput) => {
    const clientErr = (
      fieldErrors as Record<string, { message?: string }>
    )[field]?.message;
    const serverErr = state.fieldErrors?.[field];
    if (clientErr) return [clientErr];
    if (serverErr) return serverErr;
    return undefined;
  };

  const inputBase =
    "h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";
  const inputNormal =
    "border-slate-300 dark:border-slate-700";
  const inputError =
    "border-red-400 dark:border-red-500 focus:ring-red-500";

  return (
    <>
      {/* Mobile logo */}
      <div className="mb-8 lg:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
        >
          <Accessibility
            className="h-6 w-6 text-slate-900 dark:text-white"
            aria-hidden="true"
          />
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            EduTrax
          </span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create your Auditor Account
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Start conducting accessibility audits in minutes.
        </p>
      </div>

      {/* Success message (if just registered, before redirect) */}
      {state.success && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Account created successfully! Redirecting to sign in...
          </p>
        </div>
      )}

      {/* Global error */}
      {state.error && !state.success && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
        >
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            {state.error}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-slate-200"
          >
            Full Name
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              aria-invalid={!!getError("name")}
              aria-describedby={getError("name") ? "name-error" : undefined}
              className={`${inputBase} ${getError("name") ? inputError : inputNormal}`}
              {...register("name")}
            />
          </div>
          <FieldError id="name" errors={getError("name")} />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-slate-200"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
              aria-invalid={!!getError("email")}
              aria-describedby={getError("email") ? "email-error" : undefined}
              className={`${inputBase} ${getError("email") ? inputError : inputNormal}`}
              {...register("email")}
            />
          </div>
          <FieldError id="email" errors={getError("email")} />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-slate-200"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              aria-invalid={!!getError("password")}
              aria-describedby={
                getError("password") ? "password-error" : "password-hint"
              }
              className={`${inputBase} pr-11 ${getError("password") ? inputError : inputNormal}`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          <FieldError id="password" errors={getError("password")} />
          {!getError("password") && (
            <p
              id="password-hint"
              className="mt-1.5 text-xs text-slate-400 dark:text-slate-500"
            >
              Must be at least 8 characters with one number and one uppercase
              letter.
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-slate-200"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              aria-invalid={!!getError("confirmPassword")}
              aria-describedby={
                getError("confirmPassword") ? "confirmPassword-error" : undefined
              }
              className={`${inputBase} pr-11 ${getError("confirmPassword") ? inputError : inputNormal}`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          <FieldError id="confirmPassword" errors={getError("confirmPassword")} />
        </div>

        {/* Role Selection */}
        <div>
          <label
            htmlFor="role"
            className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-slate-200"
          >
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              aria-invalid={!!getError("role")}
              aria-describedby={getError("role") ? "role-error" : undefined}
              className={`h-11 w-full appearance-none rounded-lg border bg-white px-4 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-900 dark:text-white ${
                getError("role")
                  ? "border-red-400 dark:border-red-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
              {...register("role")}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="AUDITOR">Institutional Auditor</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
          </div>
          <FieldError id="role" errors={getError("role")} />
        </div>

        {/* Agreement checkbox */}
        <div className="flex items-start gap-2.5">
          <input
            id="agreed"
            type="checkbox"
            aria-invalid={!!getError("agreed")}
            aria-describedby={getError("agreed") ? "agreed-error" : undefined}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
            {...register("agreed")}
          />
          <label
            htmlFor="agreed"
            className="text-xs leading-relaxed text-slate-500 dark:text-slate-400"
          >
            I agree to the{" "}
            <Link
              href="/accessibility"
              className="font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Accessibility Guidelines
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        <FieldError id="agreed" errors={getError("agreed")} />

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus:ring-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-slate-400 dark:bg-slate-950 dark:text-slate-500">
            or
          </span>
        </div>
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-slate-900 hover:text-slate-700 dark:text-white dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white rounded"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
