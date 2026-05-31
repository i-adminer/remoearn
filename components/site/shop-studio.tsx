"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, ShoppingCart, FileText, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart";
import { featuredProducts, proxyPlans } from "@/lib/site-content";

type ProductType = "pdf" | "proxy";

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string;
  priceCents: number;
  description: string;
  image?: string;
  highlights: string[];
  type: ProductType;
}

function buildProducts(): Product[] {
  const pdfs = featuredProducts.map((p) => ({
    id: `pdf-${p.slug}`,
    slug: p.slug,
    title: p.title,
    category: p.category,
    price: p.price,
    priceCents: p.priceCents,
    description: p.description,
    image: p.image,
    highlights: p.highlights,
    type: "pdf" as ProductType,
  }));

  const PROXY_IMAGE = "https://firstsiteguide.com/wp-content/uploads/2022/08/proxy-server.png";

const proxies = proxyPlans.map((p) => ({
    id: `proxy-${p.badge.toLowerCase().replace(/\s+/g, "-")}`,
    slug: p.badge.toLowerCase().replace(/\s+/g, "-"),
    title: p.name,
    category: "Proxy Service",
    price: p.price,
    priceCents: p.price === "Contact sales" ? 0 : parseInt(p.price.replace(/[^\d]/g, "")) * 100,
    description: p.description,
    image: PROXY_IMAGE,
    highlights: p.features,
    type: "proxy" as ProductType,
  }));

  return [...pdfs, ...proxies];
}

const allProducts = buildProducts();

export function ShopStudio() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ProductType>("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("name");
  const { addItem, items } = useCartStore();

  const filtered = useMemo(() => {
    let result = allProducts;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter);
    }

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.priceCents - b.priceCents);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.priceCents - a.priceCents);
    } else {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [search, typeFilter, sortBy]);

  const isInCart = (id: string) => items.some((i) => i.id === id);

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 sm:h-10 pl-9 sm:pl-10 pr-3 sm:pr-4 rounded-lg border border-border/70 bg-background text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            className="h-9 sm:h-10 rounded-lg border border-border/70 bg-background px-2 sm:px-3 text-xs sm:text-sm outline-none focus:border-primary"
          >
            <option value="all">All</option>
            <option value="pdf">PDFs</option>
            <option value="proxy">Proxies</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-9 sm:h-10 rounded-lg border border-border/70 bg-background px-2 sm:px-3 text-xs sm:text-sm outline-none focus:border-primary"
          >
            <option value="name">Name</option>
            <option value="price-asc">Low-High</option>
            <option value="price-desc">High-Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() =>
              addItem({
                id: product.id,
                slug: product.slug,
                title: product.title,
                category: product.category,
                price: product.price,
                priceCents: product.priceCents,
                image: product.image,
                type: product.type,
              })
            }
            isInCart={isInCart(product.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
  isInCart,
}: {
  product: Product;
  onAddToCart: () => void;
  isInCart: boolean;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:shadow-md">
      <Link href={product.type === "pdf" ? `/products/${product.slug}` : "#"}>
        <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-secondary">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Globe className="size-12 text-primary/40" />
            </div>
          )}
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium backdrop-blur">
              {product.type === "pdf" ? (
                <FileText className="size-3.5" />
              ) : (
                <Globe className="size-3.5" />
              )}
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <Link href={product.type === "pdf" ? `/products/${product.slug}` : "#"}>
          <h3 className="text-sm sm:text-base font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
          {product.highlights.slice(0, 1).map((h) => (
            <span
              key={h}
              className="rounded-md bg-secondary px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-4">
          <span className="text-sm sm:text-lg font-bold">{product.price}</span>
          <Button
            size="sm"
            onClick={onAddToCart}
            disabled={isInCart}
            className={cn(
              "gap-1 text-xs px-2 sm:px-3",
              isInCart && "bg-green-600 hover:bg-green-700"
            )}
          >
            <ShoppingCart className="size-3" />
            <span className="hidden sm:inline">{isInCart ? "In Cart" : "Add"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}