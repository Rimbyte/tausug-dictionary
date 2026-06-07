'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Word, SearchDirection } from '@/lib/types';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import WordCard from '@/components/WordCard';

const CATEGORIES = ['all', 'noun', 'verb', 'adjective', 'greeting', 'number'];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [direction, setDirection] = useState<SearchDirection>('en-tg');
  const [category, setCategory] = useState('all');
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true); 

    // Filter words based on search query and direction
  useEffect(() => {
    async function fetchWords() {
      setLoading(true);

      const searchCol = direction === 'en-tg' ? 'english' : 'tausug';

      let q = supabase
        .from('words')
        .select('*')
        .ilike(searchCol, `%${query}%`)
        .order('english', { ascending: true })
        .limit(30);

        if (category !== 'all') {
          q = q.eq('pos', category);
        }

        const { data, error } = await q;
        if (!error && data) setWords(data);
        setLoading(false);
    }

    fetchWords();
  }, [query, direction, category]);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">

        {/* Hero text */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            English–Tausug Dictionary
          </h1>
          <p className="text-sm text-gray-400">
            Preserving the language of the Sulu Archipelago
          </p>
        </div>

        {/* Search */}
        <SearchBar
          query={query}
          direction={direction}
          onQueryChange={setQuery}
          onDirectionChange={setDirection}
        />

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors capitalize ${
                category === cat
                  ? 'bg-teal-500 text-white border-teal-500'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="mt-6">
          {loading ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              Loading...
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-3">
                {words.length} {words.length === 1 ? 'word' : 'words'} found
              </p>
              <div className="flex flex-col gap-2">
                {words.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 text-sm">
                    No words found. Try a different search.
                  </div>
                ) : (
                  words.map((word) => (
                    <WordCard key={word.id} word={word} />
                  ))
                )}
              </div>
            </>
          )}
        </div>

      </main>
    </div>
  );
}