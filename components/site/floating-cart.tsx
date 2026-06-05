"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useCartStore, type CartItem } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingCart() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, getTotal, getCount } = useCartStore();
  const count = getCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || count === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      >
        <ShoppingCart className="size-5" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold">
            {count}
          </span>
        )}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/70 p-4">
            <h2 className="text-lg font-semibold">Your Cart ({count})</h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 hover:bg-secondary"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} onRemove={removeItem} />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-border/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-xl font-bold">
                  KSh {getTotal().toLocaleString()}
                </span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CartItemRow({
  item,
  onRemove,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-secondary/30 p-3">
      {item.image && (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.price}</p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="rounded-full p-2 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}