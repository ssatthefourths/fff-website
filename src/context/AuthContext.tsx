import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  /** Fetches /api/auth/me and refreshes local state. Call after login/register. */
  refresh: () => Promise<SessionUser | null>;
  /** POSTs credentials. Resolves with the user on success, throws on failure. */
  login: (email: string, password: string) => Promise<SessionUser>;
  /** Creates an account and logs in. */
  register: (name: string, email: string, password: string) => Promise<SessionUser>;
  /** Clears the server session + local state. */
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function parseJson(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (): Promise<SessionUser | null> => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await parseJson(res);
      const u = (data.user as SessionUser | null | undefined) ?? null;
      setUser(u);
      return u;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string): Promise<SessionUser> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await parseJson(res);
    if (!res.ok || !data.success) {
      throw new Error((data.error as string | undefined) ?? 'Login failed');
    }
    const u = data.user as SessionUser;
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<SessionUser> => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });
    const data = await parseJson(res);
    if (!res.ok || !data.success) {
      throw new Error((data.error as string | undefined) ?? 'Registration failed');
    }
    const u = data.user as SessionUser;
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      /* swallow — we clear local state either way */
    }
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    refresh,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
