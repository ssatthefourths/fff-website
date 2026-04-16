import React from 'react';
import { BrandImage } from '../../atoms/BrandImage';
import { Typography } from '../../atoms/Typography';

export interface ReviewCardProps {
  quote: string;
  customerName: string;
  avatarSrc: string;
  avatarAlt?: string;
}

export function ReviewCard({ quote, customerName, avatarSrc, avatarAlt = '' }: ReviewCardProps) {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative gap-[20px]">
      {/* Opening quote */}
      <span
        className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#8b52c5] text-[clamp(4rem,10.42vw,9.375rem)] text-center whitespace-nowrap"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Centre: avatar + quote + name */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[30px] items-center min-h-px min-w-px relative">
        {/* Avatar */}
        <div className="relative shrink-0" style={{ width: 'clamp(80px,10.42vw,150px)', height: 'clamp(86px,10.63vw,153px)' }}>
          <BrandImage
            src={avatarSrc}
            alt={avatarAlt}
            className="block max-w-none size-full object-cover"
          />
        </div>

        {/* Quote text + customer name */}
        <div className="content-stretch flex flex-col gap-[34px] items-center relative shrink-0 text-center w-full">
          <Typography variant="display" color="#3f3f3f" align="center" className="w-full">
            {quote}
          </Typography>
          <span
            className="font-['Roboto:Bold',sans-serif] font-bold leading-[normal] text-[#8b52c5] text-[18px] tracking-[2.7px] uppercase w-full text-center"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {customerName}
          </span>
        </div>
      </div>

      {/* Closing quote */}
      <span
        className="font-['Bingo_Action_Comic:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#8b52c5] text-[clamp(4rem,10.42vw,9.375rem)] text-center whitespace-nowrap"
        aria-hidden="true"
      >
        &rdquo;
      </span>
    </div>
  );
}

export default ReviewCard;
