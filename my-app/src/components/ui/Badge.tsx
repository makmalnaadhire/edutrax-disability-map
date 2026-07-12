import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        "transition-colors",
        variant === "default" &&
          "bg-primary/10 text-primary",
        variant === "secondary" &&
          "bg-muted text-muted-foreground",
        variant === "success" &&
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        variant === "warning" &&
          "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        variant === "destructive" &&
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge };
