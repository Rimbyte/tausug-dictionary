'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    // Get current session
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <span className="font-semibold text-gray-900 text-sm">
            Tausug <span className="text-teal-500">Dictionary</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Pricing
          </Link>

          {user ? (
            /* Signed in state */
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden sm:block truncate max-w-32">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            /* Signed out state */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/pricing"
                className="text-sm bg-teal-500 text-white px-3 py-1.5 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Get Premium
              </Link>
            </div>
          )}
        </nav>

      </div>
    </header>
  );
}