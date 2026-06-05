'use server';

import { getDb } from '@/lib/mongodb';
import { Collections, Order } from '@/lib/db/mongodb-schema';
import {
  sendPaymentReceiptEmail,
  sendPDFDeliveryEmail,
  sendProxyServiceEmail,
} from '@/lib/email-service';
import { generateDownloadToken, createDownloadUrl } from '@/lib/download-token';

export async function sendOrderEmails(orderId: string) {
  console.log('🔔 sendOrderEmails called for:', orderId);
  try {
    const db = await getDb();
    const order = await db.collection<Order>(Collections.ORDERS).findOne({ orderId });

    if (!order) {
      console.error('❌ Order not found:', orderId);
      return { success: false, error: 'Order not found' };
    }

    console.log('✅ Order found:', order.paymentStatus);

    if (order.paymentStatus !== 'completed') {
      console.error('❌ Payment not completed:', order.paymentStatus);
      return { success: false, error: 'Payment not completed' };
    }

    // Check if already delivered
    if (order.deliveredAt) {
      console.log('✅ Already delivered');
      return { success: true, message: 'Already delivered' };
    }

    console.log('📧 Starting email sending process...');

    // Generate download tokens for PDF products
    const pdfItems = order.items.filter((item) => item.type === 'pdf');
    const hasProxy = order.items.some((item) => item.type === 'proxy');

    if (pdfItems.length > 0) {
      console.log(`📄 Found ${pdfItems.length} PDF items`);
      const downloadLinks: { title: string; url: string }[] = [];

      for (const item of pdfItems) {
        const token = generateDownloadToken();
        const url = createDownloadUrl(item.productId, token);

        downloadLinks.push({ title: item.title, url });

        await db.collection<Order>(Collections.ORDERS).updateOne(
          { orderId, 'items.productId': item.productId },
          { $set: { 'items.$.downloadToken': token } }
        );
      }

      console.log('📧 Sending PDF delivery email...');
      const pdfResult = await sendPDFDeliveryEmail(order, downloadLinks);
      console.log('PDF email result:', pdfResult);
    }

    // Send payment receipt
    console.log('📧 Sending payment receipt...');
    const receiptResult = await sendPaymentReceiptEmail(order);
    console.log('Receipt result:', receiptResult);

    // Send proxy service email if needed
    if (hasProxy) {
      console.log('📧 Sending proxy service email...');
      const proxyResult = await sendProxyServiceEmail(order);
      console.log('Proxy result:', proxyResult);
    }

    // Mark as delivered
    await db.collection<Order>(Collections.ORDERS).updateOne(
      { orderId },
      {
        $set: {
          deliveredAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    console.log('✅ All emails sent successfully!');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Send emails error:', error);
    return { success: false, error: error.message };
  }
}
