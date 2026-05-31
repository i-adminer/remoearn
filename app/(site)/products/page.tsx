import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingCard } from "@/components/site/marketing-card";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { featuredProducts, proxyPlans } from "@/lib/site-content";

export const metadata = {
  title: "Digital Products for Remote Income & Freelancing | RemoEarn",
  description:
    "Download high-quality digital products including remote work guides, online job lists, freelancing tutorials, proxy setup resources, and internet income strategies for global users.",
};

export default function ProductsPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Products"
        title="Digital products for remote income and freelancing"
        description="Browse a clean collection of downloadable guides, tools, and proxy resources built for online work."
        actions={[
          { label: "Browse Featured", href: "/products" },
          { label: "See Shop", href: "/shop", variant: "outline" },
        ]}
        panel={
          <MarketingCard className="p-4">
            <div className="rounded-2xl bg-secondary/50 p-4 text-sm leading-7 text-muted-foreground">
              Instant digital delivery, Stripe and M-Pesa checkout, and a dashboard ready for product management.
            </div>
          </MarketingCard>
        }
      />

      <PageShell className="mt-10 space-y-10">
        <section>
          <SectionHeading
            eyebrow="Catalog"
            title="Featured digital products"
            description="Every product is designed to be simple to buy, easy to deliver, and fast to access on any device."
          />
          <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <MarketingCard key={product.slug} className="overflow-hidden p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={product.image} alt={product.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{product.category}</p>
                    <p className="text-sm font-semibold">{product.price}</p>
                  </div>
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.highlights.map((item) => (
                      <span key={item} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-full">
                      <Link href={`/products/${product.slug}`}>View Product</Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full">
                      <Link href={`/checkout?product=${product.slug}`}>Buy Now</Link>
                    </Button>
                  </div>
                </div>
              </MarketingCard>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Proxy Store"
            title="Proxy plans with a simple ladder"
            description="A premium buying flow benefits from clear options. Keep the layout lean and decisive."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {proxyPlans.map((plan) => (
              <MarketingCard key={plan.name} className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-sm font-semibold text-primary">{plan.price}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.description}</p>
                <div className="mt-4 space-y-2">
                  {plan.features.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background px-4 py-2 text-sm text-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </MarketingCard>
            ))}
          </div>
        </section>
      </PageShell>
    </div>
  );
}
