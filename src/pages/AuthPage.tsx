import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Store, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, AppRole } from '@/lib/auth';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

type Mode = 'login' | 'register';
type SignupRole = Exclude<AppRole, 'admin'>;

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [role, setRole] = useState<SignupRole>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) navigate('/dashboard', { replace: true });
  }, [user, loading, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName, role },
          },
        });
        if (error) throw error;
      }
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError(null);
    try {
      const { lovable } = await import('@/integrations/lovable/index');
      const r = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin });
      if (r?.error) setError((r.error as any)?.message ?? 'Google sign-in failed');
    } catch (err: any) {
      setError(err?.message ?? 'Google sign-in unavailable');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {mode === 'login'
                  ? 'Sign in to continue shopping or managing your shop.'
                  : 'Join SokoDigital as a buyer or seller in seconds.'}
              </p>
            </div>

            {mode === 'register' && (
              <div className="mb-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition ${
                    role === 'buyer'
                      ? 'border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      : 'border-border hover:border-sky-500/50'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-semibold">Buyer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm transition ${
                    role === 'seller'
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      : 'border-border hover:border-rose-500/50'
                  }`}
                >
                  <Store className="h-5 w-5" />
                  <span className="font-semibold">Seller</span>
                </button>
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="mb-1 block text-sm font-medium">Full name</label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Jane Doe"
                  />
                </div>
              )}
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-rose-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              onClick={google}
              type="button"
              className="w-full rounded-lg border border-border bg-background py-2.5 font-medium transition hover:bg-muted"
            >
              Continue with Google
            </button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === 'login' ? (
                <>
                  New to SokoDigital?{' '}
                  <button className="font-semibold text-sky-500 hover:underline" onClick={() => setMode('register')}>
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button className="font-semibold text-sky-500 hover:underline" onClick={() => setMode('login')}>
                    Sign in
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:underline">Back to home</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
