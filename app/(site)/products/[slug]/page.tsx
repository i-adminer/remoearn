import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Check, FileText, Clock, Shield, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { ProductGallery } from "@/components/site/product-gallery";
import { PageShell } from "@/components/site/page-shell";
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
    title: `${product.title} | RemoEarn`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = featuredProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="pb-16">
      <PageShell className="mt-6 lg:mt-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <ProductGallery images={images} title={product.title} />

            {/* Product Details */}
            <div className="mt-8">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.9 (124 reviews)</span>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold">About this product</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold">What&apos;s included</h2>
                <ul className="mt-4 space-y-3">
                  {product.highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="size-5 shrink-0 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features Grid */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <FileText className="mx-auto size-6 text-primary" />
                  <p className="mt-2 text-sm font-medium">PDF Format</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <Download className="mx-auto size-6 text-primary" />
                  <p className="mt-2 text-sm font-medium">Instant Download</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <Clock className="mx-auto size-6 text-primary" />
                  <p className="mt-2 text-sm font-medium">24/7 Support</p>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <Shield className="mx-auto size-6 text-primary" />
                  <p className="mt-2 text-sm font-medium">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">{product.price}</span>
                <span className="text-sm text-muted-foreground">KES</span>
              </div>

              <div className="mt-2 text-sm text-muted-foreground">
                Instant digital delivery after payment
              </div>

              <div className="mt-6 space-y-3">
                <AddToCartButton
                  product={{
                    id: `pdf-${product.slug}`,
                    slug: product.slug,
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    priceCents: product.priceCents,
                    image: product.image,
                    type: "pdf",
                  }}
                />
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/checkout?product=${product.slug}`}>
                    Buy Now
                  </Link>
                </Button>
              </div>

              <div className="mt-6 space-y-3 border-t border-border/70 pt-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="size-4" />
                  <span>Secure checkout with Stripe or M-Pesa</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Download className="size-4" />
                  <span>Instant download link after payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <span>Email delivery within minutes</span>
                </div>
              </div>
            </div>

            {/* Back link */}
            <Link
              href="/shop"
              className="mt-4 block text-center text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </PageShell>
    </div>
  );
}