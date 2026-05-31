import type { ReactNode } from "react";

import Link from "next/link";
import { BarChart3, Boxes, CreditCard, FileDown, Package, Settings, ShieldCheck } from "lucide-react";

import { ThemeToggle } from "@/components/site/theme-toggle";
import { PageShell } from "@/components/site/page-shell";

const sections = [
  { label: "Overview", href: "#overview", icon: BarChart3 },
  { label: "Products", href: "#products", icon: Boxes },
  { label: "Uploads", href: "#uploads", icon: FileDown },
  { label: "Payments", href: "#payments", icon: CreditCard },
  { label: "Orders", href: "#orders", icon: Package },
  { label: "Settings", href: "#settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen pb-10">
      <PageShell className="py-4 sm:py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-border/70 bg-background/90 p-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.42)] backdrop-blur lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">RemoEarn Dashboard</p>
                <p className="mt-1 text-xs text-muted-foreground">Serverless admin</p>
              </div>
              <ThemeToggle />
            </div>
            <nav className="mt-6 space-y-1">
              {sections.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 rounded-2xl border border-border/70 bg-secondary/50 p-4 text-sm leading-7 text-muted-foreground">
              <ShieldCheck className="mb-2 size-5 text-primary" />
              Connect auth before production. The dashboard is structured for protected product management, uploads, and payments.
            </div>
          </aside>

          <div className="space-y-6">{children}</div>
        </div>
      </PageShell>
    </div>
  );
}
