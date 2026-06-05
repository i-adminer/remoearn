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
  slug: string;
  title: string;
  category: string;
  price: string; // Display price (e.g., "KSh 999")
  priceCents: number; // Price in cents for calculations
  description: string;
  image: string; // Primary/cover image
  images: string[]; // All images (max 3)
  highlights: string[]; // Key features/highlights
  pdfUrl?: string; // Only for PDF type
  affiliateLink?: string; // Only for proxy type
  isPublished: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Order
export interface Order {
  _id?: ObjectId;
  orderId: string; // Unique order identifier
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number; // In cents
  paymentMethod: 'paystack';
  paymentStatus: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  paystackReference?: string;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  title: string;
  type: 'pdf' | 'proxy';
  price: string;
  priceCents: number;
  pdfUrl?: string;
  downloadToken?: string;
}

// Collection names
export const Collections = {
  ADMIN: 'admins',
  PROXY_CARDS: 'proxy_cards',
  CONTACT_MESSAGES: 'contact_messages',
  PRODUCTS: 'products',
  ORDERS: 'orders',
} as const;
