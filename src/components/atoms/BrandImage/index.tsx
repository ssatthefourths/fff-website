import React from 'react';
import { ImageWithFallback } from '../../../app/components/figma/ImageWithFallback';

// Thin wrapper around ImageWithFallback that adds lazy loading and
// an optional aspect-ratio container. Use this for all product / content images.

interface BrandImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export function BrandImage({
  src,
  alt,
  className = '',
  style,
  width,
  height,
  objectFit = 'cover',
}: BrandImageProps) {
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      className={className}
      style={{
        objectFit,
        ...style,
      }}
    />
  );
}

export default BrandImage;
