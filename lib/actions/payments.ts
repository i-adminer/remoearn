'use server';

import { getDb } from '@/lib/mongodb';
import { Collections, Order, OrderItem } from '@/lib/db/mongodb-schema';
import crypto from 'crypto';
import axios from 'axios';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

interface PaystackPaymentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  items: any[];
}

export async function createPaystackPayment(request: PaystackPaymentRequest) {
  try {
    const db = await getDb();
    
    const orderId = `ORD-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Convert phone to +254 format if needed
    let phone = request.phone.trim();
    if (phone.startsWith('0')) {
      phone = '+254' + phone.substring(1);
    } else if (!phone.startsWith('+')) {
      phone = '+254' + phone;
    }

    const orderItems: OrderItem[] = request.items.map((item: any) => ({
      productId: item.id,
      title: item.title,
      type: item.type,
      price: item.price,
      priceCents: item.priceCents,
      pdfUrl: item.pdfUrl,
    }));

    const totalCents = orderItems.reduce((sum, item) => sum + item.priceCents, 0);

    const order: Order = {
      orderId,
      customerName: `${request.firstName} ${request.lastName}`,
      email: request.email,
      phone: phone,
      items: orderItems,
      totalAmount: totalCents,
      paymentMethod: 'paystack',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection<Order>(Collections.ORDERS).insertOne(order);

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: request.email,
        amount: totalCents,
        currency: 'KES',
        reference: orderId,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?orderId=${orderId}`,
        metadata: {
          orderId,
          first_name: request.firstName,
          last_name: request.lastName,
          phone: phone,
          custom_fields: [
            {
              display_name: 'Customer Name',
              variable_name: 'customer_name',
              value: `${request.firstName} ${request.lastName}`,
            },
            {
              display_name: 'Phone Number',
              variable_name: 'phone',
              value: phone,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status) {
      await db.collection<Order>(Collections.ORDERS).updateOne(
        { orderId },
        {
          $set: {
            transactionId: response.data.data.reference,
            updatedAt: new Date(),
          },
        }
      );

      return {
        success: true,
        authorizationUrl: response.data.data.authorization_url,
        reference: response.data.data.reference,
        orderId,
      };
    } else {
      return {
        success: false,
        error: 'Failed to initialize payment',
      };
    }
  } catch (error: any) {
    console.error('Paystack payment error:', error.response?.data || error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to create payment',
    };
  }
}
