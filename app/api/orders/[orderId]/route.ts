import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Collections, Order } from '@/lib/db/mongodb-schema';
import {
  sendPaymentReceiptEmail,
  sendPDFDeliveryEmail,
  sendProxyServiceEmail,
} from '@/lib/email-service';
import { generateDownloadToken, createDownloadUrl } from '@/lib/download-token';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const db = await getDb();

    const order = await db
      .collection<Order>(Collections.ORDERS)
      .findOne({ orderId });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    console.log('📦 Order status:', order.paymentStatus, 'Delivered:', order.deliveredAt);

    // In test mode with successful redirect, mark as completed if still pending
    if (order.paymentStatus === 'pending') {
      console.log('🔄 Marking test order as completed...');
      await db.collection<Order>(Collections.ORDERS).updateOne(
        { orderId },
        {
          $set: {
            paymentStatus: 'completed',
            updatedAt: new Date(),
          },
        }
      );
      order.paymentStatus = 'completed'; // Update local object
    }

    // Send emails if payment completed and not yet delivered
    if (order.paymentStatus === 'completed' && !order.deliveredAt) {
      console.log('🔔 Payment completed, sending emails for:', orderId);

      try {
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
          await sendPDFDeliveryEmail(order, downloadLinks);
        }

        // Send payment receipt
        console.log('📧 Sending payment receipt...');
        await sendPaymentReceiptEmail(order);

        // Send proxy service email if needed
        if (hasProxy) {
          console.log('📧 Sending proxy service email...');
          await sendProxyServiceEmail(order);
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
      } catch (emailError) {
        console.error('❌ Email sending failed:', emailError);
      }
    }

    return NextResponse.json({
      orderId: order.orderId,
      customerName: order.customerName,
      email: order.email,
      items: order.items,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
