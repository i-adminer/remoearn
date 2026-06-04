import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProxyCardsList } from '@/components/admin/proxy-cards-list';
import { getProxyCards } from '@/lib/actions/proxy-cards';

export const metadata = {
  title: 'Proxy Cards | Dashboard',
};

export default async function ProxyCardsPage() {
  const cards = await getProxyCards();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Proxy Cards</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage proxy services on homepage</p>
        </div>
        <Button asChild size="sm" className="gap-2">
          <Link href="/dashboard/proxy-cards/new">
            <Plus className="size-4" />
            New Card
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <ProxyCardsList cards={cards} />
      </div>
    </div>
  );
}
