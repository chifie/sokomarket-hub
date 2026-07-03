import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Store, ShoppingBag, LogOut, Package, BarChart3, Users, Plus, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';

export default function DashboardPage() {
  const { user, roles, loading, signOut, refreshRoles } = useAuth();
  const navigate = useNavigate();
  const [becomingSeller, setBecomingSeller] = useState(false);
  const [sellerError, setSellerError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate('/auth', { replace: true });
  }, [user, loading, navigate]);

  const becomeSeller = async () => {
    if (!user) return;
    setBecomingSeller(true);
    setSellerError(null);
    const { error } = await supabase.from('user_roles').insert({ user_id: user.id, role: 'seller' });
    if (error) {
      setSellerError(error.message);
    } else {
      await refreshRoles();
    }
    setBecomingSeller(false);
  };

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  const isAdmin = roles.includes('admin');
  const isSeller = roles.includes('seller');
  const label = isAdmin ? 'Admin' : isSeller ? 'Seller' : 'Buyer';
  const Icon = isAdmin ? Shield : isSeller ? Store : ShoppingBag;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-rose-500 text-white">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{user.email}</span> ·{' '}
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {label}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut().then(() => navigate('/'))}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isAdmin && (
            <>
              <DashCard icon={<Users className="h-5 w-5" />} title="Manage users" desc="Review accounts and assign roles." />
              <DashCard icon={<BarChart3 className="h-5 w-5" />} title="Platform analytics" desc="Track sales, growth and engagement." />
              <DashCard icon={<Package className="h-5 w-5" />} title="Moderate listings" desc="Approve or remove marketplace listings." />
            </>
          )}
          {isSeller && (
            <>
              <DashCard
                to="/dashboard/listings"
                icon={<Package className="h-5 w-5" />}
                title="Your listings"
                desc="Create and manage the products you sell."
              />
              <DashCard
                to="/dashboard/listings/new"
                icon={<Plus className="h-5 w-5" />}
                title="Add a product"
                desc="Upload photos, set a price, and list something new."
              />
              <DashCard icon={<BarChart3 className="h-5 w-5" />} title="Sales insights" desc="Track orders, revenue, and customers." />
              <DashCard icon={<Store className="h-5 w-5" />} title="Shop profile" desc="Customize your storefront and branding." />
            </>
          )}
          {!isAdmin && !isSeller && (
            <>
              <DashCard icon={<ShoppingBag className="h-5 w-5" />} title="Your orders" desc="Track shipments and past purchases." />
              <DashCard icon={<Package className="h-5 w-5" />} title="Wishlist" desc="Save products for later." />
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Store className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Become a seller</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open a shop and start listing products to buyers on SokoDigital.
                </p>
                {sellerError && <p className="mt-2 text-xs text-destructive">{sellerError}</p>}
                <button
                  onClick={becomeSeller}
                  disabled={becomingSeller}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
                >
                  {becomingSeller && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Start selling
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DashCard({
  icon,
  title,
  desc,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  to?: string;
}) {
  const content = (
    <>
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="block rounded-2xl border border-border bg-card p-6 transition hover:shadow-elegant hover:border-blue-500/40">
        {content}
      </Link>
    );
  }

  return <div className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-elegant">{content}</div>;
}
