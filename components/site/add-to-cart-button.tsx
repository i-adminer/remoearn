"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";

interface AddToCartButtonProps {
  product: {
    id: string;
    slug: string;
    title: string;
    category: string;
    price: string;
    priceCents: number;
    image?: string;
    type: 'pdf' | 'proxy';
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem, isInCart } = useCartStore();
  const inCart = isInCart(product.id);

  return (
    <Button
      size="lg"
      className="rounded-full"
      onClick={() => addItem(product)}
      disabled={inCart}
    >
      <ShoppingCart className="mr-2 size-5" />
      {inCart ? "In Cart" : "Add to Cart"}
    </Button>
  );
}
