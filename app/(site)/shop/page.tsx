import type { Metadata } from "next";

import { ShopStudio } from "@/components/site/shop-studio";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Shop Digital Products & Proxy Services | RemoEarn",
  description:
    "Browse digital PDF guides and proxy subscriptions. Buy remote work guides, freelancing resources, and proxy plans with instant delivery.",
};

export default function ShopPage() {
  return (
    <div className="overflow-x-clip pb-24">
      <section className="relative pt-10 sm:pt-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_24%)]" />
        <PageShell>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Digital Shop
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-slate-950 via-blue-700 to-cyan-600 bg-clip-text text-transparent dark:from-white dark:via-sky-200 dark:to-cyan-200">
                Premium digital products
              </span>{" "}
              for remote income.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              Browse PDF guides and proxy services. Get instant access to remote work resources, freelancing strategies, and reliable proxy plans.
            </p>
          </div>
        </PageShell>
      </section>

      <PageShell className="mt-10">
        <ShopStudio />
      </PageShell>
    </div>
  );
}
