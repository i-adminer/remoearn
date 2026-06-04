'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createProxyCard, updateProxyCard } from '@/lib/actions/proxy-cards';

interface ProxyCardFormProps {
  card?: {
    _id: string;
    title: string;
    price: string;
    description: string;
    features: string[];
    frontImageUrl?: string;
    backImageUrl?: string;
    affiliateLink: string;
    buttonText: string;
    order: number;
  };
}

export function ProxyCardForm({ card }: ProxyCardFormProps) {
  const router = useRouter();
  const action = card 
    ? async (_: any, formData: FormData) => updateProxyCard(card._id, formData)
    : async (_: any, formData: FormData) => createProxyCard(formData);
  const [state, formAction, pending] = useActionState(action, undefined);

  if (state?.success) {
    router.push('/dashboard/proxy-cards');
  }

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            name="title"
            defaultValue={card?.title}
            required
            className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input
            name="price"
            defaultValue={card?.price}
            placeholder="$9.99/month"
            required
            className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          name="description"
          defaultValue={card?.description}
          required
          rows={3}
          className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Features (one per line) *</label>
        <textarea
          name="features"
          defaultValue={card?.features.join('\n')}
          required
          rows={5}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
          className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Front Image URL</label>
          <input
            name="frontImageUrl"
            type="url"
            defaultValue={card?.frontImageUrl}
            className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Back Image URL</label>
          <input
            name="backImageUrl"
            type="url"
            defaultValue={card?.backImageUrl}
            className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Affiliate Link *</label>
        <input
          name="affiliateLink"
          type="url"
          defaultValue={card?.affiliateLink}
          required
          placeholder="https://example.com/affiliate"
          className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Button Text *</label>
          <input
            name="buttonText"
            defaultValue={card?.buttonText || 'Get Proxy'}
            required
            className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Order</label>
          <input
            name="order"
            type="number"
            defaultValue={card?.order || 0}
            className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving...' : card ? 'Update Card' : 'Create Card'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
