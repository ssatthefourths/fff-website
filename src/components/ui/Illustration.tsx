type IllustrationType = 'scissors' | 'stuffing' | 'pin-cushion';
type IllustrationVariant = 'purple' | 'green';

const SRC: Record<IllustrationType, Partial<Record<IllustrationVariant, string>>> = {
  scissors:      { purple: '/illustrations/Illustrations_Purple_Scissors.svg' },
  stuffing:      { purple: '/illustrations/Illustrations_Purple_Stuffing.svg',
                   green:  '/illustrations/Illustrations_Green_Stuffing.svg' },
  'pin-cushion': { purple: '/illustrations/Illustrations_Purple_Pin Cushion.svg',
                   green:  '/illustrations/Illustrations_Green_Pin Cushion.svg' },
};

interface IllustrationProps {
  type: IllustrationType;
  variant?: IllustrationVariant;
  className?: string;
}

export function Illustration({ type, variant = 'purple', className = 'w-full h-auto' }: IllustrationProps) {
  const src = SRC[type][variant];
  if (!src) return null;
  return <img src={src} alt="" className={className} />;
}
