import { useEffect, useState } from 'react';

interface Subscriber {
  id: number;
  name: string;
  email: string;
  subscribed_at: string;
}

export function NewsletterTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then((r) => r.json())
      .then((data: { success?: boolean; subscribers?: Subscriber[]; error?: string }) => {
        if (!data.success) throw new Error(data.error ?? 'Failed to load subscribers');
        setSubscribers(data.subscribers ?? []);
      })
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,3.5vw,40px)]">Newsletter</h1>
          <p className="text-[#3f3f3f]/70 text-[14px] mt-1">
            {loading ? 'Loading…' : `${subscribers.length} subscriber${subscribers.length === 1 ? '' : 's'}`} captured on-site.
            Broadcasts + automations live in Bento.
          </p>
        </div>
        <a
          href="https://app.bentonow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[12px] uppercase tracking-[1.5px] hover:brightness-110 self-start"
        >
          Open Bento <span aria-hidden="true">↗</span>
        </a>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{error}</div>
      )}

      <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f4eefa]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">ID</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Name</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Email</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {!loading && subscribers.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-[#3f3f3f]/50">No subscribers yet.</td></tr>
            )}
            {subscribers.map((s) => (
              <tr key={s.id} className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30 text-[14px]">
                <td className="px-4 py-3">#{s.id}</td>
                <td className="px-4 py-3 font-bold">{s.name}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3 text-[#3f3f3f]/60 text-[12px]">{s.subscribed_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsletterTab;
