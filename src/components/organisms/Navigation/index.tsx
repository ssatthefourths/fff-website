import { Link } from 'react-router';
import { NavItem } from '../../molecules/NavItem';
import svgPaths from '../../../assets/svgPaths';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../../../app/components/ui/sheet';
import { useCart } from '../../../context/CartContext';

export interface NavLink {
  label: string;
  href: string;
  to?: string;
}

export interface NavigationProps {
  leftLinks?: NavLink[];
  rightLinks?: NavLink[];
}

const DEFAULT_LEFT_LINKS: NavLink[] = [
  { label: 'Shop', href: '#shop', to: '/patterns' },
  { label: 'Tutorials', href: '#tutorials', to: '/beginners' },
  { label: 'Competitions', href: '#competitions', to: '/blog?category=competitions' },
];

const DEFAULT_RIGHT_LINKS: NavLink[] = [
  { label: 'About', href: '#about', to: '/about' },
  { label: 'Help', href: '#help', to: '/faq' },
  { label: 'Blog', href: '#blog', to: '/blog' },
  { label: 'Login / Account', href: '#account', to: '/account' },
];

function FffMainLogo() {
  return (
    <Link to="/" className="h-[clamp(80px,10.42vw,150px)] relative shrink-0 w-[clamp(125px,16.32vw,235px)] block">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 235 150"
      >
        <g clipPath="url(#clip-nav-logo)">
          <path d={svgPaths.pfbfa400} fill="var(--fill-0, white)" />
          <path d={svgPaths.pdbd4570} fill="var(--fill-0, white)" />
          <path d={svgPaths.p346d7b40} fill="var(--fill-0, white)" />
          <path d={svgPaths.p186aa200} fill="var(--fill-0, white)" />
          <path d={svgPaths.p72d9300} fill="var(--fill-0, white)" />
          <path d={svgPaths.p374d9280} fill="var(--fill-0, white)" />
          <path d={svgPaths.p3dabb600} fill="var(--fill-0, white)" />
          <path d={svgPaths.p1054e200} fill="var(--fill-0, white)" />
          <path d={svgPaths.p432e300} fill="var(--fill-0, white)" />
          <path d={svgPaths.p3a45d000} fill="var(--fill-0, white)" />
          <path d={svgPaths.p14079a00} fill="var(--fill-0, white)" />
          <path d={svgPaths.p2342e780} fill="var(--fill-0, white)" />
          <path d={svgPaths.p7fe00} fill="var(--fill-0, white)" />
          <path d={svgPaths.p20996200} fill="var(--fill-0, white)" />
          <path d={svgPaths.p3ea27600} fill="var(--fill-0, white)" />
          <path d={svgPaths.p2f1bee00} fill="var(--fill-0, white)" />
          <path d={svgPaths.p36082f50} fill="var(--fill-0, white)" />
          <path d={svgPaths.p2be58900} fill="var(--fill-0, white)" />
          <path d={svgPaths.p39c513c0} fill="var(--fill-0, white)" />
          <path d={svgPaths.p348c2c00} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p3d0f0a00} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p31d019f0} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.pd90ec00} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p3ef2df80} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p1bb83f70} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p36315100} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p2e41b900} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p330c54f0} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p3d379b00} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p37169590} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p3616ef40} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p2ab12340} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p1a9add00} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p7bba00} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p1619f400} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p272a0900} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p24f2b480} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p2d04bb80} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p250fd00} fill="var(--fill-0, #BBD148)" />
          <path d={svgPaths.p161b3500} fill="var(--fill-0, #BBD148)" />
          <path d={svgPaths.p270ac200} fill="var(--fill-0, #BBD148)" />
          <path d={svgPaths.p19123f00} fill="var(--fill-0, #BBD148)" />
          <path d={svgPaths.p18ea8e70} fill="var(--fill-0, #F6D75A)" />
          <path d={svgPaths.p38c9c780} fill="var(--fill-0, #BBD148)" />
          <path d={svgPaths.pc781880} fill="var(--fill-0, white)" />
          <path d={svgPaths.p2f0cb400} fill="var(--fill-0, #F4EEFA)" />
          <path d={svgPaths.p1c3e77f0} fill="var(--fill-0, #BBD148)" />
          <path d={svgPaths.p8cc5c80} fill="var(--fill-0, #F4EEFA)" />
          <path d={svgPaths.pe602300} fill="var(--fill-0, #F4EEFA)" />
          <path d={svgPaths.p97a9a00} fill="var(--fill-0, #F4EEFA)" />
          <path d={svgPaths.p1b219d00} fill="var(--fill-0, #F4EEFA)" />
          <path d={svgPaths.pa842000} fill="var(--fill-0, #F4EEFA)" />
          <path d={svgPaths.p791b180} fill="var(--fill-0, #8B52C5)" />
          <path d={svgPaths.p1cd0d600} fill="var(--fill-0, #8B52C5)" />
        </g>
        <defs>
          <clipPath id="clip-nav-logo">
            <rect fill="white" height="150" width="235" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
}

function SearchBar() {
  return (
    // Search bar dropdown: lime green panel that hangs from the top-right
    // Desktop only — hidden on mobile
    <div
      className="hidden md:block absolute bg-[#bbd148] border-[#8b52c5] border-b-2 border-dashed border-l-2 border-r-2 h-[68px] right-[2.64vw] rounded-bl-[20px] rounded-br-[20px] rounded-tl-[5px] rounded-tr-[5px] top-0 w-[clamp(240px,31.6vw,455px)]"
      data-name="SEARCH BAR CONTAINER"
    >
      {/* Search bar SVG scaled to container */}
      <div className="absolute h-[40px] left-[3.96%] top-[14px] w-[91.2%]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 415 40"
        >
          <g clipPath="url(#clip-search-bar)">
            <path
              d={svgPaths.p23e56c00}
              stroke="var(--stroke-0, #8B52C5)"
              strokeWidth="2"
            />
            <g>
              <path d={svgPaths.p1d577600} fill="var(--fill-0, #8B52C5)" />
              <path d={svgPaths.p23899000} fill="var(--fill-0, #8B52C5)" />
            </g>
          </g>
          <defs>
            <clipPath id="clip-search-bar">
              <rect fill="white" height="40" width="415" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// Hamburger icon — three lines
function HamburgerIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
      <rect width="28" height="3" rx="1.5" fill="#8B52C5" />
      <rect y="8.5" width="28" height="3" rx="1.5" fill="#8B52C5" />
      <rect y="17" width="28" height="3" rx="1.5" fill="#8B52C5" />
    </svg>
  );
}

export function Navigation({
  leftLinks = DEFAULT_LEFT_LINKS,
  rightLinks = DEFAULT_RIGHT_LINKS,
}: NavigationProps) {
  const { itemCount } = useCart();
  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <div
      className="relative h-[clamp(100px,12.92vw,186px)] w-full overflow-hidden"
      data-name="NAV SECTION"
    >
      {/* ── DESKTOP NAV ── */}
      <div className="hidden md:flex absolute inset-0 items-center justify-between px-[2.64vw]">
        {/* Left nav items — pushed down to clear search bar */}
        <div className="flex gap-[clamp(14px,2.08vw,30px)] items-center pt-[clamp(32px,4.17vw,60px)]">
          {leftLinks.map((link) => (
            <NavItem
              key={link.to || link.href}
              label={link.label}
              href={link.href}
              to={link.to}
              className="font-['Roboto:Bold',sans-serif] font-bold text-[clamp(13px,1.25vw,18px)] tracking-[2.7px] uppercase text-[#8b52c5] whitespace-nowrap"
            />
          ))}
        </div>

        {/* Logo — centred */}
        <FffMainLogo />

        {/* Right nav items — pushed down to clear search bar */}
        <div className="flex gap-[clamp(14px,2.08vw,30px)] items-center pt-[clamp(32px,4.17vw,60px)]">
          {rightLinks.map((link) => (
            <NavItem
              key={link.to || link.href}
              label={link.label}
              href={link.href}
              to={link.to}
              className="font-['Roboto:Bold',sans-serif] font-bold text-[clamp(13px,1.25vw,18px)] tracking-[2.7px] uppercase text-[#8b52c5] whitespace-nowrap"
            />
          ))}
          <Link to="/cart" className="relative font-['Roboto:Bold',sans-serif] font-bold text-[clamp(13px,1.25vw,18px)] tracking-[2.7px] uppercase text-[#8b52c5] whitespace-nowrap transition-opacity hover:opacity-70">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#bbd148] text-[#3f3f3f] text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center">{itemCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar dropdown — desktop only, positioned at top-right */}
      <SearchBar />

      {/* ── MOBILE NAV ── */}
      <div className="flex md:hidden absolute inset-0 items-center justify-between px-[20px]">
        {/* Logo */}
        <FffMainLogo />

        {/* Hamburger → Sheet drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="p-2 -mr-2"
            >
              <HamburgerIcon />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#FFFDF3] border-l-2 border-[#8B52C5] w-[280px] pt-[60px]">
            <nav className="flex flex-col gap-[28px] px-[24px]">
              {allLinks.map((link) => (
                <NavItem
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  className="font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[2.7px] uppercase text-[#8b52c5]"
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navigation;
