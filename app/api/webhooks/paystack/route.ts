import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Collections, Order } from '@/lib/db/mongodb-schema';
import crypto from 'crypto';
import {
  sendPaymentReceiptEmail,
  sendPDFDeliveryEmail,
  sendProxyServiceEmail,
} from '@/lib/email-service';
import { generateDownloadToken, createDownloadUrl } from '@/lib/download-token';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle successful payment
    if (event.event === 'charge.success') {
      const { reference } = event.data;

      const db = await getDb();

      // Get order details
      const order = await db.collection<Order>(Collections.ORDERS).findOne({ orderId: reference });

      if (!order) {
        console.error(`Order ${reference} not found`);
        return NextResponse.json({ received: true });
      }

      // Generate download tokens for PDF products
      const pdfItems = order.items.filter((item) => item.type === 'pdf');
      const hasProxy = order.items.some((item) => item.type === 'proxy');

      if (pdfItems.length > 0) {
        // Generate tokens and update order
        const downloadLinks: { title: string; url: string }[] = [];

        for (const item of pdfItems) {
          const token = generateDownloadToken();
          const url = createDownloadUrl(item.productId, token);

          downloadLinks.push({ title: item.title, url });

          // Update item with download token
          await db.collection<Order>(Collections.ORDERS).updateOne(
            { orderId: reference, 'items.productId': item.productId },
            {
              $set: {
                'items.$.downloadToken': token,
              },
            }
          );
        }

        // Send PDF delivery email
        console.log(`Sending PDF delivery email for order ${reference}...`);
        const pdfEmailResult = await sendPDFDeliveryEmail(order, downloadLinks);
        if (pdfEmailResult.success) {
          console.log(`✅ PDF delivery email sent for order ${reference}`);
        } else {
          console.error(`❌ PDF delivery email failed: ${pdfEmailResult.error}`);
        }
      }

      // Update order status
      await db.collection<Order>(Collections.ORDERS).updateOne(
        { orderId: reference },
        {
          $set: {
            paymentStatus: 'completed',
            transactionId: event.data.id,
            deliveredAt: new Date(),
            updatedAt: new Date(),
          },
        }
      );

      // Send payment receipt to customer and admin
      console.log(`Sending payment receipt for order ${reference}...`);
      const receiptResult = await sendPaymentReceiptEmail(order);
      if (receiptResult.success) {
        console.log(`✅ Payment receipt sent for order ${reference}`);
      } else {
        console.error(`❌ Payment receipt failed: ${receiptResult.error}`);
      }

      // Send proxy service email if order contains proxy
      if (hasProxy) {
        console.log(`Sending proxy service email for order ${reference}...`);
        const proxyResult = await sendProxyServiceEmail(order);
        if (proxyResult.success) {
          console.log(`✅ Proxy service email sent for order ${reference}`);
        } else {
          console.error(`❌ Proxy service email failed: ${proxyResult.error}`);
        }
      }

      console.log(`Order ${reference} completed with emails processed`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
