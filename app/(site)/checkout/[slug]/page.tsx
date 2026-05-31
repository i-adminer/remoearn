import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditCard, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingCard } from "@/components/site/marketing-card";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { featuredProducts } from "@/lib/site-content";

export async function generateStaticParams() {
  return featuredProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = featuredProducts.find((item) => item.slug === slug);

  if (!product) {
    return {};
  }

  return {
    title: `Checkout ${product.title} | RemoEarn`,
    description: `Secure checkout for ${product.title} on RemoEarn.`,
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = featuredProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Secure Checkout"
        title={`Buy ${product.title}`}
        description="Choose Stripe or M-Pesa and keep the checkout flow clean and secure."
        actions={[
          { label: "Stripe", href: "#stripe" },
          { label: "M-Pesa", href: "#mpesa", variant: "outline" },
        ]}
        panel={
          <MarketingCard>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Order Summary</p>
              <h3 className="text-2xl font-semibold">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.price}</p>
              <div className="rounded-2xl bg-secondary/50 px-4 py-3 text-sm leading-7 text-muted-foreground">
                Instant download, email delivery, and a secure payment flow ready for production keys.
              </div>
            </div>
          </MarketingCard>
        }
      />

      <PageShell className="mt-10 space-y-8">
        <section className="grid gap-6 lg:grid-cols-2">
          <MarketingCard id="stripe" className="p-5">
            <div className="flex items-center gap-3">
              <CreditCard className="size-5 text-primary" />
              <h2 className="text-xl font-semibold">Stripe Checkout</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Connect your Stripe keys, create a session server-side, and redirect the user through a secure payment flow.
            </p>
            <Button asChild className="mt-5 rounded-full">
              <Link href={`/download`}>Continue with Stripe</Link>
            </Button>
          </MarketingCard>

          <MarketingCard id="mpesa" className="p-5">
            <div className="flex items-center gap-3">
              <Smartphone className="size-5 text-primary" />
              <h2 className="text-xl font-semibold">M-Pesa Payment</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Use an STK push or PayBill flow for mobile-first payments. Keep callbacks serverless and verify transactions before delivery.
            </p>
            <Button asChild variant="outline" className="mt-5 rounded-full">
              <Link href={`/email-delivery`}>Continue with M-Pesa</Link>
            </Button>
          </MarketingCard>
        </section>

        <MarketingCard>
          <SectionHeading eyebrow="Next Steps" title="What should happen after payment" />
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              "Confirm payment server-side",
              "Generate a secure download token",
              "Send download and email delivery links",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-secondary/50 px-4 py-3 text-sm leading-7">
                {item}
              </div>
            ))}
          </div>
        </MarketingCard>
      </PageShell>
    </div>
  );
}
