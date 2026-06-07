'use client';

import { useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setLoading(true);
    setError('');

    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
  
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <span className="font-semibold text-gray-900">
            Tausug <span className="text-teal-500">Diksyunaryo</span>
          </span>
        </div>

        {sent ? (
          /* Success state */
          <div className="text-center border border-gray-100 rounded-2xl p-8">
            <div className="text-3xl mb-3">📬</div>
            <p className="font-medium text-gray-900 mb-1">Check your email</p>
            <p className="text-sm text-gray-400">
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(''); }}
              className="mt-4 text-xs text-teal-600 hover:underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          /* Login form */
          <div className="border border-gray-100 rounded-2xl p-6">
            <h1 className="font-semibold text-gray-900 text-lg mb-1">Sign in</h1>
            <p className="text-sm text-gray-400 mb-5">
              Enter your email and we'll send you a magic link.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 mb-3"
            />

            {error && (
              <p className="text-xs text-red-500 mb-3">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !email}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
            >
              {loading ? 'Sending...' : 'Send magic link'}
            </button>
          </div>
        )}

                {/* Back link */}
                <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Back to dictionary
          </Link>
        </div>

      </div>
    </div>
  );
}