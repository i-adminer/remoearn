'use client';

import Link from 'next/link';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toggleProxyCardStatus, deleteProxyCard } from '@/lib/actions/proxy-cards';

interface ProxyCard {
  _id: string;
  title: string;
  price: string;
  affiliateLink: string;
  isActive: boolean;
}

export function ProxyCardsList({ cards }: { cards: ProxyCard[] }) {
  const handleToggle = async (id: string) => {
    await toggleProxyCardStatus(id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this card? This action cannot be undone.')) {
      await deleteProxyCard(id);
    }
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <Eye className="size-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">No proxy cards yet</p>
        <p className="text-xs text-muted-foreground mt-1">Create your first card to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cards.map((card) => (
        <div
          key={card._id}
          className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-border"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{card.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{card.price}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${card.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
              {card.isActive ? 'Active' : 'Inactive'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleToggle(card._id)}
              className="size-8 p-0"
            >
              {card.isActive ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
            <Button variant="ghost" size="sm" asChild className="size-8 p-0">
              <Link href={`/dashboard/proxy-cards/${card._id}`}>
                <Edit className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(card._id)}
              className="size-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
