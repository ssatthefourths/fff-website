import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface DashboardStats {
  productCount: number;
  orderCount: number;
  subscriberCount: number;
  revenueCents: number;
}

interface RecentOrder {
  id: number;
  customer_name: string;
  customer_email: string;
  total: number;
  status: string;
  created_at: string;
}

// The dashboard does a few small fetches in parallel. Each admin endpoint
// already returns a { success, items[] } shape, so we derive counts
// client-side rather than adding a dedicated /stats endpoint for now.
export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<RecentOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    interface ProductsRes { products?: unknown[] }
    interface OrdersRes { orders?: RecentOrder[] }
    interface SubsRes { subscribers?: unknown[] }

    async function load() {
      try {
        const [productsRes, ordersRes, subsRes] = await Promise.all([
          fetch('/api/admin/products?limit=500').then((r) => r.json() as Promise<ProductsRes>),
          fetch('/api/admin/orders').then((r) => r.json() as Promise<OrdersRes>),
          fetch('/api/admin/subscribers').then((r) => r.json() as Promise<SubsRes>),
        ]);
        if (cancelled) return;
        const orders = ordersRes.orders ?? [];
        const revenueCents = orders
          .filter((o) => o.status === 'paid' || o.status === 'completed')
          .reduce((sum, o) => sum + Math.round(Number(o.total ?? 0) * 100), 0);
        setStats({
          productCount: (productsRes.products ?? []).length,
          orderCount: orders.length,
          subscriberCount: (subsRes.subscribers ?? []).length,
          revenueCents,
        });
        setRecent(orders.slice(0, 5));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  const tiles: { label: string; value: string; to?: string; href?: string; tone: string }[] = [
    {
      label: 'Products',
      value: stats ? String(stats.productCount) : '…',
      to: '/admin/products',
      tone: 'bg-[#f4eefa]',
    },
    {
      label: 'Orders',
      value: stats ? String(stats.orderCount) : '…',
      to: '/admin/orders',
      tone: 'bg-[#dde8a3]',
    },
    {
      label: 'Subscribers',
      value: stats ? String(stats.subscriberCount) : '…',
      to: '/admin/newsletter',
      tone: 'bg-[#fdf8e0]',
    },
    {
      label: 'Revenue (AUD)',
      value: stats ? `$${(stats.revenueCents / 100).toFixed(2)}` : '…',
      tone: 'bg-[#f9b7b7]/40',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(32px,4vw,48px)]">
          Dashboard
        </h1>
        <p className="text-[#3f3f3f]/70 text-[14px] mt-1">At-a-glance view of the shop.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => {
          const inner = (
            <div className={`${tile.tone} rounded-[16px] p-5 h-full`}>
              <p className="text-[12px] font-bold text-[#3f3f3f]/60 uppercase tracking-[2px] mb-2">{tile.label}</p>
              <p className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,3vw,38px)] leading-none">{tile.value}</p>
            </div>
          );
          if (tile.to) return <Link key={tile.label} to={tile.to} className="block hover:scale-[1.02] transition-transform">{inner}</Link>;
          if (tile.href) return <a key={tile.label} href={tile.href} target="_blank" rel="noopener noreferrer" className="block hover:scale-[1.02] transition-transform">{inner}</a>;
          return <div key={tile.label}>{inner}</div>;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] shadow-md p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#8b52c5] text-[18px]">Recent orders</h2>
            <Link to="/admin/orders" className="text-[12px] text-[#8b52c5] hover:underline">View all →</Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-[#3f3f3f]/50 text-[14px]">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-[#f4eefa]">
              {recent.map((o) => (
                <li key={o.id} className="py-3 flex items-center justify-between text-[14px]">
                  <div className="min-w-0">
                    <p className="font-bold truncate">#{o.id} — {o.customer_name}</p>
                    <p className="text-[#3f3f3f]/60 text-[12px] truncate">{o.customer_email}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-bold">${Number(o.total ?? 0).toFixed(2)}</p>
                    <p className="text-[#3f3f3f]/60 text-[11px] uppercase tracking-[1px]">{o.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#f4eefa] rounded-[20px] p-6 space-y-3">
          <h2 className="font-bold text-[#8b52c5] text-[18px]">Newsletter is on Bento</h2>
          <p className="text-[#3f3f3f]/70 text-[14px]">
            New subscribers land in our D1 table and are mirrored to Bento for broadcasts + automations.
            Manage sends, segments, and flows in the Bento dashboard.
          </p>
          <a
            href="https://app.bentonow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[12px] uppercase tracking-[1.5px] hover:brightness-110"
          >
            Open Bento <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
