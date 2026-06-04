import { notFound } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { ProductForm } from '@/components/admin/product-form';
import { getDb } from '@/lib/mongodb';
import { Collections, Product } from '@/lib/db/mongodb-schema';

export const metadata = {
  title: 'Edit Product | Dashboard',
};

export default async function EditProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const db = await getDb();
  const product = await db.collection<Product>(Collections.PRODUCTS)
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
        <p className="text-sm text-muted-foreground mt-1">Update product details</p>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <ProductForm product={{ ...product, _id: product._id!.toString() }} />
      </div>
    </div>
  );
}
