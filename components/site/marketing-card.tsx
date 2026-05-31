import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function MarketingCard({
  children,
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/70 bg-card/85 p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.42)] backdrop-blur",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
