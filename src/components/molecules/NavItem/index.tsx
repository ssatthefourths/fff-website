import { Link, useLocation } from 'react-router';

export interface NavItemProps {
  label: string;
  href: string;
  to?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavItem({ label, href, to, active, onClick, className = '' }: NavItemProps) {
  const location = useLocation();
  const isActive = active ?? (to ? location.pathname.startsWith(to) : false);

  const classes = [
    "capitalize font-['Avenir:Heavy',sans-serif] leading-[1.6] not-italic text-[clamp(0.875rem,1.25vw,1.125rem)]",
    'transition-opacity hover:opacity-70',
    isActive ? 'underline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} className={classes}>
      {label}
    </a>
  );
}

export default NavItem;
