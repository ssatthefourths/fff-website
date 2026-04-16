import React from 'react';

// Typography variants mapped to brand fonts and fluid clamp() sizes
// Font sizes: clamp(mobile-min, fluid-vw, desktop-max)
// Based on 1440px desktop widths found in the design

export type TypographyVariant =
  | 'display'       // Magic Honey — decorative callout text (~45px desktop)
  | 'h1'            // Bingo Action Comic — big section headings (~70px desktop)
  | 'h2'            // Bingo Action Comic — card/product headings (~50px desktop)
  | 'h3'            // Roboto Bold — sub-headings (~26px desktop)
  | 'body'          // Avenir Book — body copy (~18px desktop)
  | 'body-lg'       // Roboto Regular — larger body / subheadings (~26px desktop)
  | 'caption'       // Avenir Heavy — labels, copyright, small UI text (~18px desktop)
  | 'nav'           // Avenir Heavy — navigation links (~18px desktop)
  | 'button-label'; // Roboto Bold uppercase tracked — only used inside Button atom

export interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const STYLES: Record<TypographyVariant, { font: string; size: string; extra: string }> = {
  display: {
    font: "font-['Magic_Honey:Regular',sans-serif]",
    size: 'text-[clamp(1.75rem,3.13vw,2.8125rem)]', // 28px→45px
    extra: 'leading-[1.4] not-italic',
  },
  h1: {
    font: "font-['Bingo_Action_Comic:Regular',sans-serif]",
    size: 'text-[clamp(2rem,4.86vw,4.375rem)]', // 32px→70px
    extra: 'leading-none not-italic',
  },
  h2: {
    font: "font-['Bingo_Action_Comic:Regular',sans-serif]",
    size: 'text-[clamp(1.75rem,3.47vw,3.125rem)]', // 28px→50px
    extra: 'leading-none not-italic capitalize',
  },
  h3: {
    font: "font-['Roboto:Bold',sans-serif] font-bold",
    size: 'text-[clamp(1rem,1.81vw,1.625rem)]', // 16px→26px
    extra: 'leading-[1.4]',
  },
  body: {
    font: "font-['Avenir:Book',sans-serif]",
    size: 'text-[clamp(0.875rem,1.25vw,1.125rem)]', // 14px→18px
    extra: 'leading-[1.6] not-italic',
  },
  'body-lg': {
    font: "font-['Roboto:Regular',sans-serif] font-normal",
    size: 'text-[clamp(1rem,1.81vw,1.625rem)]', // 16px→26px
    extra: 'leading-[1.4]',
  },
  caption: {
    font: "font-['Avenir:Heavy',sans-serif]",
    size: 'text-[clamp(0.75rem,1.25vw,1.125rem)]', // 12px→18px
    extra: 'leading-[1.6] not-italic capitalize',
  },
  nav: {
    font: "font-['Avenir:Heavy',sans-serif]",
    size: 'text-[clamp(0.875rem,1.25vw,1.125rem)]', // 14px→18px
    extra: 'leading-[1.6] not-italic capitalize',
  },
  'button-label': {
    font: "font-['Roboto:Bold',sans-serif] font-bold",
    size: 'text-[18px]',
    extra: 'leading-[0] tracking-[2.7px] uppercase whitespace-nowrap',
  },
};

const DEFAULT_TAG: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  display: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  'body-lg': 'p',
  caption: 'span',
  nav: 'span',
  'button-label': 'span',
};

export function Typography({
  variant,
  children,
  color,
  align,
  className = '',
  as,
}: TypographyProps) {
  const Tag = (as ?? DEFAULT_TAG[variant]) as keyof React.JSX.IntrinsicElements;
  const { font, size, extra } = STYLES[variant];

  const classes = [font, size, extra, align ? `text-${align}` : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classes}
      style={color ? { color } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Typography;
