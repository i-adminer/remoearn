import type { ReactNode } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MarketingCard } from "@/components/site/marketing-card";
import { PageShell } from "@/components/site/page-shell";

type HeroAction = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
};

type HeroStat = {
  label: string;
  value: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  stats = [],
  panel,
}: Readonly<{
  eyebrow?: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  stats?: HeroStat[];
  panel?: ReactNode;
}>) {
  const layoutClassName = panel ? "grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : "grid gap-10";

  return (
    <section className="pt-8 sm:pt-12">
      <PageShell>
        <div className={layoutClassName}>
          <div className="space-y-6">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {description}
            </p>
            {actions.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {actions.map((action) => (
                  <Button key={action.href} asChild variant={action.variant ?? "default"} size="lg" className="rounded-full px-5">
                    <Link href={action.href}>{action.label}</Link>
                  </Button>
                ))}
              </div>
            ) : null}
            {stats.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <MarketingCard key={stat.label} className="p-4">
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </MarketingCard>
                ))}
              </div>
            ) : null}
          </div>
          {panel ? <div>{panel}</div> : null}
        </div>
      </PageShell>
    </section>
  );
}
