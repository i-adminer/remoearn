import { ProductForm } from '@/components/admin/product-form';

export const metadata = {
  title: 'New Product | Dashboard',
};

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New Product</h1>
        <p className="text-sm text-muted-foreground mt-1">Create a new product</p>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <ProductForm />
      </div>
    </div>
  );
}
