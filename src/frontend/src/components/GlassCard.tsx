import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children?: ReactNode;
  glow?: "cyan" | "magenta" | "none";
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  "data-ocid"?: string;
}

import type React from "react";

export function GlassCard({
  children,
  className,
  glow = "none",
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-effect rounded-xl transition-smooth",
        glow === "cyan" && "glow-cyan",
        glow === "magenta" && "glow-magenta",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
