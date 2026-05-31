import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Clock3, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { getRelatedRemoteJobs, getRemoteJob, remoteJobs } from "@/lib/remote-jobs";

export async function generateStaticParams() {
  return remoteJobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getRemoteJob(slug);

  if (!job) {
    return {};
  }

  return {
    title: `${job.title} at ${job.company} | RemoEarn Remote Jobs`,
    description: job.summary,
  };
}

export default async function RemoteJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getRemoteJob(slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = getRelatedRemoteJobs(job.slug, job.category);

  return (
    <div className="overflow-x-clip pb-16">
      <PageHero
        eyebrow={job.category}
        title={job.title}
        description={`${job.company} · ${job.salary} · ${job.posted}`}
        actions={[
          { label: "Upgrade to More Jobs", href: "/products/verified-job-links-pack" },
          { label: "Request Application Help", href: "/contact", variant: "outline" },
        ]}
      />

      <PageShell className="mt-10 max-w-4xl">
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md border border-border/70 bg-secondary/50 px-2.5 py-1 font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white">
                {job.employmentType}
              </span>
              <span className="rounded-md border border-border/70 bg-secondary/50 px-2.5 py-1 font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white">
                {job.level}
              </span>
              <span className="rounded-md border border-border/70 bg-secondary/50 px-2.5 py-1 font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white">
                {job.salary}
              </span>
              {job.featured ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <BadgeCheck className="size-3.5" />
                  Featured
                </span>
              ) : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <InfoRow icon={BriefcaseBusiness} label="Company" value={job.company} />
              <InfoRow icon={Clock3} label="Posted" value={job.posted} />
              <InfoRow icon={MapPin} label="Location" value={job.locations.join(", ")} />
              <InfoRow icon={ShieldCheck} label="Category" value={job.category} />
            </div>

            <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {job.summary}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link href="/contact?subject=Remote%20Job%20Application">Request Application Help</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/products/verified-job-links-pack">Upgrade to More Jobs</Link>
              </Button>
            </div>
          </section>

          <section className="space-y-4 border-t border-border/70 pt-8">
            <SectionTitle label="Role overview" />
            {job.overview.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="space-y-4 border-t border-border/70 pt-8">
            <SectionTitle label="What you’ll do" />
            <ul className="space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  <span className="mt-2 size-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 border-t border-border/70 pt-8">
            <SectionTitle label="What you need" />
            <ul className="space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  <span className="mt-2 size-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 border-t border-border/70 pt-8">
            <SectionTitle label="Why it stands out" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {job.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 rounded-md border border-border/70 bg-secondary/25 px-4 py-3 text-sm text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-5 border-t border-border/70 pt-8">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-white/10 dark:text-white">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Upgrade</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-950 via-blue-700 to-cyan-600 bg-clip-text text-transparent dark:from-white dark:via-sky-200 dark:to-cyan-200">
                  Want a larger shortlist of verified jobs?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Upgrade to the Verified Job Links Pack to keep browsing more curated openings, cleaner lists, and faster discovery.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full px-6">
                    <Link href="/products/verified-job-links-pack">Upgrade Now</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-6">
                    <Link href="/contact?subject=Remote%20Job%20Support">Get Help</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {relatedJobs.length > 0 ? (
            <section className="space-y-4 border-t border-border/70 pt-8">
              <SectionTitle label="Similar roles" />
              <div className="divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70">
                {relatedJobs.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/remote-jobs/${related.slug}`}
                    className="group flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-secondary/30"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{related.company}</p>
                      <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground group-hover:text-primary">
                        {related.title}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">{related.summary}</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </PageShell>
    </div>
  );
}

function SectionTitle({ label }: Readonly<{ label: string }>) {
  return <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{label}</h2>;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: Readonly<{
  icon: LucideIcon;
  label: string;
  value: string;
}>) {
  return (
    <div className="rounded-md border border-border/70 bg-background/80 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        <Icon className="size-3.5 text-primary" />
        {label}
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
