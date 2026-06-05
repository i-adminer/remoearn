"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function nextImage() {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setIsFullscreen(false);
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
        {images.length > 1 && (
          <div className="sm:w-20 lg:w-24">
            {/* Mobile: Horizontal scroll */}
            <div className="flex sm:hidden gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border-2 transition snap-start ${
                    i === selectedIndex
                      ? "border-primary ring-1 ring-primary"
                      : "border-border/40 hover:border-border"
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`View ${i + 1}`} 
                    fill 
                    className="object-cover" 
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
            
            {/* Desktop: Vertical scroll */}
            <div className="hidden sm:flex flex-col gap-2">
              <div className="space-y-2 max-h-[400px] lg:max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`relative aspect-square w-full overflow-hidden rounded-md border-2 transition ${
                      i === selectedIndex
                        ? "border-primary ring-1 ring-primary"
                        : "border-border/40 hover:border-border"
                    }`}
                  >
                    <Image 
                      src={img} 
                      alt={`View ${i + 1}`} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 640px) 80px, (max-width: 1024px) 80px, 96px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Image */}
        <div className="flex-1">
          <div 
            className="relative group aspect-square sm:aspect-[4/3] overflow-hidden rounded-lg border border-border/70 bg-secondary cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${title} - Image ${selectedIndex + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
            />
            {/* Hover overlay with zoom icon - Desktop only */}
            <div className="hidden sm:flex absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors items-center justify-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-white/90 text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Maximize2 className="size-5" />
              </div>
            </div>
            {/* Always visible button on mobile */}
            <button
              className="sm:hidden absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm shadow-lg"
              onClick={() => setIsFullscreen(true)}
              aria-label="View fullscreen"
            >
              <Maximize2 className="size-4" />
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2">
            Click image to view fullscreen
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex size-9 sm:size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close fullscreen"
          >
            <X className="size-5 sm:size-6" />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 z-10 flex size-9 sm:size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5 sm:size-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 z-10 flex size-9 sm:size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="size-5 sm:size-6" />
              </button>
            </>
          )}

          {/* Main fullscreen image */}
          <div 
            className="relative w-full h-full max-w-[95vw] max-h-[85vh] sm:max-w-[90vw] sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${title} - Fullscreen`}
              fill
              className="object-contain"
              sizes="95vw"
              quality={100}
            />
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>
          )}

          {/* Keyboard hint - hidden on mobile */}
          <div className="hidden sm:block absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
            Press ESC to close • Use ← → to navigate
          </div>
        </div>
      )}
    </>
  );
}
