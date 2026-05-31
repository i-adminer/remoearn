import Link from "next/link";
import { ArrowRight, Package, ShieldCheck, Upload, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingCard } from "@/components/site/marketing-card";
import { SectionHeading } from "@/components/site/section-heading";
import { featuredProducts } from "@/lib/site-content";

export const metadata = {
  title: "Dashboard | RemoEarn",
  description: "Manage products, uploads, payments, and orders in the RemoEarn admin dashboard.",
};

const stats = [
  { label: "Products", value: featuredProducts.length.toString() },
  { label: "Active downloads", value: "128" },
  { label: "Payments ready", value: "2" },
  { label: "Support SLA", value: "24h" },
];

export default function DashboardPage() {
  return (
    <>
      <section id="overview" className="space-y-4">
        <SectionHeading eyebrow="Overview" title="Admin workspace" description="Manage digital products, proxy offers, and delivery settings from one place." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <MarketingCard key={stat.label} className="p-5">
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </MarketingCard>
          ))}
        </div>
      </section>

      <section id="products" className="space-y-4">
        <SectionHeading eyebrow="Products" title="Product catalog" description="Track the offer list and keep the storefront aligned with what is live." />
        <MarketingCard className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 bg-secondary/40 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {featuredProducts.map((product) => (
                  <tr key={product.slug} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-4 font-medium">{product.title}</td>
                    <td className="px-5 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-5 py-4 text-muted-foreground">{product.price}</td>
                    <td className="px-5 py-4 text-muted-foreground">Published</td>
                    <td className="px-5 py-4">
                      <Button asChild variant="ghost" size="sm" className="rounded-full px-3">
                        <Link href={`/products/${product.slug}`}>
                          Open <ArrowRight className="ml-1 size-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MarketingCard>
      </section>

      <section id="uploads" className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <MarketingCard className="space-y-5">
          <SectionHeading eyebrow="Uploads" title="Product upload form" description="Wire this form to Cloudinary and the product API route." />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Product title", "Remote Income Starter Guide"],
              ["Slug", "remote-income-starter-guide"],
              ["Category", "PDF Guide"],
              ["Price (cents)", "99900"],
            ].map(([label, placeholder]) => (
              <label key={label} className="space-y-2 text-sm font-medium">
                <span>{label}</span>
                <input
                  defaultValue={placeholder}
                  className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            ))}
          </div>
          <label className="block space-y-2 text-sm font-medium">
            <span>Description</span>
            <textarea
              defaultValue="This digital guide provides practical information, tools, and resources to help users understand remote work opportunities and online income strategies."
              rows={5}
              className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full">
              <Upload className="mr-2 size-4" />
              Save Product
            </Button>
            <Button type="button" variant="outline" className="rounded-full">
              Cloudinary Signature Ready
            </Button>
          </div>
        </MarketingCard>

        <MarketingCard className="space-y-5">
          <SectionHeading eyebrow="Media" title="Cloudinary upload flow" description="Keep product images and thumbnails outside the app bundle." />
          <div className="rounded-2xl bg-secondary/50 p-4 text-sm leading-7 text-muted-foreground">
            Upload images to Cloudinary, store the public ID in the database, and render remote assets through Next.js image optimization.
          </div>
          <div className="grid gap-3">
            {[
              "Generate a signed upload payload",
              "Upload the asset from the browser",
              "Save the returned URL and public ID",
              "Link the asset to the product record",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm">
                {item}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-secondary/40 p-4 text-sm text-muted-foreground">
            <ShieldCheck className="size-5 text-primary" />
            Use protected serverless endpoints for file signing and product creation.
          </div>
        </MarketingCard>
      </section>

      <section id="payments" className="space-y-4">
        <SectionHeading eyebrow="Payments" title="Stripe and M-Pesa settings" description="Keep the payment handlers separate and verify every transaction server-side." />
        <div className="grid gap-6 lg:grid-cols-2">
          <MarketingCard className="space-y-4">
            <div className="flex items-center gap-3">
              <Wallet className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">Stripe</h3>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Use Stripe Checkout or Payment Intents for card and wallet payments.
            </p>
          </MarketingCard>
          <MarketingCard className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">M-Pesa</h3>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Use an STK push or PayBill flow and confirm callbacks before granting downloads.
            </p>
          </MarketingCard>
        </div>
      </section>

      <section id="orders" className="space-y-4">
        <SectionHeading eyebrow="Orders" title="Order fulfillment" description="Track the delivery path from payment to download and email." />
        <MarketingCard>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              "Payment confirmed",
              "Download token created",
              "Email link sent",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-secondary/50 px-4 py-3 text-sm">
                {item}
              </div>
            ))}
          </div>
        </MarketingCard>
      </section>

      <section id="settings" className="space-y-4">
        <SectionHeading eyebrow="Settings" title="App configuration" description="Store database, Cloudinary, Stripe, and M-Pesa keys in environment variables." />
        <MarketingCard className="text-sm leading-7 text-muted-foreground">
          DATABASE_URL, CLOUDINARY_* and payment provider keys should be set in production before wiring the forms.
        </MarketingCard>
      </section>
    </>
  );
}
