"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string;
  priceCents: number;
  image?: string;
  type: "pdf" | "proxy";
};

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCartStore();
  const [added, setAdded] = useState(false);

  const isInCart = items.some((i) => i.id === product.id);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={isInCart || added}
      size="lg"
      className={cn(
        "gap-2 rounded-full px-6",
        isInCart && "bg-green-600 hover:bg-green-700",
        added && "bg-green-600 hover:bg-green-700"
      )}
    >
      {isInCart || added ? (
        <>
          <Check className="size-5" />
          {added ? "Added to Cart" : "In Cart"}
        </>
      ) : (
        <>
          <ShoppingCart className="size-5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}