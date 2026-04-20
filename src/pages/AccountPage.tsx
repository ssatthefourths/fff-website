import { useEffect, useState, type SyntheticEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface OrderItemView {
  id: number;
  product_id: number;
  product_name: string | null;
  product_slug: string | null;
  price: number;
  download: {
    url: string;
    expires_at: string | null;
    downloads_used: number;
    max_downloads: number;
  } | null;
}

interface OrderView {
  id: number;
  total: number;
  status: string;
  currency: string;
  created_at: string | null;
  items: OrderItemView[];
}

function statusTone(status: string): string {
  if (status === 'paid' || status === 'completed') return 'bg-[#bbd148] text-[#3f3f3f]';
  if (status === 'failed' || status === 'cancelled') return 'bg-red-100 text-red-800';
  if (status === 'refunded') return 'bg-[#f4eefa] text-[#8b52c5]';
  return 'bg-yellow-100 text-yellow-900';
}

function OrdersPanel() {
  const [orders, setOrders] = useState<OrderView[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/orders/me', { credentials: 'include' })
      .then((r) => r.json() as Promise<{ success?: boolean; orders?: OrderView[]; error?: string }>)
      .then((data) => {
        if (!data.success) throw new Error(data.error ?? 'Failed to load orders');
        setOrders(data.orders ?? []);
      })
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-[12px] px-4 py-3 text-[14px]">
        {error}
      </div>
    );
  }

  if (!orders) {
    return (
      <div className="bg-[#f4eefa]/50 rounded-[12px] p-4 text-[14px] text-[#3f3f3f]/60">
        Loading your orders…
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[#f4eefa]/50 rounded-[12px] p-4 text-[14px] text-[#3f3f3f]/70">
        No orders yet — once you've made your first purchase, your patterns will appear here.
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-[#8b52c5] text-[18px] mb-3">Your orders</h2>
      <ul className="space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="border border-[#f4eefa] rounded-[14px] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#f4eefa]/50">
              <div>
                <p className="font-bold text-[14px]">Order #{o.id}</p>
                <p className="text-[12px] text-[#3f3f3f]/60">{o.created_at ?? ''}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[1px] ${statusTone(o.status)}`}>
                  {o.status}
                </span>
                <span className="font-bold">${Number(o.total).toFixed(2)}</span>
              </div>
            </div>
            <ul className="divide-y divide-[#f4eefa]">
              {o.items.map((it) => (
                <li key={it.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold truncate">
                      {it.product_name ?? `Product #${it.product_id}`}
                    </p>
                    {it.download && (
                      <p className="text-[11px] text-[#3f3f3f]/50 mt-0.5">
                        {it.download.downloads_used}/{it.download.max_downloads} downloads used
                      </p>
                    )}
                  </div>
                  {it.download && (o.status === 'paid' || o.status === 'completed') ? (
                    <a
                      href={it.download.url}
                      className="shrink-0 px-4 py-2 rounded-[100px] bg-[#8b52c5] text-white text-[12px] font-bold uppercase tracking-[1.5px] hover:brightness-110"
                    >
                      Download
                    </a>
                  ) : o.status === 'paid' ? (
                    <span className="shrink-0 text-[12px] text-[#3f3f3f]/50">No file yet</span>
                  ) : (
                    <span className="shrink-0 text-[12px] text-[#3f3f3f]/50">—</span>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

type TabMode = 'login' | 'register';

function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, login, register, logout, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<TabMode>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already logged in when landing here, send admins straight to the admin
  // area. Customers stay on /account to see their dashboard. Respects a ?next=
  // query param (set when auth-gated pages bounce us here).
  useEffect(() => {
    if (loading || !user) return;
    const params = new URLSearchParams(location.search);
    const next = params.get('next');
    if (next) {
      navigate(next, { replace: true });
      return;
    }
    if (isAdmin) navigate('/admin', { replace: true });
  }, [loading, user, isAdmin, navigate, location.search]);

  async function handleLogin(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    setSubmitting(true);
    try {
      const u = await login(loginEmail, loginPassword);
      setMessage(`Welcome back, ${u.name}! 🎉`);
      const params = new URLSearchParams(location.search);
      const next = params.get('next');
      navigate(next ?? (u.role === 'admin' ? '/admin' : '/account'), { replace: true });
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRegister(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    if (registerPassword !== registerConfirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }
    if (registerPassword.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }
    setSubmitting(true);
    try {
      const u = await register(registerName, registerEmail, registerPassword);
      setMessage(`Account created! Welcome, ${u.name}! 🎉`);
      navigate('/account', { replace: true });
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "border border-[#8b52c5]/30 rounded-[10px] px-4 py-3 w-full focus:outline-none focus:border-[#8b52c5] font-['Roboto:Regular',sans-serif] text-[#3f3f3f] text-[16px] transition-colors";

  if (loading) {
    return (
      <div className="bg-[#fffdf3] min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-[#8b52c5] border-t-transparent rounded-full" />
      </div>
    );
  }

  // ── Logged-in dashboard ────────────────────────────────────────────
  if (user) {
    return (
      <div className="bg-[#fffdf3] min-h-screen">
        <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-[20px] p-8 space-y-6">
            <div>
              <p className="font-['Bingo_Action_Comic:Regular',sans-serif] text-[#8b52c5] text-[clamp(28px,3vw,42px)]">
                Hi, {user.name}! 👋
              </p>
              <p className="text-[#3f3f3f]/70 text-[14px] mt-1">{user.email}</p>
              {isAdmin && (
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#f4eefa] text-[#8b52c5] text-[11px] font-bold uppercase tracking-[1px]">
                  Admin
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="bg-[#8b52c5] text-white rounded-[12px] px-4 py-3 text-center font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Admin dashboard
                </Link>
              )}
              <Link
                to="/patterns"
                className="bg-[#bbd148] text-[#3f3f3f] rounded-[12px] px-4 py-3 text-center font-bold text-[14px] tracking-[1.5px] uppercase hover:brightness-110"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Shop patterns
              </Link>
            </div>

            <OrdersPanel />

            <div className="bg-[#f4eefa]/50 rounded-[12px] p-4 text-[12px] text-[#3f3f3f]/60">
              Download links expire 30 days after purchase and each is limited to 10 downloads.
              If yours has expired, contact us for a fresh link.
            </div>

            <button
              onClick={() => { void logout().then(() => navigate('/', { replace: true })); }}
              className="text-[#8b52c5] hover:underline text-[14px] cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Logged-out: login / register forms ─────────────────────────────
  return (
    <div className="bg-[#fffdf3] min-h-screen">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] py-12 md:py-16 lg:py-20 max-w-[1400px] mx-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-[20px] p-8">
            <div className="flex mb-8 border-b border-[#8b52c5]/15">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setMessage(''); }}
                className={`flex-1 pb-3 font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[1px] uppercase transition-colors border-b-2 ${
                  activeTab === 'login'
                    ? 'text-[#8b52c5] border-[#8b52c5]'
                    : 'text-[#3f3f3f]/40 border-transparent hover:text-[#3f3f3f]/60'
                }`}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setMessage(''); }}
                className={`flex-1 pb-3 font-['Roboto:Bold',sans-serif] font-bold text-[18px] tracking-[1px] uppercase transition-colors border-b-2 ${
                  activeTab === 'register'
                    ? 'text-[#8b52c5] border-[#8b52c5]'
                    : 'text-[#3f3f3f]/40 border-transparent hover:text-[#3f3f3f]/60'
                }`}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Register
              </button>
            </div>

            {message && (
              <div className="mb-6 p-4 rounded-[10px] bg-[#f4eefa] border border-[#8b52c5]/20">
                <p className="font-['Roboto:Regular',sans-serif] text-[#8b52c5] text-[14px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {message}
                </p>
              </div>
            )}

            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="block text-[#3f3f3f] text-[14px] font-medium mb-2">Email</label>
                  <input id="login-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@example.com" required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="login-password" className="block text-[#3f3f3f] text-[14px] font-medium mb-2">Password</label>
                  <input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" required className={inputClasses} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold tracking-[2.7px] uppercase bg-[#BBD148] text-[#3F3F3F] px-[40px] py-[20px] text-[18px] hover:opacity-90 cursor-pointer disabled:opacity-50"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {submitting ? 'Signing in…' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label htmlFor="register-name" className="block text-[#3f3f3f] text-[14px] font-medium mb-2">Name</label>
                  <input id="register-name" type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder="Your full name" required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="register-email" className="block text-[#3f3f3f] text-[14px] font-medium mb-2">Email</label>
                  <input id="register-email" type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} placeholder="you@example.com" required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="register-password" className="block text-[#3f3f3f] text-[14px] font-medium mb-2">Password</label>
                  <input id="register-password" type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} placeholder="Create a password" required className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="register-confirm-password" className="block text-[#3f3f3f] text-[14px] font-medium mb-2">Confirm Password</label>
                  <input id="register-confirm-password" type="password" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} placeholder="Confirm your password" required className={inputClasses} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-[100px] font-['Roboto:Bold',sans-serif] font-bold tracking-[2.7px] uppercase bg-[#BBD148] text-[#3F3F3F] px-[40px] py-[20px] text-[18px] hover:opacity-90 cursor-pointer disabled:opacity-50"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {submitting ? 'Creating account…' : 'Create Account'}
                </button>
              </form>
            )}
          </div>

          <div className="text-center mt-8">
            <Link to="/" className="text-[#8b52c5] text-[16px] hover:underline">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AccountPage };
export default AccountPage;
