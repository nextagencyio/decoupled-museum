export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-slate-950">
      <div className="h-20 border-b border-slate-800 bg-slate-950/90" />
      <div className="border-b border-slate-800 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.3),rgba(2,6,23,0.95))]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto h-px w-20 bg-slate-700" />
          <div className="mx-auto mt-8 h-12 w-72 rounded-full bg-slate-800" />
          <div className="mx-auto mt-6 h-5 w-full max-w-2xl rounded-full bg-slate-800" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
              <div className="h-56 bg-slate-800" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-1/3 rounded-full bg-slate-700" />
                <div className="h-6 w-3/4 rounded-full bg-slate-700" />
                <div className="h-4 w-full rounded-full bg-slate-800" />
                <div className="h-4 w-2/3 rounded-full bg-slate-800" />
                <div className="pt-2">
                  <div className="h-4 w-28 rounded-full bg-slate-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
