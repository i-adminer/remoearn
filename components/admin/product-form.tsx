"use client";

import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { PdfUpload } from "@/components/admin/pdf-upload";
import { createProduct, updateProduct } from "@/lib/actions/products";

interface ProductFormProps {
  product?: any;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [type, setType] = useState(product?.type || "pdf");
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
  ]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    product?.images || [],
  );
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState(
    product?.pdfUrl?.split("/").pop() || "",
  );
  const [highlights, setHighlights] = useState<string[]>(
    product?.highlights || [""],
  );
  const [price, setPrice] = useState(
    product?.priceCents ? (product.priceCents / 100).toString() : "",
  );
  const [title, setTitle] = useState(product?.title || "");

  const action = product
    ? async (_: any, formData: FormData) => updateProduct(product._id, formData)
    : async (_: any, formData: FormData) => createProduct(formData);
  const [state, formAction, pending] = useActionState(action, undefined);

  if (state?.success) {
    router.push("/dashboard/products");
  }

  const category = type === "pdf" ? "PDF Guide" : "Digital Tool";
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "product";

  function addHighlight() {
    if (highlights.length < 10) setHighlights([...highlights, ""]);
  }

  function removeHighlight(index: number) {
    setHighlights(highlights.filter((_, i) => i !== index));
  }

  function updateHighlight(index: number, value: string) {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  }

  function handleImageChange(index: number, file: File | null) {
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = e.target?.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage(index: number) {
    const newFiles = [...imageFiles];
    newFiles[index] = null;
    setImageFiles(newFiles);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = "";
    setImagePreviews(newPreviews);
  }

  function handlePdfChange(file: File | null) {
    setPdfFile(file);
    if (file) setPdfFileName(file.name);
  }

  async function handleSubmit(formData: FormData) {
    const priceValue = parseFloat(price);
    formData.set("slug", slug);
    formData.set("price", `KSh ${priceValue.toLocaleString()}`);
    formData.set("priceCents", Math.round(priceValue * 100).toString());
    formData.set("category", category);
    formData.set("highlights", JSON.stringify(highlights.filter(Boolean)));

    // Append image files
    imageFiles.forEach((file, index) => {
      if (file) {
        formData.append(`image${index}`, file);
      } else if (imagePreviews[index]) {
        formData.append(`existingImage${index}`, imagePreviews[index]);
      }
    });

    // Append PDF file
    if (type === "pdf") {
      if (pdfFile) {
        formData.append("pdfFile", pdfFile);
      } else if (product?.pdfUrl) {
        formData.set("existingPdfUrl", product.pdfUrl);
      }
    }

    formAction(formData);
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-3xl mb-20">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div className="rounded-lg border border-border/70 bg-card p-6 space-y-4">
        <h3 className="font-semibold">Basic Information</h3>

        <div>
          <label className="block text-sm font-medium mb-2">Type *</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
          >
            <option value="pdf">PDF Guide</option>
            <option value="proxy">Proxy Service</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Remote Income Starter Guide"
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug (URL)</label>
            <input
              value={slug}
              readOnly
              className="w-full h-10 rounded-md border border-border bg-muted px-3 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Auto-generated from title
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <input
              value={category}
              readOnly
              className="w-full h-10 rounded-md border border-border bg-muted px-3 text-sm text-muted-foreground cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Auto-filled based on type
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Price (KSh) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="999"
              className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Will be displayed as KSh{" "}
              {price ? parseFloat(price).toLocaleString() : "0"}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            defaultValue={product?.description}
            required
            rows={4}
            placeholder="A beginner-friendly playbook for building income online..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border/70 bg-card p-6 space-y-4">
        <h3 className="font-semibold">Images (Max 3)</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-2">
                Image {index + 1} {index === 0 && "*"}
              </label>
              <ImageUpload
                value={!imageFiles[index] ? imagePreviews[index] : undefined}
                preview={imageFiles[index] ? imagePreviews[index] : undefined}
                onChange={(file) => handleImageChange(index, file)}
                onRemove={() => removeImage(index)}
                disabled={pending}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border/70 bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Highlights</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addHighlight}
          >
            <Plus className="size-4 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                placeholder="Simple launch framework"
                className="flex-1 h-10 rounded-md border border-border bg-background px-3 text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeHighlight(index)}
                disabled={highlights.length === 1}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {type === "pdf" && (
        <div className="rounded-lg border border-border/70 bg-card p-6 space-y-4">
          <h3 className="font-semibold">PDF File</h3>
          <PdfUpload
            value={!pdfFile ? product?.pdfUrl : undefined}
            fileName={pdfFile ? pdfFileName : undefined}
            onChange={handlePdfChange}
            onRemove={() => {
              setPdfFile(null);
              setPdfFileName("");
            }}
            disabled={pending}
          />
        </div>
      )}

      {type === "proxy" && (
        <div className="rounded-lg border border-border/70 bg-card p-6 space-y-4">
          <h3 className="font-semibold">Affiliate Link</h3>
          <input
            name="affiliateLink"
            type="url"
            defaultValue={product?.affiliateLink}
            placeholder="https://example.com/affiliate"
            className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
          />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : product
              ? "Update Product"
              : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
