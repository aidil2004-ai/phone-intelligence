"use client";

import React, { useState } from "react";
import { Search, History, Trash2 } from "lucide-react";

interface SearchFormProps {
  onSearch: (phone: string) => void;
  history: string[];
  onClearHistory: () => void;
}

export default function SearchForm({
  onSearch,
  history,
  onClearHistory,
}: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masukkan nomor (contoh: 08123456789 atau +14155552671)"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.99]"
        >
          Analisis Nomor
        </button>
      </form>

      {history.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-3">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <History className="h-3.5 w-3.5" /> Riwayat:
          </span>
          {history.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(item);
                onSearch(item);
              }}
              className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-300"
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={onClearHistory}
            className="ml-auto flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300"
          >
            <Trash2 className="h-3 w-3" /> Hapus
          </button>
        </div>
      )}
    </div>
  );
}
