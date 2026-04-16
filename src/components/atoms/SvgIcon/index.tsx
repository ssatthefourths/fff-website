import React from 'react';
import svgPaths from '../../../assets/svgPaths';

// Renders any named SVG path from the brand's path library.
// preserveAspectRatio="none" matches the Figma export convention.

interface SvgIconProps {
  pathKey: keyof typeof svgPaths;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  viewBox: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SvgIcon({
  pathKey,
  fill = 'currentColor',
  stroke,
  strokeWidth,
  viewBox,
  className = 'absolute block inset-0 size-full',
  style,
}: SvgIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      preserveAspectRatio="none"
      viewBox={viewBox}
      style={style}
    >
      <path
        d={svgPaths[pathKey]}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export default SvgIcon;
