import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
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
      <img
        src="/illustrations/Funky Friends Factory_RGB_Primary Logo_Purple.svg"
        alt="Funky Friends Factory"
        className="absolute block inset-0 size-full object-contain"
      />
    </Link>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      // Client-side nav keeps the app shell + carries the query into
      // ShopPage's useSearchParams driver (no full reload).
      navigate(`/patterns?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div
      className="hidden md:block absolute bg-[#bbd148] border-[#8b52c5] border-b-2 border-dashed border-l-2 border-r-2 h-[68px] right-[2.64vw] rounded-bl-[20px] rounded-br-[20px] rounded-tl-[5px] rounded-tr-[5px] top-0 w-[clamp(240px,31.6vw,455px)]"
      data-name="SEARCH BAR CONTAINER"
    >
      <form onSubmit={handleSubmit} className="absolute h-[40px] left-[3.96%] top-[14px] w-[91.2%] flex items-center">
        <input
          type="text"
          placeholder="Search patterns..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full bg-white border-2 border-[#8b52c5] rounded-[20px] px-4 pr-10 text-[#3f3f3f] text-[14px] font-['Roboto:Regular',sans-serif] focus:outline-none focus:border-[#8b52c5]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B52C5" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const allLinks = [...leftLinks, ...rightLinks];
  const closeMobile = () => setMobileOpen(false);

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
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
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
                  key={link.to || link.href}
                  label={link.label}
                  href={link.href}
                  to={link.to}
                  onClick={closeMobile}
                  className="font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[2.7px] uppercase text-[#8b52c5]"
                />
              ))}
              <Link to="/cart" onClick={closeMobile} className="font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[2.7px] uppercase text-[#8b52c5]">
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navigation;
