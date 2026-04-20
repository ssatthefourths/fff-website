import { useState, useEffect } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { ProductsTab } from './admin/ProductsTab';

type Tab = 'orders' | 'subscribers' | 'products';

export function AdminPage() {
  usePageMeta('Admin Dashboard', 'Manage orders, subscribers, and products.');
  const [tab, setTab] = useState<Tab>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = tab === 'orders' ? '/api/admin/orders' : '/api/admin/subscribers';
    if (tab === 'products') { setLoading(false); return; }
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (tab === 'orders') setOrders(data.orders || []);
        else setSubscribers(data.subscribers || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'orders', label: 'Orders' },
    { key: 'subscribers', label: 'Newsletter' },
    { key: 'products', label: 'Products' },
  ];

  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(32px,4vw,50px)] mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-3 rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold text-[16px] tracking-[2.7px] uppercase transition-all cursor-pointer ${
                tab === t.key ? 'bg-[#8b52c5] text-white' : 'bg-white border-2 border-[#8b52c5] text-[#8b52c5] hover:bg-[#8b52c5]/10'
              }`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-[#8b52c5] border-t-transparent rounded-full" /></div>}

        {/* Orders */}
        {tab === 'orders' && !loading && (
          <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#f4eefa]">
                <tr>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">ID</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Customer</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Email</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Total</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Status</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-[#3f3f3f]/50">No orders yet</td></tr>
                )}
                {orders.map((o: any) => (
                  <tr key={o.id} className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30">
                    <td className="px-6 py-4">#{o.id}</td>
                    <td className="px-6 py-4">{o.customer_name}</td>
                    <td className="px-6 py-4">{o.customer_email}</td>
                    <td className="px-6 py-4 font-bold">${o.total?.toFixed(2)}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${o.status === 'completed' ? 'bg-[#bbd148] text-[#3f3f3f]' : 'bg-yellow-200 text-yellow-800'}`}>{o.status}</span></td>
                    <td className="px-6 py-4 text-sm text-[#3f3f3f]/60">{o.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Subscribers */}
        {tab === 'subscribers' && !loading && (
          <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#f4eefa]">
                <tr>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">ID</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Name</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Email</th>
                  <th className="px-6 py-4 font-bold text-[#8b52c5]">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-[#3f3f3f]/50">No subscribers yet</td></tr>
                )}
                {subscribers.map((s: any) => (
                  <tr key={s.id} className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30">
                    <td className="px-6 py-4">#{s.id}</td>
                    <td className="px-6 py-4">{s.name}</td>
                    <td className="px-6 py-4">{s.email}</td>
                    <td className="px-6 py-4 text-sm text-[#3f3f3f]/60">{s.subscribed_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Products */}
        {tab === 'products' && <ProductsTab />}
      </div>
    </div>
  );
}

export default AdminPage;
