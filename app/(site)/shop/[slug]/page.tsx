import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getDb } from "@/lib/mongodb";
import { Collections, Product } from "@/lib/db/mongodb-schema";
import { PageShell } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { ProductImageGallery } from "@/components/site/product-image-gallery";

async function getProduct(slug: string) {
  const db = await getDb();
  const product = await db.collection<Product>(Collections.PRODUCTS)
    .findOne({ slug, isPublished: true });
  
  if (!product) return null;
  
  return {
    ...product,
    _id: product._id!.toString(),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

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
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="pb-16 pt-10">
      <PageShell>
        <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
          {/* Images */}
          <ProductImageGallery images={product.images} title={product.title} />

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                {product.category}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-4 text-2xl font-bold">{product.price}</p>
            </div>

            <p className="text-base leading-7 text-muted-foreground">
              {product.description}
            </p>

            {product.highlights.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">What's included</h2>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 shrink-0 text-green-500 mt-0.5" />
                      <span className="text-sm leading-7">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <AddToCartButton
                product={{
                  id: product._id,
                  slug: product.slug,
                  title: product.title,
                  category: product.category,
                  price: product.price,
                  priceCents: product.priceCents,
                  image: product.image,
                  type: product.type,
                }}
              />
              {product.type === 'proxy' && product.affiliateLink && (
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                    View Service
                  </a>
                </Button>
              )}
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/30 p-4">
              <p className="text-sm font-medium">Instant Delivery</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Get immediate access after payment. Download link sent to your email.
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
