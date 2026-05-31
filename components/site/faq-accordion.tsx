"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { MarketingCard } from "@/components/site/marketing-card";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: ReadonlyArray<FaqItem>;
};

export function FaqAccordion({ items }: Readonly<FaqAccordionProps>) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <MarketingCard
            key={item.question}
            className={cn(
              "overflow-hidden border border-border/70 bg-background/90 p-0 shadow-sm backdrop-blur transition-all duration-300 dark:bg-white/5",
              isOpen && "border-primary/25 shadow-[0_18px_60px_-34px_rgba(37,99,235,0.5)]",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold tracking-tight sm:text-base">{item.question}</span>
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-transform duration-300 dark:border-white/10 dark:bg-white/5",
                  isOpen && "rotate-180 text-primary",
                )}
              >
                <ChevronDown className="size-4" aria-hidden="true" />
              </span>
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden px-5 pb-5">
                <p className="text-sm leading-7 text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          </MarketingCard>
        );
      })}
    </div>
  );
}
