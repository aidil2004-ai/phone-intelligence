"use client";

import React from "react";
import { PhoneAnalysis } from "@/lib/phone";
import {
  CheckCircle2,
  XCircle,
  Globe,
  Radio,
  MapPin,
  Hash,
} from "lucide-react";

export default function NumberResult({ data }: { data: PhoneAnalysis }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
            Format Internasional
          </p>
          <h2 className="text-2xl font-bold text-white">
            {data.international}
          </h2>
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            data.isValid
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border border-rose-500/30 bg-rose-500/10 text-rose-400"
          }`}
        >
          {data.isValid ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          {data.isValid ? "Format Valid" : "Format Tidak Standar"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Globe className="h-4 w-4 text-cyan-400" /> Negara & Kode Panggil
          </div>
          <p className="mt-1 font-semibold text-slate-100">
            {data.countryMeta.name} ({data.callingCode})
          </p>
          <p className="text-xs text-slate-400">{data.countryMeta.region}</p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Radio className="h-4 w-4 text-cyan-400" /> Identifikasi Operator
          </div>
          <p className="mt-1 font-semibold text-slate-100">{data.carrier}</p>
          <p className="text-xs text-slate-400">{data.lineType}</p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="h-4 w-4 text-cyan-400" /> Wilayah Penomoran
          </div>
          <p className="mt-1 font-semibold text-slate-100">{data.areaInfo}</p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Hash className="h-4 w-4 text-cyan-400" /> Format E.164 & Nasional
          </div>
          <p className="mt-1 font-mono text-sm text-slate-100">{data.e164}</p>
          <p className="text-xs text-slate-400">Lokal: {data.national}</p>
        </div>
      </div>
    </div>
  );
}
