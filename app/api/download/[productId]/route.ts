import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { Collections, Order, Product } from '@/lib/db/mongodb-schema';
import { ObjectId } from 'mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const token = req.nextUrl.searchParams.get('token');

    console.log('Download request - productId:', productId, 'token:', token);

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 401 });
    }

    const db = await getDb();

    // Find order with this product and token
    const order = await db.collection<Order>(Collections.ORDERS).findOne({
      'items.productId': productId,
      'items.downloadToken': token,
    });

    console.log('Order found:', !!order);
    if (order) {
      console.log('Payment status:', order.paymentStatus);
      console.log('Delivered at:', order.deliveredAt);
    }

    if (!order) {
      return NextResponse.json(
        { error: 'Invalid or expired download link' },
        { status: 404 }
      );
    }

    // Check payment completed
    if (order.paymentStatus !== 'completed') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 403 }
      );
    }

    // Get the order item
    const item = order.items.find(i => i.productId === productId);
    console.log('Item found:', !!item, 'Has pdfUrl:', !!item?.pdfUrl);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // If item has pdfUrl, use it
    if (item.pdfUrl) {
      // Fetch the PDF and set proper filename
      const pdfResponse = await fetch(item.pdfUrl);
      const pdfBlob = await pdfResponse.blob();
      
      const filename = `${item.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      
      return new NextResponse(pdfBlob, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    // Otherwise fetch from product collection
    const product = await db.collection<Product>(Collections.PRODUCTS).findOne({
      _id: new ObjectId(productId),
    });

    console.log('Product found:', !!product, 'Has pdfUrl:', !!product?.pdfUrl);

    if (!product || !product.pdfUrl) {
      return NextResponse.json({ error: 'PDF not available' }, { status: 404 });
    }

    // Fetch the PDF and set proper filename
    const pdfResponse = await fetch(product.pdfUrl);
    const pdfBlob = await pdfResponse.blob();
    
    const filename = `${product.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
    
    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    );
  }
}
