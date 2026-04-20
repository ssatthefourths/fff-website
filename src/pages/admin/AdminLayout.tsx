import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

interface NavItemConfig {
  to: string;
  label: string;
  icon: string; // emoji placeholder — swap for proper SVG icons later
  exact?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  { to: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { to: '/admin/products', label: 'Products', icon: '🧸' },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/newsletter', label: 'Newsletter', icon: '📧' },
];

// External services live outside our DB; surface them here so the admin has
// one place to get to everything. Add new links as they come online.
const EXTERNAL_LINKS: { href: string; label: string; icon: string }[] = [
  { href: 'https://app.bentonow.com', label: 'Bento', icon: '✉️' },
  { href: 'https://dash.cloudflare.com', label: 'Cloudflare', icon: '☁️' },
];

export function AdminLayout() {
  const navigate = useNavigate();
  const { user, loading, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Client-side gate. The server middleware (functions/api/admin/_middleware.ts)
  // is authoritative for data; this is purely a UX redirect so non-admins
  // don't see an empty shell. Includes ?next=/admin so they come back after
  // login.
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/account?next=/admin', { replace: true });
      return;
    }
    if (!isAdmin) {
      navigate('/account', { replace: true });
    }
  }, [loading, user, isAdmin, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-[#8b52c5] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdf3] flex">
      {/* ── Mobile sidebar backdrop ───────────────────────────────── */}
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <aside
        className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          fixed lg:sticky top-0 left-0 z-40 h-screen w-[260px] bg-[#8b52c5] text-white
          flex flex-col transition-transform duration-200`}
      >
        <div className="px-6 py-6 border-b border-white/10">
          <p className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[26px] leading-tight">
            Funky Friends
          </p>
          <p className="text-white/70 text-[12px] uppercase tracking-[2px]">Admin</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.exact}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-bold transition-colors ${
                      isActive ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <span className="text-[18px]" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 px-3">
            <p className="px-3 text-white/50 text-[11px] uppercase tracking-[2px] mb-2">External</p>
            <ul className="space-y-1">
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[14px] font-bold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span className="text-[18px]" aria-hidden="true">{link.icon}</span>
                    <span className="flex-1">{link.label}</span>
                    <span aria-hidden="true" className="text-white/40 text-[12px]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-2 text-[13px]">
          <div>
            <p className="font-bold truncate">{user.name}</p>
            <p className="text-white/60 text-[11px] truncate">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="flex-1 text-center px-3 py-1.5 rounded-[8px] bg-white/10 hover:bg-white/20 text-white/90 text-[12px] font-bold transition-colors"
            >
              View site
            </a>
            <button
              onClick={() => { void logout().then(() => navigate('/', { replace: true })); }}
              className="flex-1 px-3 py-1.5 rounded-[8px] bg-white/10 hover:bg-white/20 text-white/90 text-[12px] font-bold cursor-pointer transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main pane ─────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0">
        {/* Mobile top bar — sidebar is hidden by default at <lg */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-[#f4eefa] px-4 py-3 flex items-center justify-between">
          <button
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="text-[#8b52c5] text-[24px] cursor-pointer"
          >☰</button>
          <p className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[20px]">Admin</p>
          <div className="w-6" /> {/* spacer for symmetry */}
        </div>

        <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-10 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
