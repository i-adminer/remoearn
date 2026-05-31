import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldCheck, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/site/contact-form";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { MarketingCard } from "@/components/site/marketing-card";
import { PageShell } from "@/components/site/page-shell";
import { ProxyPricingCard } from "@/components/site/proxy-pricing-card";
import { SectionHeading } from "@/components/site/section-heading";
import {
  featuredProducts,
  testimonials,
  faqItems,
  proxyPlans,
} from "@/lib/site-content";

export const metadata = {
  title:
    "RemoEarn - Make Money Online Remotely | Remote Jobs, Proxies & Digital Guides",
  description:
    "RemoEarn helps people worldwide discover legitimate ways to make money online remotely. Access premium PDF guides, remote job websites, online earning strategies, verified job links, proxy solutions, and digital resources for freelancers, remote workers, and online entrepreneurs.",
};

export default function Home() {
  return (
    <>
      <section className="relative -mt-24 min-h-[100svh] overflow-hidden pt-24 sm:-mt-28 sm:pt-28">
        <HeroGridBackdrop />

        <PageShell className="relative flex min-h-[100svh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-center text-slate-950 dark:text-white">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-xs font-medium text-slate-700 backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-white/85">
              <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-emerald-400" />
              Trusted digital resources for remote income
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-slate-950 via-blue-700 to-cyan-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-cyan-200 dark:to-sky-400">
                Start earning online
              </span>{" "}
              from anywhere in the world.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-white/75">
              Access premium PDF guides, remote job opportunities, online income
              strategies, digital tools, and proxy solutions designed to help
              you build income remotely.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/products">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-slate-300 bg-white px-6 text-slate-900 hover:bg-slate-50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              >
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-white/70">
              <div className="inline-flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-amber-300 text-amber-300"
                  />
                ))}
                <span className="ml-1 text-slate-950 dark:text-white">
                  4.9/5
                </span>
              </div>
              <span className="hidden h-4 w-px bg-slate-300/70 sm:block dark:bg-white/20" />
              <span>47.9k+ users trust the platform</span>
            </div>
          </div>
        </PageShell>
      </section>

      <section className="py-16 sm:py-20">
        <PageShell>
          <SectionHeading
            eyebrow="Features"
            title="Premium digital resources for remote income"
            description="PDF guides, remote job resources, proxy services, instant downloads, and secure payments built into one clean storefront."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:auto-rows-[18rem] xl:grid-cols-4">
            <FeatureTile
              title="Remote Work Guides"
              description="Step-by-step PDFs for freelancing, remote jobs, online income, and digital business."
              image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
              className="xl:col-span-2 xl:row-span-2"
            />
            <FeatureTile
              title="Proxy Services"
              description="Reliable proxy options for browsing, privacy, and global digital work across common proxy regions."
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1280px-The_Earth_seen_from_Apollo_17.jpg"
              className="xl:col-span-2"
              footer={
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    ["🇺🇸", "United States"],
                    ["🇫🇷", "France"],
                    ["🇦🇺", "Australia"],
                    ["🇩🇪", "Germany"],
                  ].map(([flag, label]) => (
                    <span
                      key={label}
                      title={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md"
                    >
                      <span className="text-base leading-none">{flag}</span>
                      {label}
                    </span>
                  ))}
                </div>
              }
            />
            <FeatureTile
              title="Instant Downloads"
              description="Receive your purchased digital products instantly after payment confirmation."
              image="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
            />
            <FeatureTile
              title="Secure Payments"
              description="Pay safely using Stripe or M-Pesa with secure checkout flows."
              image="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80"
            />
          </div>
        </PageShell>
      </section>

      <section className="py-6 sm:py-10">
        <PageShell>
          <SectionHeading
            eyebrow="Featured Products"
            title="Best-selling digital products"
            description="Browse our most popular remote work guides, proxy tools, and digital downloads ready to buy instantly."
          />
          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 lg:auto-rows-fr lg:grid-cols-3">
            {featuredProducts.slice(0, 3).map((product) => (
              <MarketingCard
                key={product.slug}
                className="flex h-full min-h-[22rem] sm:min-h-[35rem] flex-col overflow-hidden p-0"
              >
                <div className="relative aspect-[3/2] sm:aspect-[5/4] shrink-0 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                      {product.category}
                    </p>
                    <p className="rounded-full border border-border/70 bg-background px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-foreground">
                      {product.price}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-4 flex-1 space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
                        {product.title}
                      </h3>
                      <p className="mt-1 sm:mt-2 line-clamp-2 text-xs sm:text-sm leading-6 sm:leading-7 text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-5 flex gap-2 sm:gap-3">
                    <Button asChild className="flex-1 rounded-full text-xs sm:text-sm h-9 sm:h-10">
                      <Link href={`/products/${product.slug}`}>
                        View
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4">
                      <Link href={`/checkout?product=${product.slug}`}>Buy</Link>
                    </Button>
                  </div>
                </div>
              </MarketingCard>
            ))}
          </div>
        </PageShell>
      </section>

      <section id="proxy-services" className="bg-[linear-gradient(180deg,#2563eb_0%,#1d4ed8_55%,#1e40af_100%)] py-16 text-white sm:py-20 dark:bg-[linear-gradient(180deg,#0f172a_0%,#1e3a8a_55%,#1d4ed8_100%)]">
        <PageShell>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
              Proxy Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Monthly proxy bundles built for steady browsing
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
              Choose a lean 1 GB plan, a larger 5 GB+ bundle, or a custom 50 GB+
              setup with direct sales support.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {proxyPlans.map((plan) => (
              <ProxyPricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </PageShell>
      </section>

      <section className="py-16 sm:py-20">
        <PageShell>
          <MarketingCard className="relative overflow-hidden border-0 bg-[linear-gradient(135deg,#020617_0%,#1d4ed8_52%,#06b6d4_100%)] p-0 text-white shadow-[0_30px_90px_-40px_rgba(15,23,42,0.75)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.18),transparent_30%)]" />
            <div className="relative grid gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                  Get Started
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Start building remote income with a cleaner workflow
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/75 sm:text-base">
                  Premium guides, verified jobs, and proxy tools with instant
                  access and secure checkout.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-white/85">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                    Instant delivery
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                    Mobile-friendly
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">
                    Secure checkout
                  </span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-6 text-slate-950 hover:bg-slate-100 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                <Link href="/products">Start Learning</Link>
              </Button>
            </div>
          </MarketingCard>
        </PageShell>
      </section>


      <section id="faq" className="py-16 sm:py-20">
        <PageShell>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Clear answers about checkout, delivery, access, and support."
            align="center"
          />
          <div className="mt-8">
            <FaqAccordion items={faqItems} />
          </div>
        </PageShell>
      </section>

      <section id="contact" className="py-6 sm:py-10">
        <PageShell>
          <ContactForm />
        </PageShell>
      </section>
    </>
  );
}

function FeatureTile({
  title,
  description,
  image,
  className,
  footer,
}: Readonly<{
  title: string;
  description: string;
  image: string;
  className?: string;
  footer?: ReactNode;
}>) {
  return (
    <MarketingCard
      className={`group relative min-h-72 overflow-hidden p-0 transition-transform duration-300 ease-out hover:-translate-y-1 ${className ?? ""}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-md">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1280px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/65 p-4 text-center text-white backdrop-blur-md shadow-[0_18px_60px_-24px_rgba(15,23,42,0.8)]">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-white/80">{description}</p>
          {footer ? footer : null}
        </div>
      </div>
    </MarketingCard>
  );
}

function HeroGridBackdrop() {
  // Generate square grid - equal spacing for both directions
  const gridSize = 8; // 8% spacing for square grid
  const horizontalLines = Array.from({ length: 12 }, (_, i) => i * gridSize);
  const verticalLines = Array.from({ length: 18 }, (_, i) => i * gridSize);

  // Only some lines will have animated lights (randomly selected)
  const animatedHorizontalIndices = [2, 5, 8, 10];
  const animatedVerticalIndices = [3, 7, 11, 14, 16];

  return (
    <div className="grid-background">
      <div className="grid-container">
        {/* Horizontal grid lines */}
        {horizontalLines.map((top, index) => (
          <div
            key={`h-${top}`}
            className={`grid-line horizontal ${animatedHorizontalIndices.includes(index) ? "animated" : ""}`}
            style={{ top: `${top}%` }}
            data-index={index}
          />
        ))}

        {/* Vertical grid lines */}
        {verticalLines.map((left, index) => (
          <div
            key={`v-${left}`}
            className={`grid-line vertical ${animatedVerticalIndices.includes(index) ? "animated" : ""}`}
            style={{ left: `${left}%` }}
            data-index={index + horizontalLines.length}
          />
        ))}
      </div>
    </div>
  );
}
