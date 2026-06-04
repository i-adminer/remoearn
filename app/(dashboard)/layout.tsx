import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart3, CreditCard, Mail, Settings, LayoutGrid, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { getSession } from "@/lib/auth/session";
import { logout } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

const sections = [
  { label: "Overview", href: "/dashboard", icon: BarChart3 },
  { label: "Proxy Cards", href: "/dashboard/proxy-cards", icon: CreditCard },
  { label: "Products", href: "/dashboard/products", icon: LayoutGrid },
  { label: "Messages", href: "/dashboard/messages", icon: Mail },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border/40 bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div>
          <p className="text-sm font-semibold">RemoEarn</p>
          <p className="text-xs text-muted-foreground">{session.email}</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-border/40 lg:bg-background">
          <div className="flex h-16 items-center justify-between px-6 border-b border-border/40">
            <div>
              <p className="text-sm font-semibold">RemoEarn</p>
              <p className="text-xs text-muted-foreground">{session.email}</p>
            </div>
            <ThemeToggle />
          </div>

          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {sections.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border/40 p-4">
            <form action={logout}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/20"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border/40 bg-background/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        {sections.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
