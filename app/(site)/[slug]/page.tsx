import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/site/contact-form";
import { MarketingCard } from "@/components/site/marketing-card";
import { PageHero } from "@/components/site/page-hero";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { getMarketingPage } from "@/lib/site-content";

export async function generateStaticParams() {
  return [
    "about",
    "shop",
    "blog",
    "contact",
    "download",
    "email-delivery",
    "privacy-policy",
    "terms-and-conditions",
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "faq") {
    redirect("/#faq");
  }

  const page = getMarketingPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getMarketingPage(slug);

  if (!page) {
    notFound();
  }

  const isContactPage = slug === "contact";
  const isLegalPage = slug === "privacy-policy" || slug === "terms-and-conditions";

  return (
    <div className="pb-16">
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        actions={isLegalPage ? [] : page.hero.actions}
        stats={page.hero.stats}
        panel={
          isLegalPage ? null :
          page.hero.panel ? (
            <MarketingCard>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{page.hero.panel.title}</h3>
                  {page.hero.panel.description ? (
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {page.hero.panel.description}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  {page.hero.panel.items.map((item) => (
                    <div key={item} className="rounded-2xl border border-border/70 bg-secondary/50 px-4 py-3 text-sm">
                      {item}
                    </div>
                  ))}
                </div>
                {page.hero.panel.note ? (
                  <p className="text-xs leading-6 text-muted-foreground">{page.hero.panel.note}</p>
                ) : null}
              </div>
            </MarketingCard>
          ) : null
        }
      />

      {isContactPage ? (
        <PageShell className="mt-10">
          <ContactForm />
        </PageShell>
      ) : null}

      {isContactPage ? null : isLegalPage ? (
        <PageShell className="mt-12">
          <article className="mx-auto max-w-3xl space-y-12">
            {page.sections.map((section) => {
              if (section.type === "bullets") {
                return (
                  <section key={section.title} className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <p key={item} className="text-sm leading-7 text-muted-foreground sm:text-base">
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              }

              if (section.type === "notice") {
                return (
                  <section key={section.description} className="space-y-4">
                    {section.title ? (
                      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>
                    ) : null}
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">{section.description}</p>
                  </section>
                );
              }

              return null;
            })}
          </article>
        </PageShell>
      ) : (
        <PageShell className="mt-10 space-y-8">
          {page.sections.map((section) => {
          if (section.type === "bullets") {
            return (
              <section key={section.title}>
                <SectionHeading eyebrow="Highlights" title={section.title} description={section.description} />
                <MarketingCard className="mt-6">
                  <div className={`grid gap-3 ${section.columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                    {section.items.map((item) => (
                      <div key={item} className="rounded-2xl bg-secondary/50 px-4 py-3 text-sm leading-7">
                        {item}
                      </div>
                    ))}
                  </div>
                </MarketingCard>
              </section>
            );
          }

          if (section.type === "cards") {
            return (
              <section key={section.title}>
                <SectionHeading eyebrow="Highlights" title={section.title} description={section.description} />
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {section.items.map((item) => (
                    <MarketingCard key={item.title} className="p-5">
                      {item.badge ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{item.badge}</p>
                      ) : null}
                      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                      {item.href ? (
                        <Button asChild variant="outline" className="mt-4 rounded-full">
                          <Link href={item.href}>Open</Link>
                        </Button>
                      ) : null}
                    </MarketingCard>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === "faq") {
            return (
              <section key={section.title}>
                <SectionHeading eyebrow="Answers" title={section.title} description={section.description} />
                <div className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <MarketingCard key={item.question} className="p-0">
                      <details className="group p-5">
                        <summary className="cursor-pointer list-none text-base font-medium">
                          {item.question}
                        </summary>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                      </details>
                    </MarketingCard>
                  ))}
                </div>
              </section>
            );
          }

          if (section.type === "notice") {
            return (
              <MarketingCard key={section.description} className="border-primary/20 bg-primary/5">
                {section.title ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{section.title}</p> : null}
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.description}</p>
              </MarketingCard>
            );
          }

          return (
            <MarketingCard key={section.title} className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="text-2xl font-semibold">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href={section.primaryHref}>{section.primaryLabel}</Link>
                </Button>
                {section.secondaryHref ? (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={section.secondaryHref}>{section.secondaryLabel}</Link>
                  </Button>
                ) : null}
              </div>
            </MarketingCard>
          );
          })}
        </PageShell>
      )}
    </div>
  );
}
