"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/lib/cart";
import { featuredProducts } from "@/lib/site-content";

function getProductBySlug(slug: string) {
  return featuredProducts.find((p) => p.slug === slug);
}

type CheckoutItem = CartItem & { image?: string };

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [step, setStep] = useState<"info" | "payment">("info");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("product");
    if (slug) {
      const product = getProductBySlug(slug);
      if (product) {
        setCheckoutItems([{
          id: product.slug,
          slug: product.slug,
          title: product.title,
          category: product.category,
          price: product.price,
          priceCents: product.priceCents,
          image: product.image,
          type: "pdf",
        }]);
      }
    } else if (items.length > 0) {
      setCheckoutItems(items);
    }
  }, [items]);

  const total = getTotal();
  const totalDisplay = `KSh ${total.toLocaleString()}`;

  const handleContinue = () => {
    if (customerInfo.name && customerInfo.email) {
      setStep("payment");
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add products to checkout</p>
        <Button asChild>
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={checkoutItems.length === 1 ? "/shop" : "/shop"} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>

        {/* Order Summary - Compact */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Order Summary</p>
          <div className="space-y-2">
            {checkoutItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <div className="relative h-10 w-10 shrink-0 rounded-md bg-secondary overflow-hidden">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                </div>
                <p className="text-sm font-medium">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 mt-3 border-t">
            <span className="text-sm font-medium">Total</span>
            <span className="text-lg font-semibold">{checkoutItems.length === 1 ? checkoutItems[0].price : totalDisplay}</span>
          </div>
        </div>

        {/* Step 1: Customer Info */}
        {step === "info" && (
          <div className="space-y-4">
            <p className="text-sm font-medium">Contact Information</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(p => ({ ...p, name: e.target.value }))}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                type="email"
                placeholder="Email for delivery"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(p => ({ ...p, email: e.target.value }))}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <Button 
              onClick={handleContinue} 
              className="w-full h-11 mt-4"
              disabled={!customerInfo.name || !customerInfo.email}
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {/* Step 2: Payment Options */}
        {step === "payment" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{customerInfo.name}</p>
                <p className="text-xs text-muted-foreground">{customerInfo.email}</p>
              </div>
              <button onClick={() => setStep("info")} className="text-xs text-primary hover:underline">
                Edit
              </button>
            </div>

            <p className="text-sm font-medium pt-2">Payment Method</p>
            
            <Button
              asChild
              className="w-full h-14 flex items-center justify-between px-4"
              variant="outline"
            >
              <Link href={`/checkout/payment?method=mpesa&items=${checkoutItems.map(i => i.id).join(',')}`}>
                <span className="flex items-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="M-Pesa" className="h-6" />
                  <span className="text-sm">M-Pesa</span>
                </span>
                <span className="text-muted-foreground text-xs">Mobile Money</span>
              </Link>
            </Button>

            <Button
              asChild
              className="w-full h-14 flex items-center justify-between px-4"
              variant="outline"
            >
              <Link href={`/checkout/payment?method=card&items=${checkoutItems.map(i => i.id).join(',')}`}>
                <span className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <img src="https://www.svgrepo.com/show/473823/visa.svg" alt="Visa" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                  </div>
                  <span className="text-sm">Card / Bank</span>
                </span>
                <span className="text-muted-foreground text-xs">Visa, Mastercard</span>
              </Link>
            </Button>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-8 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Secure checkout • Instant digital delivery
        </p>
      </div>
    </div>
  );
}