import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-transparent border border-primary text-primary",
    "hover:bg-primary/10 hover:shadow-glow-cyan hover:text-glow",
    "active:scale-95",
  ].join(" "),
  secondary: [
    "bg-transparent border border-secondary text-secondary",
    "hover:bg-secondary/10 hover:shadow-glow-magenta",
    "active:scale-95",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground/70",
    "hover:text-foreground hover:bg-muted/30",
    "active:scale-95",
  ].join(" "),
};

export function Button({
  variant = "primary",
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "px-6 py-2.5 rounded-lg font-display font-medium text-sm tracking-wider uppercase",
        "transition-smooth cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-40 disabled:pointer-events-none",
        variantStyles[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
