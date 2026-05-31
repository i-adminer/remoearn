import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/site/page-shell";
import { footerLinks } from "@/lib/site-content";

export function SiteFooter() {
  const primaryLinks = footerLinks.filter((item) =>
    ["Home", "Shop", "Remote Jobs", "Proxy Services", "Contact Us", "FAQ"].includes(item.label),
  );
  const legalLinks = footerLinks.filter((item) =>
    ["Privacy Policy", "Terms & Conditions"].includes(item.label),
  );

  return (
    <footer className="mt-16 border-t border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-12 backdrop-blur dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <PageShell>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-xl space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5">
              <span className="flex size-11 items-center justify-center">
                <Image src="/logo.png" alt="RemoEarn logo" width={40} height={40} className="size-full object-contain" />
              </span>
              <div>
                <p className="text-lg font-semibold leading-none text-foreground">RemoEarn</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Learn. Work. Earn Remotely.
                </p>
              </div>
            </Link>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Premium digital products, remote work resources, proxy tools, and secure checkout built for modern online earning.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-background px-3 py-1 dark:border-white/10 dark:bg-white/5">Instant delivery</span>
              <span className="rounded-full border border-border/70 bg-background px-3 py-1 dark:border-white/10 dark:bg-white/5">Secure payments</span>
              <span className="rounded-full border border-border/70 bg-background px-3 py-1 dark:border-white/10 dark:bg-white/5">Updated 2026</span>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Explore
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {primaryLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Legal
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                © 2026 RemoEarn. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    </footer>
  );
}
