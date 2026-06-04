'use client';

import { useState, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createProduct, updateProduct } from '@/lib/actions/products';

interface ProductFormProps {
  product?: any;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [type, setType] = useState(product?.type || 'pdf');
  const action = product 
    ? async (_: any, formData: FormData) => updateProduct(product._id, formData)
    : async (_: any, formData: FormData) => createProduct(formData);
  const [state, formAction, pending] = useActionState(action, undefined);

  if (state?.success) {
    router.push('/dashboard/products');
  }

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{state.error}</div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Type *</label>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-md border px-3 py-2 dark:bg-slate-900"
        >
          <option value="pdf">PDF Guide</option>
          <option value="proxy">Proxy Service</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input name="title" defaultValue={product?.title} required className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input name="slug" defaultValue={product?.slug} required className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea name="description" defaultValue={product?.description} required rows={3} className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Price *</label>
          <input name="price" type="number" step="0.01" defaultValue={product?.price} required className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input name="category" defaultValue={product?.category} className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Images (JSON array, max 3)</label>
        <input name="images" defaultValue={JSON.stringify(product?.images || [])} placeholder='["url1", "url2"]' className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
      </div>

      {type === 'pdf' && (
        <div>
          <label className="block text-sm font-medium mb-1">PDF URL</label>
          <input name="pdfUrl" type="url" defaultValue={product?.pdfUrl} className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
        </div>
      )}

      {type === 'proxy' && (
        <div>
          <label className="block text-sm font-medium mb-1">Affiliate Link</label>
          <input name="affiliateLink" type="url" defaultValue={product?.affiliateLink} className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Tags (JSON array)</label>
        <input name="tags" defaultValue={JSON.stringify(product?.tags || [])} placeholder='["tag1", "tag2"]' className="w-full rounded-md border px-3 py-2 dark:bg-slate-900" />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={pending}>{pending ? 'Saving...' : product ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
