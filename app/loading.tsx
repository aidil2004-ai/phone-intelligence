export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090d16] text-cyan-400">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500/30 border-t-cyan-400" />
        <p className="text-sm font-medium tracking-wider uppercase">
          Memuat Sistem Intelligence...
        </p>
      </div>
    </div>
  );
}
