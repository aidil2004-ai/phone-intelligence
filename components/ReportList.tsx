"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, push, onValue, serverTimestamp } from "firebase/database";
import { ShieldAlert, Send, UserCheck } from "lucide-react";

interface ReportItem {
  id: string;
  tag: string;
  category: string;
  timestamp: number;
}

export default function ReportList({ e164 }: { e164: string }) {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("Penipuan / Scam");
  const [submitting, setSubmitting] = useState(false);

  const cleanKey = e164.replace(/[^0-9]/g, "");

  useEffect(() => {
    if (!cleanKey) return;
    const reportsRef = ref(db, `phone_reports/${cleanKey}`);
    const unsubscribe = onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setReports([]);
        return;
      }
      const list: ReportItem[] = Object.entries(data).map(
        ([id, val]: [string, any]) => ({
          id,
          tag: val.tag,
          category: val.category,
          timestamp: val.timestamp || Date.now(),
        }),
      );
      setReports(list.sort((a, b) => b.timestamp - a.timestamp));
    });
    return () => unsubscribe();
  }, [cleanKey]);

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tag.trim() || !cleanKey) return;
    setSubmitting(true);
    try {
      const reportsRef = ref(db, `phone_reports/${cleanKey}`);
      await push(reportsRef, {
        tag: tag.trim(),
        category,
        timestamp: serverTimestamp(),
      });
      setTag("");
    } catch (err) {
      console.error("Gagal menyimpan laporan:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-semibold text-white">
            Tag & Laporan Komunitas Real-Time
          </h3>
        </div>
        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300">
          {reports.length} Laporan
        </span>
      </div>

      <form
        onSubmit={handleReport}
        className="mt-4 flex flex-col gap-2.5 sm:flex-row"
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
        >
          <option value="Penipuan / Scam">Penipuan / Scam</option>
          <option value="Spam / Telemarketing">Spam / Telemarketing</option>
          <option value="Debt Collector">Debt Collector</option>
          <option value="Kurir / Bisnis Terverifikasi">
            Kurir / Bisnis Terverifikasi
          </option>
        </select>
        <input
          type="text"
          maxLength={60}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tulis nama/identitas penelpon (maks 60 karakter)..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />{" "}
          {submitting ? "Menyimpan..." : "Kirim Tag"}
        </button>
      </form>

      <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-1">
        {reports.length === 0 ? (
          <p className="py-6 text-center text-xs text-slate-500">
            Belum ada tag komunitas untuk nomor ini. Jadilah yang pertama
            menambahkan identitas nomor.
          </p>
        ) : (
          reports.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/70 px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="h-4 w-4 text-cyan-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    {item.tag}
                  </p>
                  <span className="text-[11px] text-amber-400">
                    {item.category}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-slate-500">
                {new Date(item.timestamp).toLocaleDateString("id-ID")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
