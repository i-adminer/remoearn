"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, PackagePlus } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { featuredProducts, proxyPlans } from "@/lib/site-content";

type CatalogMode = "pdfs" | "proxies";

type CatalogItemKind = "pdf" | "proxy";

type CatalogItem = Readonly<{
  kind: CatalogItemKind;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceValue: number | null;
  details: string[];
  href?: string;
  image?: string;
  billing: "one-time" | "monthly" | "custom";
}>;

const paymentMethods = ["M-Pesa", "Stripe"] as const;

function buildPdfItems(): CatalogItem[] {
  return featuredProducts.map((product) => ({
    kind: "pdf",
    slug: product.slug,
    title: product.title,
    subtitle: product.category,
    description: product.description,
    price: product.price,
    priceValue: product.priceCents / 100,
    details: product.highlights,
    href: `/products/${product.slug}`,
    image: product.image,
    billing: "one-time",
  }));
}

function parseKshPrice(price: string) {
  const match = price.match(/KSh\s*([\d,]+)/i);

  if (!match) {
    return null;
  }

  return Number.parseInt(match[1].replaceAll(",", ""), 10);
}

function buildProxyItems(): CatalogItem[] {
  return proxyPlans.map((plan) => ({
    kind: "proxy",
    slug: plan.badge.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-"),
    title: plan.name,
    subtitle: plan.badge,
    description: plan.description,
    price: plan.price,
    priceValue: plan.price === "Contact sales" ? null : parseKshPrice(plan.price),
    details: plan.features,
    billing: plan.price === "Contact sales" ? "custom" : "monthly",
  }));
}

const pdfItems = buildPdfItems();
const proxyItems = buildProxyItems();

export function ProxyServicesStudio() {
  const [mode, setMode] = useState<CatalogMode>("pdfs");
  const [cart, setCart] = useState<CatalogItem[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<(typeof paymentMethods)[number]>("M-Pesa");
  const [checkoutNote, setCheckoutNote] = useState<string | null>(null);

  const catalogItems = mode === "pdfs" ? pdfItems : proxyItems;

  const totals = useMemo(() => {
    const numericTotal = cart.reduce((sum, item) => sum + (item.priceValue ?? 0), 0);
    const hasCustomItem = cart.some((item) => item.priceValue === null);

    return {
      numericTotal,
      hasCustomItem,
    };
  }, [cart]);

  function addToCart(item: CatalogItem) {
    setCheckoutNote(null);
    setCart((current) => {
      if (current.some((entry) => entry.slug === item.slug && entry.kind === item.kind)) {
        return current;
      }

      return [...current, item];
    });
  }

  function removeFromCart(slug: string) {
    setCart((current) => current.filter((item) => item.slug !== slug));
  }

  function handleCheckoutSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCheckoutNote("Checkout details saved. Payment wiring will connect later.");
  }

  const totalLabel = totals.hasCustomItem
    ? "Custom quote"
    : new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(totals.numericTotal);

  return (
    <div id="catalog" className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-6">
        <div className="flex items-center gap-2 rounded-md border border-border/70 bg-background/80 p-1 text-sm shadow-sm backdrop-blur">
          <TabButton active={mode === "pdfs"} onClick={() => setMode("pdfs")}>
            PDF Store
          </TabButton>
          <TabButton active={mode === "proxies"} onClick={() => setMode("proxies")}>
            Proxy Services
          </TabButton>
        </div>

        <section className="rounded-2xl border border-border/70 bg-background/90 shadow-[0_20px_70px_-44px_rgba(15,23,42,0.25)] backdrop-blur">
          <div className="border-b border-border/70 px-4 py-4 sm:px-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  {mode === "pdfs" ? "PDF Catalog" : "Proxy Subscriptions"}
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {mode === "pdfs" ? "Sell digital PDFs with clean detail pages" : "Keep proxy plans simple and monthly"}
                </h2>
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                {catalogItems.length} items available
              </p>
            </div>
          </div>

          <div className="divide-y divide-border/70">
            {catalogItems.map((item) => (
              <div key={`${item.kind}-${item.slug}`} className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="flex min-w-0 gap-4">
                  <div className="relative hidden aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md border border-border/70 bg-secondary/40 sm:block">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill sizes="96px" className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(29,78,216,0.18),rgba(6,182,212,0.18))] text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                        Proxy
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-md border border-border/70 bg-secondary/50 px-2.5 py-1 font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white">
                        {item.subtitle}
                      </span>
                      <span className="rounded-md border border-border/70 bg-background px-2.5 py-1 font-medium text-muted-foreground dark:border-white/10 dark:bg-white/5">
                        {item.billing === "one-time" ? "Instant download" : item.billing === "monthly" ? "Monthly" : "Custom pricing"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{item.title}</h3>
                      <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.details.map((detail) => (
                        <span key={detail} className="rounded-md border border-border/70 bg-secondary/30 px-2.5 py-1 text-[11px] font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                          {detail}
                        </span>
                      ))}
                    </div>

                    {item.kind === "proxy" ? (
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {proxyPlans.find((plan) => plan.name === item.title)?.locations.map((location) => (
                          <span key={location} className="rounded-md border border-border/70 bg-background px-2.5 py-1 dark:border-white/10 dark:bg-white/5">
                            {location}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-3 lg:items-end">
                  <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{item.price}</p>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {item.href ? (
                      <Button asChild variant="outline" className="rounded-md px-3 text-xs">
                        <Link href={item.href}>
                          View details <ExternalLink className="ml-1 size-3.5" />
                        </Link>
                      </Button>
                    ) : null}
                    <Button type="button" onClick={() => addToCart(item)} className="rounded-md px-3 text-xs">
                      Add to cart <PackagePlus className="ml-1 size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside id="checkout" className="min-w-0 space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-border/70 bg-background/90 p-4 shadow-[0_20px_70px_-44px_rgba(15,23,42,0.25)] backdrop-blur sm:p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Cart & Checkout</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">Prepare your order</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Add PDFs or proxy plans, then enter the details required for Stripe or M-Pesa later.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={`${item.kind}-${item.slug}`} className="flex items-center justify-between gap-3 rounded-md border border-border/70 bg-secondary/30 px-3 py-2.5 dark:border-white/10 dark:bg-white/5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.price}</p>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.slug)} className="text-xs font-medium text-primary">
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-md border border-dashed border-border/70 bg-secondary/20 px-3 py-4 text-sm leading-7 text-muted-foreground dark:border-white/10 dark:bg-white/5">
                Your cart is empty. Add a PDF guide or proxy plan to begin.
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4 text-sm">
            <span className="text-muted-foreground">Estimated total</span>
            <span className="font-semibold text-foreground">{cart.length > 0 ? totalLabel : "KSh 0"}</span>
          </div>

          <form className="mt-5 space-y-3" onSubmit={handleCheckoutSubmit}>
            <CheckoutField label="Full name" value={fullName} onChange={setFullName} placeholder="John Doe" />
            <CheckoutField label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
            <CheckoutField label="Phone number" value={phone} onChange={setPhone} placeholder="07xx xxx xxx" />

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Payment method</span>
              <select
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value as (typeof paymentMethods)[number])}
                className="h-10 w-full rounded-md border border-border/70 bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Notes</span>
              <textarea
                rows={4}
                placeholder="Tell us any delivery or billing notes..."
                className="w-full rounded-md border border-border/70 bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
              />
            </label>

            <Button type="submit" className="h-10 w-full justify-center rounded-md px-3 text-center text-xs" variant="outline">
              Save Checkout Details
            </Button>

            {checkoutNote ? (
              <p className="text-xs leading-6 text-muted-foreground">{checkoutNote}</p>
            ) : null}
          </form>

          <div className="mt-5 rounded-md border border-border/70 bg-secondary/20 px-3 py-3 text-xs leading-6 text-muted-foreground dark:border-white/10 dark:bg-white/5">
            <p className="font-medium text-foreground">Checkout contract</p>
            <p className="mt-1">
              Stripe and M-Pesa fields will connect to the backend later. This page only captures the UI contract.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: Readonly<{
  active: boolean;
  children: string;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2 text-xs font-semibold transition-colors",
        active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function CheckoutField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: Readonly<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "email";
}>) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-border/70 bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
      />
    </label>
  );
}
