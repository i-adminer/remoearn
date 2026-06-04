'use client';

import Link from 'next/link';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toggleProductPublish, deleteProduct } from '@/lib/actions/products';

interface Product {
  _id: string;
  type: 'pdf' | 'proxy';
  title: string;
  price: number;
  isPublished: boolean;
}

export function ProductsList({ products }: { products: Product[] }) {
  const handleToggle = async (id: string) => {
    await toggleProductPublish(id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this product? This action cannot be undone.')) {
      await deleteProduct(id);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <Eye className="size-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">No products yet</p>
        <p className="text-xs text-muted-foreground mt-1">Create your first product to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <div key={p._id} className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-border">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              ${p.price} • {p.type.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${p.isPublished ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
              {p.isPublished ? 'Published' : 'Draft'}
            </span>
            <Button variant="ghost" size="sm" onClick={() => handleToggle(p._id)} className="size-8 p-0">
              {p.isPublished ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
            <Button variant="ghost" size="sm" asChild className="size-8 p-0">
              <Link href={`/dashboard/products/${p._id}`}>
                <Edit className="size-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(p._id)} className="size-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20">
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
