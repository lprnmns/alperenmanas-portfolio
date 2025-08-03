'use client';

import React, { useEffect, useRef } from 'react';

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  currentIndex, 
  onNext, 
  onPrev 
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay functionality
  useEffect(() => {
    if (images.length <= 1) return;

    timerRef.current = setTimeout(() => {
      onNext();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, images.length, onNext]);

  // Reset timer when user interacts
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
    return <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full" />;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
      {/* Image display with fade transition */}
      <div className="absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Carousel image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
            aria-label="Previous image"
          >
            {'<'}
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
            aria-label="Next image"
          >
            {'>'}
          </button>
        </>
      )}
      
      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;