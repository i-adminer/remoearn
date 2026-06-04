'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { Collections, Admin } from '@/lib/db/mongodb-schema';
import { createSession, deleteSession, getSession } from './session';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const db = await getDb();
    const adminsCollection = db.collection<Admin>(Collections.ADMIN);

    const admin = await adminsCollection.findOne({ email });

    if (!admin) {
      return { error: 'Invalid credentials' };
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return { error: 'Invalid credentials' };
    }

    await createSession(admin._id!.toString(), admin.email);
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login' };
  }

  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/admin/login');
}

export async function updatePassword(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return { error: 'Unauthorized' };
  }

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: 'All fields are required' };
  }

  if (newPassword !== confirmPassword) {
    return { error: 'New passwords do not match' };
  }

  if (newPassword.length < 8) {
    return { error: 'Password must be at least 8 characters long' };
  }

  try {
    const db = await getDb();
    const adminsCollection = db.collection<Admin>(Collections.ADMIN);

    const admin = await adminsCollection.findOne({
      _id: new ObjectId(session.adminId),
    });

    if (!admin) {
      return { error: 'Admin not found' };
    }

    const passwordMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!passwordMatch) {
      return { error: 'Current password is incorrect' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await adminsCollection.updateOne(
      { _id: new ObjectId(session.adminId) },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    return { success: true, message: 'Password updated successfully' };
  } catch (error) {
    console.error('Update password error:', error);
    return { error: 'An error occurred while updating password' };
  }
}

export async function getAdminProfile() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  try {
    const db = await getDb();
    const adminsCollection = db.collection<Admin>(Collections.ADMIN);

    const admin = await adminsCollection.findOne(
      { _id: new ObjectId(session.adminId) },
      { projection: { password: 0 } }
    );

    return admin;
  } catch (error) {
    console.error('Get admin profile error:', error);
    return null;
  }
}
