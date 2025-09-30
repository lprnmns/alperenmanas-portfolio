"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageCarousel({ images, currentIndex, onNext, onPrev }: ImageCarouselProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || images.length <= 1) {
      return undefined;
    }

    timerRef.current = setTimeout(() => {
      onNext();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, images.length, onNext]);

  const handleNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onNext();
  };

  const handlePrev = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onPrev();
  };

  if (images.length === 0) {
    return <div className="aspect-video w-full rounded-xl border-2 border-dashed border-slate-700 bg-slate-900" />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900" style={{ aspectRatio: "16/9" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={images[currentIndex]}
          alt={`Proje görseli ${currentIndex + 1}`}
          width={1200}
          height={675}
          quality={85}
          priority={currentIndex === 0}
          className="h-full w-full object-contain"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white transition hover:bg-black/70"
            aria-label="Önceki görsel"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white transition hover:bg-black/70"
            aria-label="Sonraki görsel"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
