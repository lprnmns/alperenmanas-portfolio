'use client';

import type { SupabaseClient, User } from '@supabase/supabase-js';
import { LogOut, ShieldAlert } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { getOwnerUid, getSupabaseBrowserClient } from '@/lib/supabase/client';

type AdminAuthGateProps = {
  children: (args: { user: User; supabase: SupabaseClient; signOut: () => Promise<void> }) => ReactNode;
};

type AuthState = 'loading' | 'signed_out' | 'forbidden' | 'ready';

export default function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ownerUid = useMemo(() => getOwnerUid(), []);

  useEffect(() => {
    let mounted = true;

    try {
      const client = getSupabaseBrowserClient();
      setSupabase(client);

      void client.auth.getSession().then(({ data, error: sessionError }) => {
        if (!mounted) {
          return;
        }
        if (sessionError) {
          setError(sessionError.message);
          setAuthState('signed_out');
          return;
        }

        const currentUser = data.session?.user ?? null;
        setUser(currentUser);
        if (!currentUser) {
          setAuthState('signed_out');
          return;
        }

        if (!ownerUid || currentUser.id !== ownerUid) {
          setAuthState('forbidden');
          return;
        }

        setAuthState('ready');
      });

      const { data: subscription } = client.auth.onAuthStateChange((_event, session) => {
        if (!mounted) {
          return;
        }

        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (!sessionUser) {
          setAuthState('signed_out');
          return;
        }

        if (!ownerUid || sessionUser.id !== ownerUid) {
          setAuthState('forbidden');
          return;
        }

        setAuthState('ready');
      });

      return () => {
        mounted = false;
        subscription.subscription.unsubscribe();
      };
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Failed to initialize auth.';
      setError(message);
      setAuthState('signed_out');
      return () => {
        mounted = false;
      };
    }
  }, [ownerUid]);

  const signOut = async () => {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
    setAuthState('signed_out');
    setUser(null);
  };

  const signInWithPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      return;
    }
    setError(null);
    setSigningIn(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: username.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message);
      }
    } finally {
      setSigningIn(false);
    }
  };

  if (authState === 'loading') {
    return (
      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-500 border-t-cyan-300" />
      </div>
    );
  }

  if (authState === 'signed_out' || !user || !supabase) {
    return (
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6">
        <h2 className="text-xl font-semibold text-white">Admin Login</h2>
        <p className="mt-2 text-sm text-slate-300">Enter username and password to manage roadmap updates.</p>
        <form onSubmit={signInWithPassword} className="mt-4 space-y-3">
          <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username (owner email)"
            className="h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
            className="h-10 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={signingIn}
            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {signingIn ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <p className="text-sm text-rose-300">{error}</p>}
          {!ownerUid && (
            <p className="text-xs text-amber-300">
              `NEXT_PUBLIC_OWNER_UID` is missing. Set it to the owner auth user id.
            </p>
          )}
        </form>
      </div>
    );
  }

  if (authState === 'forbidden') {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-rose-500/40 bg-rose-900/20 p-6">
        <div className="flex items-center gap-3 text-rose-100">
          <ShieldAlert size={20} />
          <p className="font-semibold">This account is not allowed to access admin tools.</p>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rose-300/40 px-3 py-2 text-sm text-rose-100 transition hover:bg-rose-900/40"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    );
  }

  return <>{children({ user, supabase, signOut })}</>;
}
