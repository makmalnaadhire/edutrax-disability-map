import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Variants
          variant === "primary" &&
            "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
          variant === "secondary" &&
            "bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary",
          variant === "destructive" &&
            "bg-destructive text-white hover:bg-red-700 focus:ring-destructive",
          variant === "ghost" &&
            "bg-transparent text-foreground hover:bg-muted focus:ring-primary",
          variant === "outline" &&
            "border border-border bg-transparent text-foreground hover:bg-muted focus:ring-primary",
          // Sizes
          size === "sm" && "h-8 px-3 text-sm",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-12 px-6 text-base",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
