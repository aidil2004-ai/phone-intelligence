"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";

interface WorldMapProps {
  lat: number;
  lng: number;
  label: string;
}

export default function WorldMap({ lat, lng, label }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!instanceRef.current) {
      const map = L.map(mapRef.current).setView([lat, lng], 4);
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap &copy; CARTO",
        },
      ).addTo(map);
      instanceRef.current = map;
    } else {
      instanceRef.current.setView([lat, lng], 4);
    }

    const map = instanceRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    L.circleMarker([lat, lng], {
      radius: 10,
      color: "#22d3ee",
      fillColor: "#06b6d4",
      fillOpacity: 0.6,
    })
      .addTo(map)
      .bindPopup(`<b>Wilayah Penomoran:</b><br/>${label}`)
      .openPopup();
  }, [lat, lng, label]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
      <div className="border-b border-slate-800 px-5 py-3">
        <h3 className="text-sm font-semibold text-white">
          Peta Referensi Geografis Penomoran
        </h3>
        <p className="text-xs text-slate-400">
          Menampilkan negara/wilayah registrasi prefix nomor (bukan pelacakan
          GPS real-time).
        </p>
      </div>
      <div ref={mapRef} className="h-[280px] w-full z-0" />
    </div>
  );
}
