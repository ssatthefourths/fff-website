export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  onClick?: () => void;
  href?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const BASE =
  'content-stretch flex items-center justify-center rounded-[100px] shrink-0 ' +
  "font-['Roboto:Bold',sans-serif] font-bold leading-[0] text-center tracking-[2.7px] uppercase whitespace-nowrap transition-opacity";

const SIZE: Record<ButtonSize, string> = {
  sm: 'px-[24px] py-[12px] text-[14px]',
  md: 'px-[40px] py-[20px] text-[18px]',
  lg: 'px-[56px] py-[24px] text-[20px]',
};

const VARIANT_WRAPPER: Record<ButtonVariant, string> = {
  primary: 'bg-[#8B52C5] text-[#FFFDF3]',
  secondary: 'bg-[#F6D75A] text-[#3F3F3F]',
  tertiary: 'bg-[#BBD148] text-[#3F3F3F]',
  ghost: 'bg-[#FFFDF3] text-[#8B52C5]',
  outline: 'bg-transparent text-[#8B52C5] relative',
};

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  onClick,
  href,
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = [
    BASE,
    SIZE[size],
    VARIANT_WRAPPER[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {variant === 'outline' && (
        <div
          aria-hidden="true"
          className="absolute border-[3px] border-[#8B52C5] border-solid inset-0 pointer-events-none rounded-[100px]"
        />
      )}
      <span
        className="relative"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </span>
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {inner}
    </button>
  );
}

export default Button;
