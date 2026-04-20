import { useEffect, useState } from 'react';

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  total: number;
  status: string;
  created_at: string;
}

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data: { success?: boolean; orders?: Order[]; error?: string }) => {
        if (!data.success) throw new Error(data.error ?? 'Failed to load orders');
        setOrders(data.orders ?? []);
      })
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,3.5vw,40px)]">Orders</h1>
        <p className="text-[#3f3f3f]/70 text-[14px] mt-1">
          {loading ? 'Loading…' : `${orders.length} total`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{error}</div>
      )}

      <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f4eefa]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">ID</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Customer</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Email</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Total</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Status</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {!loading && orders.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#3f3f3f]/50">No orders yet.</td></tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30 text-[14px]">
                <td className="px-4 py-3">#{o.id}</td>
                <td className="px-4 py-3 font-bold">{o.customer_name}</td>
                <td className="px-4 py-3">{o.customer_email}</td>
                <td className="px-4 py-3 font-bold">${Number(o.total ?? 0).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[1px] ${
                    o.status === 'paid' || o.status === 'completed'
                      ? 'bg-[#bbd148] text-[#3f3f3f]'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}>{o.status}</span>
                </td>
                <td className="px-4 py-3 text-[#3f3f3f]/60 text-[12px]">{o.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTab;
