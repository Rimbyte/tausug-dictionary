import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Word } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const POS_COLORS: Record<string, string> = {
  noun:        'bg-blue-50 text-blue-600',
  verb:        'bg-purple-50 text-purple-600',
  adjective:   'bg-amber-50 text-amber-600',
  greeting:    'bg-teal-50 text-teal-600',
  number:      'bg-gray-100 text-gray-600',
};

type Props = { params: Promise<{ slug: string }> };

export default async function WordPage({ params }: Props) {
  // Fetch word by english name from the URL slug
  const { slug } = await params;
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .eq('english', slug.replaceAll('-', ' '))
    .single();

  if (error || !data) notFound();

  const word = data as Word;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
        >
          ← Back to search
        </Link>

        {/* Word card */}
        <div className="border border-gray-100 rounded-2xl p-6">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">{word.english}</h1>
              <p className="text-teal-500 text-xl font-medium mt-1">{word.tausug}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${POS_COLORS[word.pos] ?? 'bg-gray-100 text-gray-600'}`}>
              {word.pos}
            </span>
          </div>

          <div className="border-t border-gray-100 mt-5 pt-5 space-y-5">

            {/* Definition */}
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Definition
              </p>
              <p className="text-gray-700">{word.definition}</p>
            </div>

            {/* Example */}
            {word.example_en && (
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                  Example sentence
                </p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-1">
                  <p className="text-gray-700 italic text-sm">{word.example_en}</p>
                  <p className="text-teal-600 italic text-sm">{word.example_tg}</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Back to search */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-teal-600 hover:underline"
          >
            Search more words →
          </Link>
        </div>

      </main>
    </div>
  );
}