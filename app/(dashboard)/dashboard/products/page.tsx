import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsList } from '@/components/admin/products-list';
import { getProducts } from '@/lib/actions/products';

export const metadata = {
  title: 'Products | Dashboard',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage PDF guides and proxy products</p>
        </div>
        <Button asChild size="sm" className="gap-2">
          <Link href="/dashboard/products/new">
            <Plus className="size-4" />
            New Product
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <ProductsList products={products} />
      </div>
    </div>
  );
}
