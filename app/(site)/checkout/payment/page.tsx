"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Smartphone, Lock, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";
import { featuredProducts } from "@/lib/site-content";

function PaymentContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const itemsParam = searchParams.get("items") || "";
  const { clearCart } = useCartStore();
  
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const itemIds = itemsParam.split(",").filter(Boolean);
    const loaded = itemIds.map(id => {
      const product = featuredProducts.find(p => p.slug === id);
      if (product) {
        return {
          id: product.slug,
          title: product.title,
          price: product.price,
        };
      }
      return null;
    }).filter(Boolean);
    setItems(loaded as any[]);
  }, [itemsParam]);

  const total = items.reduce((sum, item: any) => sum + parseInt(item.price.replace(/[^\d]/g, "")), 0);
  const totalDisplay = `KSh ${total.toLocaleString()}`;

  const handleMpesa = async () => {
    if (!phone || phone.length < 9) return;
    setLoading(true);
    // Simulate STK push
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setSent(true);
  };

  const handleCard = async () => {
    setLoading(true);
    // Simulate Stripe redirect
    await new Promise(r => setTimeout(r, 1500));
    alert("Redirecting to Stripe...");
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Smartphone className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold">Check your phone</h2>
          <p className="text-sm text-muted-foreground">Enter your M-Pesa PIN to complete payment</p>
          <p className="text-xs text-muted-foreground">Sent to {phone}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-8">
        <Link href="/checkout" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-xl font-semibold mb-6 flex items-center gap-3">
          {method === "mpesa" ? (
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="M-Pesa" className="h-7" />
          ) : (
            <div className="flex items-center gap-1">
              <img src="https://www.svgrepo.com/show/473823/visa.svg" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            </div>
          )}
        </h1>

        {/* Order Summary */}
        <div className="rounded-xl bg-secondary/50 p-4 mb-6">
          {items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm py-1">
              <span>{item.title}</span>
              <span>{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-medium pt-2 mt-2 border-t">
            <span>Total</span>
            <span>{totalDisplay}</span>
          </div>
        </div>

        {method === "mpesa" ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">M-Pesa Phone Number</label>
              <input
                type="tel"
                placeholder="254712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-input bg-background px-4 text-lg"
              />
            </div>
            <Button onClick={handleMpesa} className="w-full h-12" disabled={loading || phone.length < 9}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay ${totalDisplay}`}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://www.svgrepo.com/show/473823/visa.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <span className="text-sm text-muted-foreground">Secure payment</span>
              </div>
            </div>
            <Button onClick={handleCard} className="w-full h-12" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay ${totalDisplay}`}
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Secure payment
        </p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}