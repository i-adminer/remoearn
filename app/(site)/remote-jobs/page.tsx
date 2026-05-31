import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { RemoteJobsBoard } from "@/components/site/remote-jobs-board";
import { remoteJobs } from "@/lib/remote-jobs";

export const metadata: Metadata = {
  title: "Remote Jobs | RemoEarn",
  description:
    "Search curated remote jobs with smart filters, focused job detail pages, and an upgrade path for more verified job links.",
};

export default function RemoteJobsPage() {
  return (
    <div className="overflow-x-clip pb-16">
      <PageHero
        eyebrow="Remote Jobs Worldwide"
        title="Search remote roles with a clean, fast job board."
        description="Filter by category, level, and employment type. Open any job for details, then upgrade to unlock more verified job links."
        actions={[
          { label: "Unlock More Jobs", href: "/products/verified-job-links-pack" },
          { label: "Contact Support", href: "/contact", variant: "outline" },
        ]}
      />

      <PageShell className="mt-10">
        <RemoteJobsBoard jobs={remoteJobs} />
      </PageShell>
    </div>
  );
}
