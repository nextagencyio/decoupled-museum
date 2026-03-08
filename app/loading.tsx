export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-accent-400 to-transparent" />
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-slate-700 border-t-accent-400" />
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">Loading gallery</p>
      </div>
    </div>
  )
}
