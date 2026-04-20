import { BrandImage } from '../../atoms/BrandImage';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';

export interface ProductCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaVariant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';
}

export function ProductCard({
  imageSrc,
  imageAlt = '',
  title,
  description,
  ctaLabel = 'Get the pattern',
  ctaHref,
  ctaVariant = 'outline',
}: ProductCardProps) {
  return (
    // White card with dashed purple border — matches design exactly
    <div className="bg-white relative rounded-[20px] shrink-0 w-full h-full">
      <div aria-hidden="true" className="absolute border-[3px] border-[#8b52c5] border-dashed inset-0 pointer-events-none rounded-[20px]" />

      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[27px] items-center p-[clamp(16px,2.08vw,30px)] relative size-full">
          {/* Product image — square */}
          <div className="relative rounded-[20px] shrink-0 w-full aspect-square max-w-[280px]">
            <BrandImage
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full"
            />
          </div>

          {/* Title */}
          <Typography variant="h2" color="#8b52c5" align="center" className="w-full">
            {title}
          </Typography>

          {/* Optional description */}
          {description && (
            <Typography variant="body" color="#3f3f3f" align="center" className="w-full">
              {description}
            </Typography>
          )}

          {/* CTA */}
          {ctaHref ? (
            <Button variant={ctaVariant} label={ctaLabel} href={ctaHref} />
          ) : (
            <Button variant={ctaVariant} label={ctaLabel} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
