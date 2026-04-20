import { Fragment, useEffect, useState, type SyntheticEvent } from 'react';

interface DiscountCode {
  id: number;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  min_subtotal_cents: number | null;
  max_uses: number | null;
  uses_count: number;
  expires_at: string | null;
  is_active: number;
  created_at: string | null;
}

interface FormState {
  code: string;
  type: 'percent' | 'fixed';
  value: string;          // string while editing; parsed on submit
  min_dollars: string;    // UI input in dollars, stored as cents
  max_uses: string;       // empty = unlimited
  expires_at: string;     // datetime-local value
  is_active: boolean;
}

const EMPTY_FORM: FormState = {
  code: '',
  type: 'percent',
  value: '',
  min_dollars: '',
  max_uses: '',
  expires_at: '',
  is_active: true,
};

function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  // Convert ISO to local datetime-local input format (YYYY-MM-DDTHH:mm)
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatValue(c: DiscountCode): string {
  return c.type === 'percent' ? `${c.value}%` : `$${(c.value / 100).toFixed(2)}`;
}

export function DiscountsTab() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/discounts');
      const data = (await res.json()) as { success?: boolean; codes?: DiscountCode[]; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      setCodes(data.codes ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowForm(true);
  }

  function openEdit(c: DiscountCode) {
    setEditingId(c.id);
    setForm({
      code: c.code,
      type: c.type,
      value: c.type === 'percent' ? String(c.value) : (c.value / 100).toFixed(2),
      min_dollars: c.min_subtotal_cents ? (c.min_subtotal_cents / 100).toFixed(2) : '',
      max_uses: c.max_uses !== null ? String(c.max_uses) : '',
      expires_at: toLocalInput(c.expires_at),
      is_active: !!c.is_active,
    });
    setFormError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  }

  async function submit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const parsedValue = Number(form.value);
      if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
        throw new Error('Value must be a positive number');
      }
      if (form.type === 'percent' && parsedValue > 100) {
        throw new Error('Percent value must be 0–100');
      }

      const body: Record<string, unknown> = {
        code: form.code.trim().toUpperCase(),
        type: form.type,
        // Percent value stays integer. Fixed is stored as cents.
        value: form.type === 'percent' ? Math.round(parsedValue) : Math.round(parsedValue * 100),
        is_active: form.is_active,
      };
      if (form.min_dollars.trim()) {
        const minD = Number(form.min_dollars);
        if (!Number.isFinite(minD) || minD < 0) throw new Error('Minimum must be a non-negative number');
        body.min_subtotal_cents = Math.round(minD * 100);
      }
      if (form.max_uses.trim()) {
        const mu = parseInt(form.max_uses, 10);
        if (!Number.isFinite(mu) || mu <= 0) throw new Error('Max uses must be a positive whole number');
        body.max_uses = mu;
      } else {
        body.max_uses = null;
      }
      if (form.expires_at.trim()) {
        // datetime-local gives us "YYYY-MM-DDTHH:mm" (no timezone); treat as local.
        const d = new Date(form.expires_at);
        if (Number.isNaN(d.getTime())) throw new Error('Invalid expiry date');
        body.expires_at = d.toISOString();
      } else {
        body.expires_at = null;
      }

      const url = editingId === null ? '/api/admin/discounts' : `/api/admin/discounts/${editingId}`;
      const method = editingId === null ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      closeForm();
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(c: DiscountCode) {
    const msg = c.uses_count > 0
      ? `"${c.code}" has been used ${c.uses_count} time(s). It will be deactivated (soft-deleted) to preserve order history. Continue?`
      : `Delete "${c.code}"? This cannot be undone.`;
    if (!confirm(msg)) return;
    try {
      const res = await fetch(`/api/admin/discounts/${c.id}`, { method: 'DELETE' });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,3.5vw,40px)]">Discount codes</h1>
        <p className="text-[#3f3f3f]/70 text-[14px] mt-1">
          {loading ? 'Loading…' : `${codes.length} code${codes.length === 1 ? '' : 's'}`}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={openNew}
          className="px-5 py-2 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 cursor-pointer"
        >
          + New code
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{error}</div>
      )}

      {showForm && (
        <form onSubmit={submit} className="bg-white rounded-[20px] shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[24px]">
              {editingId === null ? 'New code' : `Edit code #${editingId}`}
            </h3>
            <button type="button" onClick={closeForm} className="text-[#3f3f3f]/60 hover:text-[#3f3f3f] text-[14px] cursor-pointer">✕ Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Code *</span>
              <input
                type="text"
                required
                pattern="[A-Za-z0-9_-]+"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 font-mono uppercase focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Type *</span>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as FormState['type'] }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              >
                <option value="percent">Percent off (%)</option>
                <option value="fixed">Fixed amount off ($)</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">
                {form.type === 'percent' ? 'Percent * (1–100)' : 'Amount (AUD) *'}
              </span>
              <input
                type="number"
                step={form.type === 'percent' ? '1' : '0.01'}
                min="0"
                required
                value={form.value}
                onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Minimum order (AUD)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.min_dollars}
                onChange={(e) => setForm((f) => ({ ...f, min_dollars: e.target.value }))}
                placeholder="No minimum"
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Max total uses</span>
              <input
                type="number"
                min="1"
                step="1"
                value={form.max_uses}
                onChange={(e) => setForm((f) => ({ ...f, max_uses: e.target.value }))}
                placeholder="Unlimited"
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Expires at</span>
              <input
                type="datetime-local"
                value={form.expires_at}
                onChange={(e) => setForm((f) => ({ ...f, expires_at: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
              className="size-4 accent-[#8b52c5]"
            />
            <span className="text-[14px] font-bold text-[#3f3f3f]">Active</span>
          </label>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{formError}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Saving…' : editingId === null ? 'Create code' : 'Save changes'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f4eefa]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Code</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Value</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Min order</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Uses</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Expires</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Status</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && codes.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[#3f3f3f]/50">No codes yet. Create your first discount to get started.</td></tr>
            )}
            {codes.map((c) => (
              <Fragment key={c.id}>
                <tr className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30 text-[14px]">
                  <td className="px-4 py-3 font-mono font-bold">{c.code}</td>
                  <td className="px-4 py-3">{formatValue(c)}</td>
                  <td className="px-4 py-3">{c.min_subtotal_cents ? `$${(c.min_subtotal_cents / 100).toFixed(2)}` : '—'}</td>
                  <td className="px-4 py-3">{c.uses_count}{c.max_uses ? `/${c.max_uses}` : ''}</td>
                  <td className="px-4 py-3 text-[12px] text-[#3f3f3f]/70">{c.expires_at ? new Date(c.expires_at).toLocaleString() : 'Never'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[1px] ${c.is_active ? 'bg-[#bbd148] text-[#3f3f3f]' : 'bg-gray-200 text-gray-600'}`}>
                      {c.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px]">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="text-[#8b52c5] hover:underline cursor-pointer">Edit</button>
                      <button onClick={() => remove(c)} className="text-red-600 hover:underline cursor-pointer">
                        {c.uses_count > 0 ? 'Deactivate' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiscountsTab;
