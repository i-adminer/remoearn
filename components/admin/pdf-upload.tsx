"use client";

import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PdfUploadProps {
  value?: string;
  onChange: (file: File | null) => void;
  fileName?: string;
  onRemove?: () => void;
  disabled?: boolean;
}

export function PdfUpload({ value, onChange, fileName, onRemove, disabled }: PdfUploadProps) {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  }

  const displayName = fileName || value?.split('/').pop();

  return (
    <div className="space-y-2">
      {displayName ? (
        <div className="flex items-center gap-3 rounded-md border border-border bg-muted/30 p-3">
          <FileText className="size-8 text-blue-500" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground">PDF file</p>
          </div>
          {onRemove && !disabled && (
            <Button type="button" size="icon" variant="ghost" onClick={onRemove}>
              <X className="size-4" />
            </Button>
          )}
        </div>
      ) : (
        <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 transition hover:bg-muted/50">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
          />
          <FileText className="size-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">Click to upload PDF</p>
        </label>
      )}
    </div>
  );
}
