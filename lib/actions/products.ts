'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { Collections, Product } from '@/lib/db/mongodb-schema';
import { getSession } from '@/lib/auth/session';

export async function getProducts() {
  const db = await getDb();
  const products = await db.collection<Product>(Collections.PRODUCTS)
    .find({}).sort({ createdAt: -1 }).toArray();
  return products.map(p => ({ ...p, _id: p._id!.toString() }));
}

export async function getPublishedProducts() {
  const db = await getDb();
  const products = await db.collection<Product>(Collections.PRODUCTS)
    .find({ isPublished: true }).sort({ createdAt: -1 }).toArray();
  return products.map(p => ({ ...p, _id: p._id!.toString() }));
}

export async function createProduct(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const product: Product = {
    type: formData.get('type') as 'pdf' | 'proxy',
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string),
    images: JSON.parse(formData.get('images') as string || '[]'),
    pdfUrl: formData.get('pdfUrl') as string || undefined,
    affiliateLink: formData.get('affiliateLink') as string || undefined,
    isPublished: false,
    category: formData.get('category') as string || undefined,
    tags: JSON.parse(formData.get('tags') as string || '[]'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = await getDb();
  const result = await db.collection<Product>(Collections.PRODUCTS).insertOne(product);
  
  revalidatePath('/dashboard/products');
  revalidatePath('/shop');
  return { success: true, id: result.insertedId.toString() };
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const db = await getDb();
  await db.collection<Product>(Collections.PRODUCTS).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        type: formData.get('type') as 'pdf' | 'proxy',
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string),
        images: JSON.parse(formData.get('images') as string || '[]'),
        pdfUrl: formData.get('pdfUrl') as string || undefined,
        affiliateLink: formData.get('affiliateLink') as string || undefined,
        category: formData.get('category') as string || undefined,
        tags: JSON.parse(formData.get('tags') as string || '[]'),
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath('/dashboard/products');
  revalidatePath('/shop');
  return { success: true };
}

export async function toggleProductPublish(id: string) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const db = await getDb();
  const product = await db.collection<Product>(Collections.PRODUCTS).findOne({ _id: new ObjectId(id) });
  if (!product) return { error: 'Not found' };

  await db.collection<Product>(Collections.PRODUCTS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { isPublished: !product.isPublished, updatedAt: new Date() } }
  );

  revalidatePath('/dashboard/products');
  revalidatePath('/shop');
  return { success: true };
}

export async function deleteProduct(id: string) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const db = await getDb();
  await db.collection<Product>(Collections.PRODUCTS).deleteOne({ _id: new ObjectId(id) });

  revalidatePath('/dashboard/products');
  revalidatePath('/shop');
  return { success: true };
}
