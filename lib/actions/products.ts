'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { Collections, Product } from '@/lib/db/mongodb-schema';
import { getSession } from '@/lib/auth/session';
import { uploadToCloudinary } from '@/lib/cloudinary';

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

async function uploadFile(file: File | null, type: 'image' | 'raw'): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const result = await uploadToCloudinary(buffer, type);
  return result.secure_url;
}

export async function createProduct(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  try {
    // Upload images
    const images: string[] = [];
    for (let i = 0; i < 3; i++) {
      const file = formData.get(`image${i}`) as File | null;
      const existingUrl = formData.get(`existingImage${i}`) as string;
      
      if (file && file.size > 0) {
        const url = await uploadFile(file, 'image');
        if (url) images.push(url);
      } else if (existingUrl) {
        images.push(existingUrl);
      }
    }

    if (images.length === 0) {
      return { error: 'At least one image is required' };
    }

    // Upload PDF if type is pdf
    let pdfUrl: string | undefined;
    const type = formData.get('type') as 'pdf' | 'proxy';
    if (type === 'pdf') {
      const pdfFile = formData.get('pdfFile') as File | null;
      const existingPdf = formData.get('existingPdfUrl') as string;
      
      if (pdfFile && pdfFile.size > 0) {
        pdfUrl = await uploadFile(pdfFile, 'raw');
      } else if (existingPdf) {
        pdfUrl = existingPdf;
      }
    }

    const product: Product = {
      type,
      slug: formData.get('slug') as string,
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      priceCents: parseInt(formData.get('priceCents') as string),
      description: formData.get('description') as string,
      image: images[0],
      images,
      highlights: JSON.parse(formData.get('highlights') as string || '[]'),
      pdfUrl,
      affiliateLink: formData.get('affiliateLink') as string || undefined,
      isPublished: false,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection<Product>(Collections.PRODUCTS).insertOne(product);
    
    revalidatePath('/dashboard/products');
    revalidatePath('/shop');
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error('Create product error:', error);
    return { error: 'Failed to create product' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  try {
    // Upload images
    const images: string[] = [];
    for (let i = 0; i < 3; i++) {
      const file = formData.get(`image${i}`) as File | null;
      const existingUrl = formData.get(`existingImage${i}`) as string;
      
      if (file && file.size > 0) {
        const url = await uploadFile(file, 'image');
        if (url) images.push(url);
      } else if (existingUrl) {
        images.push(existingUrl);
      }
    }

    // Upload PDF if type is pdf
    let pdfUrl: string | undefined;
    const type = formData.get('type') as 'pdf' | 'proxy';
    if (type === 'pdf') {
      const pdfFile = formData.get('pdfFile') as File | null;
      const existingPdf = formData.get('existingPdfUrl') as string;
      
      if (pdfFile && pdfFile.size > 0) {
        pdfUrl = await uploadFile(pdfFile, 'raw');
      } else if (existingPdf) {
        pdfUrl = existingPdf;
      }
    }

    const db = await getDb();
    await db.collection<Product>(Collections.PRODUCTS).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          type,
          slug: formData.get('slug') as string,
          title: formData.get('title') as string,
          category: formData.get('category') as string,
          price: formData.get('price') as string,
          priceCents: parseInt(formData.get('priceCents') as string),
          description: formData.get('description') as string,
          image: images[0],
          images,
          highlights: JSON.parse(formData.get('highlights') as string || '[]'),
          pdfUrl,
          affiliateLink: formData.get('affiliateLink') as string || undefined,
          updatedAt: new Date(),
        },
      }
    );

    revalidatePath('/dashboard/products');
    revalidatePath('/shop');
    return { success: true };
  } catch (error) {
    console.error('Update product error:', error);
    return { error: 'Failed to update product' };
  }
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
