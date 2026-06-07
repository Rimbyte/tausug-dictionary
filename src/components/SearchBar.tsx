'use client';

type Props = {
  query: string;
  direction: 'en-tg' | 'tg-en';
  onQueryChange: (q: string) => void;
  onDirectionChange: (d: 'en-tg' | 'tg-en') => void;
};

export default function SearchBar({ query, direction, onQueryChange, onDirectionChange }: Props) {

  function toggleDirection() {
    onDirectionChange(direction === 'en-tg' ? 'tg-en' : 'en-tg');
    onQueryChange('');
  }

  return (
    <div className="flex gap-2 w-full">

      {/* Search input */}
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={direction === 'en-tg' ? 'Search English word...' : 'Search Tausug word...'}
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
        />
      </div>

      {/* Direction toggle */}
      <button
        onClick={toggleDirection}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600 whitespace-nowrap"
      >
        {direction === 'en-tg' ? 'EN → TG' : 'TG → EN'}
      </button>

    </div>
  );
}