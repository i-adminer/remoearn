import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 400 });
  }

  const { id } = await params;
  const body = await request.json();

  const [updated] = await db
    .update(products)
    .set({
      title: body.title,
      slug: body.slug,
      description: body.description,
      category: body.category,
      priceCents: body.priceCents,
      imageUrl: body.imageUrl,
      cloudinaryPublicId: body.cloudinaryPublicId,
      fileUrl: body.fileUrl,
      isFeatured: body.isFeatured,
      isActive: body.isActive,
    })
    .where(eq(products.id, id))
    .returning();

  return NextResponse.json({ product: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 400 });
  }

  const { id } = await params;
  await db.delete(products).where(eq(products.id, id));

  return NextResponse.json({ deleted: true });
}
