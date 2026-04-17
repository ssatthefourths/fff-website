interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  height?: number;
  amplitude?: number;
  frequency?: number;
  flipX?: boolean;
  flipY?: boolean;
  stitching?: boolean;
  stitchColor?: string;
}

const SVG_W = 1440;

function buildBeziers(H: number, amp: number, freq: number, flipY: boolean): string {
  const midY = H / 2;
  const a = flipY ? -amp : amp;
  const wW = SVG_W / freq;
  let d = '';
  for (let i = 0; i < freq; i++) {
    const ox = i * wW;
    d += ` C ${ox + wW * 0.2},${midY - a} ${ox + wW * 0.3},${midY - a} ${ox + wW * 0.5},${midY}`;
    d += ` C ${ox + wW * 0.7},${midY + a} ${ox + wW * 0.8},${midY + a} ${ox + wW},${midY}`;
  }
  return d.trimStart();
}

export function WaveDivider({
  topColor,
  bottomColor,
  height = 100,
  amplitude = 28,
  frequency = 1,
  flipX = false,
  flipY = false,
  stitching = true,
  stitchColor = '#8B52C5',
}: WaveDividerProps) {
  const H = height;
  const midY = H / 2;
  const beziers = buildBeziers(H, amplitude, frequency, flipY);
  const wavePath = `M 0,${midY} ${beziers}`;
  const topFill = `M 0,0 L 0,${midY} ${beziers} L ${SVG_W},0 Z`;
  const bottomFill = `M 0,${H} L 0,${midY} ${beziers} L ${SVG_W},${H} Z`;
  const transform = flipX ? `scale(-1,1) translate(-${SVG_W},0)` : undefined;

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <svg
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox={`0 0 ${SVG_W} ${H}`}
      >
        <g transform={transform}>
          <path d={topFill} fill={topColor} />
          <path d={bottomFill} fill={bottomColor} />
          {stitching && (
            <path d={wavePath} stroke={stitchColor} strokeWidth="4" strokeDasharray="12 12" fill="none" />
          )}
        </g>
      </svg>
    </div>
  );
}

export default WaveDivider;
