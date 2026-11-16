"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SearchForm from "@/components/SearchForm";
import NumberResult from "@/components/NumberResult";
import ReportList from "@/components/ReportList";
import { analyzePhoneNumber, PhoneAnalysis } from "@/lib/phone";
import { Shield } from "lucide-react";

const WorldMap = dynamic(() => import("@/components/WorldMap"), { ssr: false });

export default function HomePage() {
  const [result, setResult] = useState<PhoneAnalysis | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("pi_search_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleSearch = (phone: string) => {
    setError("");
    const analyzed = analyzePhoneNumber(phone, "ID");
    if (!analyzed) {
      setResult(null);
      setError(
        "Nomor tidak dapat dikenali. Pastikan menyertakan kode negara (misal +62 atau 08...).",
      );
      return;
    }
    setResult(analyzed);

    const updated = [
      analyzed.international,
      ...history.filter((h) => h !== analyzed.international),
    ].slice(0, 6);
    setHistory(updated);
    localStorage.setItem("pi_search_history", JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("pi_search_history");
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300">
          <Shield className="h-3.5 w-3.5" /> GLOBAL PHONE NUMBER INFORMATION
          SYSTEM
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          PHONE INTELLIGENCE
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Identifikasi kode negara, operator seluler, area penomoran, serta
          database tag penipuan berbasis komunitas.
        </p>
      </header>

      <SearchForm
        onSearch={handleSearch}
        history={history}
        onClearHistory={handleClearHistory}
      />

      {error && (
        <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-center text-sm text-rose-300">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-6">
          <NumberResult data={result} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WorldMap
              lat={result.countryMeta.lat}
              lng={result.countryMeta.lng}
              label={`${result.countryMeta.name} — ${result.areaInfo}`}
            />
            <ReportList e164={result.e164} />
          </div>
        </div>
      )}
    </main>
  );
}
