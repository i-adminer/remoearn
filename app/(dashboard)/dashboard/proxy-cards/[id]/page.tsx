import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { ProxyCardForm } from "@/components/admin/proxy-card-form";
import { getDb } from "@/lib/mongodb";
import { Collections, ProxyCard } from "@/lib/db/mongodb-schema";

export const metadata = {
  title: "Edit Proxy Card | Dashboard",
};

export default async function EditProxyCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await getDb();
  const card = await db
    .collection<ProxyCard>(Collections.PROXY_CARDS)
    .findOne({ _id: new ObjectId(id) });

  if (!card) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit Proxy Card
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update card details
        </p>
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-6">
        <ProxyCardForm card={{ ...card, _id: card._id!.toString() }} />
      </div>
    </div>
  );
}
