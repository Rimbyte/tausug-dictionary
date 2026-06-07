'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Word } from '@/lib/types';

const POS_COLORS: Record<string, string> = {
  noun:        'bg-blue-50 text-blue-600',
  verb:        'bg-purple-50 text-purple-600',
  adjective:   'bg-amber-50 text-amber-600',
  greeting:    'bg-teal-50 text-teal-600',
  number:      'bg-gray-100 text-gray-600',
};

export default function WordCard({ word }: { word: Word }) {
  const [open, setOpen] = useState(false);
  const slug = word.english.replaceAll(' ', '-');

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        open ? 'border-teal-200 shadow-sm' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      {/* Card header — always visible */}
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{word.english}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${POS_COLORS[word.pos] ?? 'bg-gray-100 text-gray-600'}`}>
              {word.pos}
            </span>
          </div>
          <p className="text-teal-500 font-medium text-sm mt-0.5">{word.tausug}</p>
        </div>
        <span className={`text-gray-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Expanded body */}
      {open && (
        <div className="px-5 pb-4 border-t border-gray-100">

          {/* Definition */}
          <p className="text-gray-600 text-sm mt-3">{word.definition}</p>

          {/* Example */}
          {word.example_en && (
            <div className="mt-3 bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Example
              </p>
              <p className="text-sm text-gray-700 italic">{word.example_en}</p>
              <p className="text-sm text-teal-600 italic mt-1">{word.example_tg}</p>
            </div>
          )}

          {/* Link to full word page */}
          <div className="mt-3 flex justify-end">
            <Link
              href={`/word/${slug}`}
              className="text-xs text-teal-600 hover:underline"
            >
              Full entry →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}