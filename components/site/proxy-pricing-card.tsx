"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingCard } from "@/components/site/marketing-card";
import { cn } from "@/lib/utils";
import type { ProxyPlan } from "@/lib/site-content";

type ProxyPricingCardProps = {
  plan: ProxyPlan;
};

export function ProxyPricingCard({ plan }: Readonly<ProxyPricingCardProps>) {
  const [flipped, setFlipped] = useState(false);
  const actionHref = plan.href || (plan.price === "Contact sales" ? "/contact" : "/products/proxy-setup-toolkit");
  const actionLabel = plan.buttonLabel || (plan.price === "Contact sales" ? "Talk to Sales" : "Get Proxy");
  const isExternal = actionHref.startsWith('http');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setFlipped((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((value) => !value);
        }
      }}
      className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 [perspective:1400px]"
      aria-pressed={flipped}
    >
      <div
        data-flipped={flipped}
        className={cn(
          "relative h-[34rem] transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] data-[flipped=true]:[transform:rotateY(180deg)]",
        )}
      >
        <MarketingCard className="absolute inset-0 overflow-hidden rounded-3xl border border-sky-100 bg-white p-0 text-slate-950 shadow-[0_24px_80px_-36px_rgba(37,99,235,0.35)] [backface-visibility:hidden] dark:border-sky-400/15 dark:bg-slate-950 dark:text-white dark:shadow-[0_24px_80px_-36px_rgba(15,23,42,0.72)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(248,250,252,1)_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_30%),linear-gradient(180deg,rgba(15,23,42,1)_0%,rgba(2,6,23,1)_100%)]" />
          <div className="relative flex h-full flex-col justify-between overflow-y-auto p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 dark:text-sky-200/85">{plan.badge}</p>
              <p className="rounded-full border border-border/70 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white">
                {plan.price}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground dark:text-slate-300">{plan.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {plan.locations.map((location) => (
                  <span
                    key={location}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground dark:text-slate-300">
              <span>Tap or hover for details</span>
              <span className="inline-flex items-center gap-1 text-primary dark:text-sky-200">Details <span aria-hidden="true">↻</span></span>
            </div>
          </div>
        </MarketingCard>

        <MarketingCard className="absolute inset-0 overflow-hidden rounded-3xl border border-sky-100 bg-white p-0 text-slate-950 shadow-[0_24px_80px_-36px_rgba(37,99,235,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-sky-400/15 dark:bg-slate-950 dark:text-white dark:shadow-[0_24px_80px_-36px_rgba(15,23,42,0.72)]">
          <div className="relative flex h-full flex-col justify-between overflow-y-auto p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 dark:text-sky-200/85">{plan.badge}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground dark:text-slate-300">{plan.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-950 dark:text-white">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/5">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {plan.locations.map((location) => (
                  <span
                    key={location}
                    className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-primary dark:text-sky-200">{plan.price}</p>
              <div onClick={(event) => event.stopPropagation()}>
                <Button asChild className="rounded-full px-5">
                  {isExternal ? (
                    <a href={actionHref} target="_blank" rel="noopener noreferrer">{actionLabel}</a>
                  ) : (
                    <Link href={actionHref}>{actionLabel}</Link>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </MarketingCard>
      </div>
    </div>
  );
}
