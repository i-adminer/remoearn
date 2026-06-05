"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // Fetch order details (emails will be sent automatically by the API)
      fetch(`/api/orders/${orderId}`)
        .then(res => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Fetch error:', err);
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="size-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center animate-pulse">
            <CheckCircle2 className="size-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="size-20 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle2 className="size-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-semibold mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order is confirmed.
          </p>
        </div>

        {order && (
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono">{order.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer</span>
                  <span>{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold">
                    KSh {(order.totalAmount / 100).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Your Items</h2>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-md bg-secondary/30">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.type === 'pdf' ? 'Digital PDF' : 'Proxy Service'}</p>
                    </div>
                    {item.type === 'pdf' && item.pdfUrl && (
                      <Button size="sm" asChild>
                        <a href={item.pdfUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="size-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20 p-4">
              <div className="flex gap-3">
                <Mail className="size-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Check Your Email
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    We've sent your order confirmation and download links to {order.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        )}

        {!order && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-6">
              Order not found or still processing
            </p>
            <Button asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="size-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center animate-pulse">
            <CheckCircle2 className="size-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
