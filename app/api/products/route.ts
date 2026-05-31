import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

export async function GET() {
  if (!db) {
    return NextResponse.json({ products: [] });
  }

  const items = await db.select().from(products).orderBy(desc(products.createdAt));
  return NextResponse.json({ products: items });
}

export async function POST(request: Request) {
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 400 });
  }

  const body = await request.json();
  if (!body?.title || !body?.slug || !body?.description) {
    return NextResponse.json({ error: "title, slug and description are required" }, { status: 400 });
  }

  const [created] = await db
    .insert(products)
    .values({
      title: body.title,
      slug: body.slug,
      description: body.description,
      category: body.category ?? "Digital Product",
      priceCents: Number(body.priceCents ?? 0),
      imageUrl: body.imageUrl ?? "",
      cloudinaryPublicId: body.cloudinaryPublicId ?? null,
      fileUrl: body.fileUrl ?? null,
      isFeatured: Boolean(body.isFeatured),
      isActive: body.isActive ?? true,
    })
    .returning();

  return NextResponse.json({ product: created }, { status: 201 });
}
