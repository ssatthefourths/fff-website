import React from 'react';
import { BrandImage } from '../../atoms/BrandImage';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';

export interface BlogCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  excerpt: string;
  href?: string;
}

export function BlogCard({ imageSrc, imageAlt = '', title, excerpt, href }: BlogCardProps) {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-center min-h-px min-w-px relative w-full">
      {/* Thumbnail */}
      <div className="h-[305px] relative rounded-[20px] shrink-0 w-full overflow-hidden">
        <BrandImage
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full"
        />
      </div>

      {/* Text */}
      <div className="content-stretch flex flex-col gap-[15px] items-start leading-[0] relative shrink-0 text-[#3f3f3f] text-center w-full">
        <Typography variant="body-lg" className="w-full">
          {title}
        </Typography>
        <Typography variant="body" className="w-full">
          {excerpt}
        </Typography>
      </div>

      {href && (
        <Button variant="outline" label="Read more" href={href} />
      )}
    </div>
  );
}

export default BlogCard;
