'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const FREE_FEATURES = [
  '12 free words (growing)',
  'English ↔ Tausug search',
  'Category filters',
  'Example sentences',
  'Individual word pages',
];

const PREMIUM_FEATURES = [
  'Everything in Free',
  '5,000+ words',
  'Audio pronunciation',
  'Offline access',
  'No ads',
  'Priority word requests',
];

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Simple pricing
          </h1>
          <p className="text-sm text-gray-400">
            Support the preservation of the Tausug language.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex border border-gray-200 rounded-xl p-1">
            {(['monthly', 'yearly'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-5 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  billing === b
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {b === 'yearly' ? (
                  <span>Yearly <span className="text-xs opacity-80">−20%</span></span>
                ) : 'Monthly'}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Free plan */}
          <div className="border border-gray-100 rounded-2xl p-6">
            <p className="font-medium text-gray-900 mb-1">Free</p>
            <div className="flex items-end gap-1 mb-5">
              <span className="text-3xl font-semibold text-gray-900">₱0</span>
              <span className="text-sm text-gray-400 mb-0.5">forever</span>
            </div>

            <ul className="space-y-2.5 mb-6">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-teal-500 font-bold text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/"
              className="block text-center text-sm border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Get started free
            </Link>
          </div>

          {/* Premium plan */}
          <div className="border-2 border-teal-400 rounded-2xl p-6 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs px-3 py-0.5 rounded-full font-medium">
              Most popular
            </span>

            <p className="font-medium text-gray-900 mb-1">Premium</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-semibold text-gray-900">
                {billing === 'monthly' ? '₱99' : '₱949'}
              </span>
              <span className="text-sm text-gray-400 mb-0.5">/month</span>
            </div>
            {billing === 'yearly' && (
              <p className="text-xs text-teal-600 mb-4">Billed ₱949/year — save ₱239</p>
            )}
            {billing === 'monthly' && <div className="mb-4" />}

            <ul className="space-y-2.5 mb-6">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-teal-500 font-bold text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => alert('Stripe coming soon! 🚀')}
              className="w-full text-center text-sm bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-xl transition-colors font-medium"
            >
              Get Premium
            </button>
          </div>

        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-base font-semibold text-gray-900 mb-4 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription anytime. You will keep access until the end of your billing period.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit and debit cards via Stripe. GCash and Maya support coming soon.',
              },
              {
                q: 'How many words are in the full dictionary?',
                a: 'We are actively growing the dictionary. Premium members get access to all words as we add them, starting at 5,000+.',
              },
              {
                q: 'Is there a student discount?',
                a: 'Yes! Students and teachers get 50% off. Email us with your school ID to claim it.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border border-gray-100 rounded-xl p-4">
                <p className="font-medium text-gray-900 text-sm mb-1">{q}</p>
                <p className="text-gray-500 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}