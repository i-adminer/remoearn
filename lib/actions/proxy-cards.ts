'use server';

import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { Collections, ProxyCard } from '@/lib/db/mongodb-schema';
import { getSession } from '@/lib/auth/session';

export async function getProxyCards() {
  const db = await getDb();
  const cards = await db.collection<ProxyCard>(Collections.PROXY_CARDS)
    .find({}).sort({ order: 1 }).toArray();
  return cards.map(c => ({ ...c, _id: c._id!.toString() }));
}

export async function getActiveProxyCards() {
  const db = await getDb();
  const cards = await db.collection<ProxyCard>(Collections.PROXY_CARDS)
    .find({ isActive: true }).sort({ order: 1 }).toArray();
  return cards.map(c => ({ ...c, _id: c._id!.toString() }));
}

export async function createProxyCard(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const proxyCard: ProxyCard = {
    title: formData.get('title') as string,
    price: formData.get('price') as string,
    description: formData.get('description') as string,
    features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
    frontImageUrl: formData.get('frontImageUrl') as string || undefined,
    backImageUrl: formData.get('backImageUrl') as string || undefined,
    affiliateLink: formData.get('affiliateLink') as string,
    buttonText: formData.get('buttonText') as string,
    isActive: true,
    order: parseInt(formData.get('order') as string) || 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = await getDb();
  const result = await db.collection<ProxyCard>(Collections.PROXY_CARDS).insertOne(proxyCard);
  
  revalidatePath('/dashboard/proxy-cards');
  revalidatePath('/');
  return { success: true, id: result.insertedId.toString() };
}

export async function updateProxyCard(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const db = await getDb();
  await db.collection<ProxyCard>(Collections.PROXY_CARDS).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: formData.get('title') as string,
        price: formData.get('price') as string,
        description: formData.get('description') as string,
        features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
        frontImageUrl: formData.get('frontImageUrl') as string || undefined,
        backImageUrl: formData.get('backImageUrl') as string || undefined,
        affiliateLink: formData.get('affiliateLink') as string,
        buttonText: formData.get('buttonText') as string,
        order: parseInt(formData.get('order') as string) || 0,
        updatedAt: new Date(),
      },
    }
  );

  revalidatePath('/dashboard/proxy-cards');
  revalidatePath('/');
  return { success: true };
}

export async function toggleProxyCardStatus(id: string) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const db = await getDb();
  const card = await db.collection<ProxyCard>(Collections.PROXY_CARDS).findOne({ _id: new ObjectId(id) });
  if (!card) return { error: 'Not found' };

  await db.collection<ProxyCard>(Collections.PROXY_CARDS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { isActive: !card.isActive, updatedAt: new Date() } }
  );

  revalidatePath('/dashboard/proxy-cards');
  revalidatePath('/');
  return { success: true };
}

export async function deleteProxyCard(id: string) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const db = await getDb();
  await db.collection<ProxyCard>(Collections.PROXY_CARDS).deleteOne({ _id: new ObjectId(id) });

  revalidatePath('/dashboard/proxy-cards');
  revalidatePath('/');
  return { success: true };
}
