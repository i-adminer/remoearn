"use client";

import {
  type LucideIcon,
  Mail,
  MessageSquareText,
  PhoneCall,
  Send,
} from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { MarketingCard } from "@/components/site/marketing-card";
import { submitContactForm } from "@/lib/actions/contact";

const supportEmail = "info@remoearn.com";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    async (_: any, formData: FormData) => submitContactForm(formData),
    undefined,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <MarketingCard className="relative overflow-hidden border border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-0 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[linear-gradient(180deg,#0f172a_0%,#020617_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.20),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_28%)]" />
        <form action={formAction} className="relative space-y-5 p-6 sm:p-8">
          {state?.success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Contact
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Send a direct message
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              We'll route your message to support and reply as soon as possible.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">
                Full name
              </span>
              <input
                name="name"
                required
                placeholder="Kevin Kamau"
                className="h-12 w-full rounded-lg border border-border/70 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">
                Email address
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-12 w-full rounded-lg border border-border/70 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Subject</span>
            <input
              name="subject"
              required
              placeholder="Payment help, download issue, product question"
              className="h-12 w-full rounded-lg border border-border/70 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us what you need help with..."
              className="w-full rounded-lg border border-border/70 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              size="lg"
              className="rounded-full px-6"
              disabled={pending}
            >
              <Send className="mr-2 size-4" />
              {pending ? "Sending..." : "Send Message"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Usually answered within 24 hours.
            </p>
          </div>
        </form>
      </MarketingCard>

      <MarketingCard className="space-y-6 border border-border/70 bg-background/90 p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Support
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">
            Simple, direct, and responsive
          </h3>
        </div>

        <div className="space-y-3">
          <SupportItem icon={Mail} title="Email" value={supportEmail} />
          <SupportItem
            icon={MessageSquareText}
            title="Response time"
            value="Within 24 hours"
          />
          <SupportItem
            icon={PhoneCall}
            title="Use cases"
            value="Orders, downloads, partnerships"
          />
        </div>

        <div className="rounded-lg border border-border/70 bg-secondary/40 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-medium text-foreground">
            Need a faster answer?
          </p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Include your order email and product name so we can resolve it
            faster.
          </p>
        </div>
      </MarketingCard>
    </div>
  );
}

function SupportItem({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-background px-4 py-3 dark:border-white/10 dark:bg-white/5">
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-white/10 dark:text-white">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {title}
        </p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
