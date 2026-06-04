import { ObjectId } from 'mongodb';

// Admin
export interface Admin {
  _id?: ObjectId;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Proxy Card
export interface ProxyCard {
  _id?: ObjectId;
  title: string;
  price: string;
  description: string;
  features: string[];
  frontImageUrl?: string;
  backImageUrl?: string;
  affiliateLink: string;
  buttonText: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Contact Message
export interface ContactMessage {
  _id?: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

// Product (PDF and Proxy items)
export interface Product {
  _id?: ObjectId;
  type: 'pdf' | 'proxy';
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[]; // Up to 3 images for PDFs
  pdfUrl?: string; // Only for PDF type
  affiliateLink?: string; // Only for proxy type
  isPublished: boolean;
  category?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Collection names
export const Collections = {
  ADMIN: 'admins',
  PROXY_CARDS: 'proxy_cards',
  CONTACT_MESSAGES: 'contact_messages',
  PRODUCTS: 'products',
} as const;
