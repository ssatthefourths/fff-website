import { Fragment, useEffect, useRef, useState, type SyntheticEvent } from 'react';

interface Maker {
  id: number;
  name: string;
  pattern_name: string;
  photo_r2_key: string | null;
  month: string;
  year: number;
  is_winner: number;
  sort_order: number;
  created_at: string | null;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

interface FormState {
  name: string;
  pattern_name: string;
  month: typeof MONTHS[number];
  year: string;
  is_winner: boolean;
  sort_order: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  pattern_name: '',
  month: 'January',
  year: String(new Date().getFullYear()),
  is_winner: true,
  sort_order: '0',
};

export function MakersTab() {
  const [makers, setMakers] = useState<Maker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadingFor, setUploadingFor] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTarget, setUploadTarget] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/makers');
      const data = (await res.json()) as { success?: boolean; makers?: Maker[]; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      setMakers(data.makers ?? []);
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

  function openEdit(m: Maker) {
    setEditingId(m.id);
    setForm({
      name: m.name,
      pattern_name: m.pattern_name,
      month: m.month as typeof MONTHS[number],
      year: String(m.year),
      is_winner: !!m.is_winner,
      sort_order: String(m.sort_order),
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
      const yearNum = parseInt(form.year, 10);
      const sortNum = parseInt(form.sort_order, 10);
      if (!Number.isFinite(yearNum) || yearNum < 2000 || yearNum > 2100) {
        throw new Error('Year must be between 2000 and 2100');
      }
      const body = {
        name: form.name.trim(),
        pattern_name: form.pattern_name.trim(),
        month: form.month,
        year: yearNum,
        is_winner: form.is_winner,
        sort_order: Number.isFinite(sortNum) ? sortNum : 0,
      };
      const url = editingId === null ? '/api/admin/makers' : `/api/admin/makers/${editingId}`;
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

  async function remove(m: Maker) {
    if (!confirm(`Delete maker "${m.name}" (${m.month} ${m.year})? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/makers/${m.id}`, { method: 'DELETE' });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  function pickFile(makerId: number) {
    setUploadTarget(makerId);
    fileInputRef.current?.click();
  }

  async function onFileSelected(e: SyntheticEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    const makerId = uploadTarget;
    if (e.currentTarget) e.currentTarget.value = '';
    setUploadTarget(null);
    if (!file || !makerId) return;

    setUploadingFor(makerId);
    try {
      const form = new FormData();
      form.set('file', file);
      const res = await fetch(`/api/admin/makers/${makerId}/photo`, { method: 'POST', body: form });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : err}`);
    } finally {
      setUploadingFor(null);
    }
  }

  async function removePhoto(m: Maker) {
    if (!m.photo_r2_key) return;
    if (!confirm(`Remove photo for ${m.name}?`)) return;
    try {
      const res = await fetch(`/api/admin/makers/${m.id}/photo`, { method: 'DELETE' });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error ?? `HTTP ${res.status}`);
      await load();
    } catch (err) {
      alert(`Failed: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,3.5vw,40px)]">Makers</h1>
        <p className="text-[#3f3f3f]/70 text-[14px] mt-1">
          {loading ? 'Loading…' : `${makers.length} maker${makers.length === 1 ? '' : 's'} across all months`}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onFileSelected}
        className="hidden"
      />

      <div className="flex justify-end">
        <button
          onClick={openNew}
          className="px-5 py-2 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 cursor-pointer"
        >
          + New maker
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{error}</div>
      )}

      {showForm && (
        <form onSubmit={submit} className="bg-white rounded-[20px] shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[24px]">
              {editingId === null ? 'New maker' : `Edit maker #${editingId}`}
            </h3>
            <button type="button" onClick={closeForm} className="text-[#3f3f3f]/60 hover:text-[#3f3f3f] text-[14px] cursor-pointer">✕ Cancel</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Maker name *</span>
              <input
                type="text" required value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Pattern they made *</span>
              <input
                type="text" required value={form.pattern_name}
                onChange={(e) => setForm((f) => ({ ...f, pattern_name: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Month *</span>
              <select
                value={form.month}
                onChange={(e) => setForm((f) => ({ ...f, month: e.target.value as typeof MONTHS[number] }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              >
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Year *</span>
              <input
                type="number" required min="2000" max="2100" step="1"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="block">
              <span className="block text-[12px] font-bold text-[#8b52c5] uppercase tracking-[1px] mb-1">Sort order</span>
              <input
                type="number" min="0" step="1" value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                className="w-full border-2 border-[#8b52c5]/30 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8b52c5]"
              />
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer md:mt-6">
              <input
                type="checkbox"
                checked={form.is_winner}
                onChange={(e) => setForm((f) => ({ ...f, is_winner: e.target.checked }))}
                className="size-4 accent-[#8b52c5]"
              />
              <span className="text-[14px] font-bold text-[#3f3f3f]">Featured winner</span>
            </label>
          </div>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">{formError}</div>
          )}

          <button
            type="submit" disabled={submitting}
            className="px-6 py-2.5 rounded-[100px] bg-[#8b52c5] text-white font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Saving…' : editingId === null ? 'Create maker' : 'Save changes'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-[20px] shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#f4eefa]">
            <tr>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Photo</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Name</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Pattern</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Month / Year</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Winner</th>
              <th className="px-4 py-3 font-bold text-[#8b52c5] text-[13px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && makers.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#3f3f3f]/50">No makers yet.</td></tr>
            )}
            {makers.map((m) => (
              <Fragment key={m.id}>
                <tr className="border-t border-[#f4eefa] hover:bg-[#f4eefa]/30 text-[14px]">
                  <td className="px-4 py-3">
                    {m.photo_r2_key ? (
                      <img src={`/r2/${m.photo_r2_key}`} alt="" className="w-14 h-14 rounded-[8px] object-cover" />
                    ) : (
                      <div className="w-14 h-14 rounded-[8px] bg-[#f4eefa] flex items-center justify-center text-[#8b52c5] text-[20px] font-bold">
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold">{m.name}</td>
                  <td className="px-4 py-3">{m.pattern_name}</td>
                  <td className="px-4 py-3 text-[12px]">{m.month} {m.year}</td>
                  <td className="px-4 py-3">
                    {m.is_winner ? (
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[1px] bg-[#bbd148] text-[#3f3f3f]">Winner</span>
                    ) : (
                      <span className="text-[11px] text-[#3f3f3f]/50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12px]">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => pickFile(m.id)}
                        disabled={uploadingFor === m.id}
                        className="text-[#8b52c5] hover:underline cursor-pointer disabled:opacity-50"
                      >
                        {uploadingFor === m.id ? 'Uploading…' : m.photo_r2_key ? 'Replace photo' : 'Upload photo'}
                      </button>
                      {m.photo_r2_key && (
                        <button onClick={() => removePhoto(m)} className="text-red-600 hover:underline cursor-pointer">Remove photo</button>
                      )}
                      <button onClick={() => openEdit(m)} className="text-[#8b52c5] hover:underline cursor-pointer">Edit</button>
                      <button onClick={() => remove(m)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
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

export default MakersTab;
