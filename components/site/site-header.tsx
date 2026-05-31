"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { navigation } from "@/lib/site-content";
import { PageShell } from "@/components/site/page-shell";
import { cn } from "@/lib/utils";

function AnimatedMenuIcon({ open }: Readonly<{ open: boolean }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 overflow-visible"
      aria-hidden="true"
    >
      <line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        className={cn(
          "origin-center stroke-current transition-all duration-300 ease-out",
          open && "translate-y-[5px] rotate-45",
        )}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        className={cn(
          "origin-center stroke-current transition-all duration-300 ease-out",
          open && "opacity-0",
        )}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        className={cn(
          "origin-center stroke-current transition-all duration-300 ease-out",
          open && "-translate-y-[5px] -rotate-45",
        )}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return <HeaderShell key={pathname} pathname={pathname} />;
}

function HeaderShell({ pathname }: Readonly<{ pathname: string }>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed top-3 left-0 right-0 z-50">
      <PageShell>
        <div className="rounded-[1.75rem] border border-border/70 bg-background/90 shadow-[0_28px_90px_-28px_rgba(29,78,216,0.5)] backdrop-blur-2xl transition-[transform,box-shadow] duration-300 ease-out hover:scale-[0.997] hover:shadow-[0_34px_110px_-30px_rgba(29,78,216,0.58)]">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 lg:hidden"
            >
              <div className="flex size-9 shrink-0 items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="RemoEarn logo"
                  width={32}
                  height={32}
                  className="size-full object-contain"
                  priority
                />
              </div>
            </Link>

            <Link
              href="/"
              className="hidden items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5 lg:flex"
            >
              <div className="flex size-12 shrink-0 items-center justify-center ">
                <Image
                  src="/logo.png"
                  alt="RemoEarn logo"
                  width={40}
                  height={40}
                  className="size-full object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold leading-none sm:text-lg">
                  RemoEarn
                </p>
                <p className="mt-1 hidden text-xs font-semibold text-muted-foreground sm:block">
                  Learn. Work. Earn Remotely.
                </p>
              </div>
            </Link>

            <nav className="hidden items-center justify-center gap-1 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground"
                >
                  <span className="relative inline-flex items-center">
                    {item.label}
                    {isActive(item.href) ? (
                      <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                    ) : null}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-2">
              <Button
                asChild
                size="sm"
                className="hidden rounded-full px-4 sm:inline-flex"
              >
                <Link href="/shop">
                  <Sparkles className="mr-2 size-4" />
                  Start Shopping
                </Link>
              </Button>

              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((value) => !value)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 bg-background text-foreground shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md lg:hidden"
              >
                <AnimatedMenuIcon open={mobileOpen} />
              </button>

              <ThemeToggle />
            </div>
          </div>

          <div
            className={cn(
              "grid overflow-hidden border-t border-border/70 px-4 transition-[grid-template-rows,opacity,padding] duration-300 ease-out lg:hidden sm:px-5",
              mobileOpen
                ? "grid-rows-[1fr] opacity-100 py-3"
                : "grid-rows-[0fr] opacity-0 py-0",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="grid gap-2 rounded-[1.25rem] bg-secondary/35 p-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-background hover:text-foreground",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="flex items-center justify-between gap-3">
                      {item.label}
                      {isActive(item.href) ? (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      ) : null}
                    </span>
                  </Link>
                ))}
                <Button asChild className="mt-1 w-full rounded-2xl">
                  <Link href="/shop" onClick={() => setMobileOpen(false)}>
                    Start Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </header>
  );
}
