"use client";

import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null) => void;
  preview?: string;
  onRemove?: () => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, preview, onRemove, disabled }: ImageUploadProps) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  }

  return (
    <div className="space-y-2">
      {preview || value ? (
        <div className="relative group">
          <img src={preview || value} alt="Upload" className="h-40 w-full rounded-md object-cover border border-border" />
          {onRemove && !disabled && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 size-8 opacity-0 group-hover:opacity-100 transition"
              onClick={onRemove}
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
      ) : (
        <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 transition hover:bg-muted/50">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
          />
          <Upload className="size-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Click to upload</p>
        </label>
      )}
    </div>
  );
}
