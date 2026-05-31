"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Clock3, Filter, MapPin, Search, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { MarketingCard } from "@/components/site/marketing-card";
import { cn } from "@/lib/utils";
import { jobUpgradeBenefits, remoteJobFilters, type RemoteJob } from "@/lib/remote-jobs";

type RemoteJobsBoardProps = Readonly<{
  jobs: RemoteJob[];
}>;

export function RemoteJobsBoard({ jobs }: RemoteJobsBoardProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof remoteJobFilters.categories)[number]>("All roles");
  const [employmentType, setEmploymentType] = useState<(typeof remoteJobFilters.employmentTypes)[number]>("All types");
  const [level, setLevel] = useState<(typeof remoteJobFilters.levels)[number]>("All levels");
  const [alertEmail, setAlertEmail] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredJobs = jobs.filter((job) => {
    const queryMatches =
      normalizedQuery.length === 0 ||
      [job.title, job.company, job.summary, job.category, job.salary, job.locations.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const categoryMatches = category === "All roles" || job.category === category;
    const typeMatches = employmentType === "All types" || job.employmentType === employmentType;
    const levelMatches = level === "All levels" || job.level === level;

    return queryMatches && categoryMatches && typeMatches && levelMatches;
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-6">
        <MarketingCard className="space-y-5 rounded-xl p-4 sm:p-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, company, location, salary"
              className="h-14 w-full rounded-2xl border border-border/70 bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
            />
          </label>

          <div className="space-y-3">
            <FilterRow
              icon={<Filter className="size-4" />}
              label="Category"
              items={remoteJobFilters.categories}
              value={category}
              onChange={(value) => setCategory(value)}
            />
            <FilterRow
              icon={<BriefcaseBusiness className="size-4" />}
              label="Employment"
              items={remoteJobFilters.employmentTypes}
              value={employmentType}
              onChange={(value) => setEmploymentType(value)}
            />
            <FilterRow
              icon={<Sparkles className="size-4" />}
              label="Level"
              items={remoteJobFilters.levels}
              value={level}
              onChange={(value) => setLevel(value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center rounded-md border border-border/70 bg-secondary/40 px-2.5 py-1 text-xs font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {filteredJobs.length} roles visible
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>Click any role for details</span>
          </div>
        </MarketingCard>

        <div className="min-w-0 overflow-hidden rounded-xl border border-border/70 bg-background/90 shadow-[0_20px_70px_-42px_rgba(15,23,42,0.4)] backdrop-blur">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <Link
                key={job.slug}
                href={`/remote-jobs/${job.slug}`}
                className={cn(
                  "group block px-5 py-5 transition-colors hover:bg-secondary/35 sm:px-6",
                  index !== filteredJobs.length - 1 && "border-b border-border/70",
                )}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-border/70 bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white">
                        {job.category}
                      </span>
                      {job.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <BadgeCheck className="size-3.5" />
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{job.summary}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <MetaPill>{job.employmentType}</MetaPill>
                      <MetaPill>{job.level}</MetaPill>
                      <MetaPill>{job.salary}</MetaPill>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <Clock3 className="size-4" />
                      {job.posted}
                    </div>
                    <div className="flex flex-wrap justify-start gap-2 sm:justify-end">
                      {job.locations.map((location) => (
                        <span
                          key={location}
                          className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background px-3 py-1 text-xs text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white"
                        >
                          <MapPin className="size-3.5 text-primary" />
                          {location}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
                      View details <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-sm leading-7 text-muted-foreground">
              No roles match that search. Try a broader filter or reset the chips.
            </div>
          )}
        </div>
      </div>

      <div className="min-w-0 space-y-4 lg:sticky lg:top-28 lg:self-start">
        <MarketingCard className="space-y-4 rounded-xl border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 sm:p-5 shadow-[0_20px_70px_-44px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[linear-gradient(180deg,#0f172a_0%,#020617_100%)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Upgrade</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground dark:text-white">
              Unlock more verified job links
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground dark:text-slate-300">
              Get a cleaner shortlist, more roles, and early access to curated openings.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground dark:text-slate-300">
            {jobUpgradeBenefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-emerald-500" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="w-full rounded-full">
            <Link href="/products/verified-job-links-pack">Upgrade Now</Link>
          </Button>
        </MarketingCard>

        <MarketingCard className="space-y-4 rounded-xl p-4 sm:p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Job Alerts</p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">Get job alerts by email</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Enter your email and we’ll send the alert setup to your inbox.
            </p>
          </div>
          <form
            className="space-y-3"
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
            }}
          >
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Email</span>
              <input
                type="email"
                value={alertEmail}
                onChange={(event) => setAlertEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-9 w-full rounded-md border border-border/70 bg-background px-3 text-[13px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
              />
            </label>
            <Button type="submit" className="h-9 w-full justify-center rounded-md px-3 text-center text-xs" variant="outline">
              Submit Email
            </Button>
          </form>
        </MarketingCard>
      </div>
    </div>
  );
}

function FilterRow<T extends string>({
  icon,
  label,
  items,
  value,
  onChange,
}: Readonly<{
  icon: ReactNode;
  label: string;
  items: ReadonlyArray<T>;
  value: T;
  onChange: (value: T) => void;
}>) {
  return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {icon}
          {label}
        </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={value === item}
            onClick={() => onChange(item)}
            className={cn(
              "max-w-full whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-medium leading-none transition-colors",
              value === item
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/70 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground dark:border-white/10 dark:bg-white/5",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function MetaPill({ children }: Readonly<{ children: string }>) {
  return <span className="rounded-md border border-border/70 bg-secondary/40 px-3 py-1 text-xs text-foreground dark:border-white/10 dark:bg-white/5 dark:text-slate-200">{children}</span>;
}
