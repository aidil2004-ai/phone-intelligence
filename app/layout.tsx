import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phone Intelligence — Global Number Lookup & Fraud DB",
  description:
    "Sistem identifikasi prefix nomor telepon global, operator, wilayah penomoran, dan laporan komunitas real-time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
