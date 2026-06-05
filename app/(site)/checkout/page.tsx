"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";
import { createPaystackPayment } from "@/lib/actions/payments";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.priceCents, 0) / 100;
  }, [items]);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="size-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <Lock className="size-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add products to get started
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await createPaystackPayment({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          type: item.type,
          price: item.price,
          priceCents: item.priceCents,
        })),
      });

      if (result.success && result.authorizationUrl) {
        // Clear cart and redirect to Paystack
        clearCart();
        window.location.href = result.authorizationUrl;
      } else {
        setError(result.error || "Failed to initialize payment");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/shop"
            className="p-2 hover:bg-secondary rounded-md transition"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Secure Checkout</h1>
            <p className="text-sm text-muted-foreground">
              Complete your purchase securely
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
          {/* Main Content */}
          <div className="min-w-0">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Customer Information */}
              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Wanjiru"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        placeholder="Kamau"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      placeholder="wanjiru@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: value });
                      }}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      placeholder="0712345678"
                      maxLength={10}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: 07XXXXXXXX or 01XXXXXXXX
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Small payment logos */}
              <div className="flex items-center justify-center gap-3 py-2">
                <span className="text-xs text-muted-foreground">Pay with:</span>
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/960px-M-PESA_LOGO-01.svg.png"
                  alt="M-Pesa"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/archive/1/18/20110101235432%21Airtel_logo.svg"
                  alt="Airtel Money"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg/960px-Visa_Inc._logo_%282021%E2%80%93present%29.svg.png"
                  alt="Visa"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              {/* Pay Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="size-4 mr-2" />
                    Pay KSh {total.toLocaleString()}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3" />
                <span>Secured by Paystack</span>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="sm:sticky sm:top-8 sm:h-fit">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {item.image && (
                      <div className="relative size-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.type === "pdf" ? "PDF Guide" : "Proxy Service"}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>KSh {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-semibold pt-4 border-t">
                <span>Total</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
