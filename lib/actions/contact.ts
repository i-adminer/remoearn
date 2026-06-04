'use server';

import nodemailer from 'nodemailer';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { Collections, ContactMessage } from '@/lib/db/mongodb-schema';
import { getSession } from '@/lib/auth/session';
import { ObjectId } from 'mongodb';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function submitContactForm(formData: FormData) {
  const message: ContactMessage = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
    isRead: false,
    createdAt: new Date(),
  };

  const db = await getDb();
  await db.collection<ContactMessage>(Collections.CONTACT_MESSAGES).insertOne(message);

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_FROM,
    subject: `Contact Form: ${message.subject}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${message.name} (${message.email})</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message}</p>
    `,
  });

  return { success: true };
}

export async function getContactMessages() {
  const session = await getSession();
  if (!session) return [];

  const db = await getDb();
  const messages = await db.collection<ContactMessage>(Collections.CONTACT_MESSAGES)
    .find({}).sort({ createdAt: -1 }).toArray();
  return messages.map(m => ({ ...m, _id: m._id!.toString() }));
}

export async function markMessageAsRead(id: string) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  const db = await getDb();
  await db.collection<ContactMessage>(Collections.CONTACT_MESSAGES).updateOne(
    { _id: new ObjectId(id) },
    { $set: { isRead: true, readAt: new Date() } }
  );

  revalidatePath('/dashboard/messages');
  return { success: true };
}
