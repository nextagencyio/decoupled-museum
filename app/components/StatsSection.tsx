'use client'

import { DrupalHomepage } from '@/lib/types'

interface StatsSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const stats = (homepageContent as any)?.stats || (homepageContent as any)?.statsItems || []
  if (!stats || stats.length === 0) return null

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:divide-x md:divide-slate-700">
          {stats.map((stat: any, i: number) => (
            <div key={stat.id || i} className="text-center px-8 md:px-12 py-6 md:py-0">
              <div className="font-display text-4xl md:text-5xl font-light text-accent-400 mb-2">{stat.value || stat.statValue}</div>
              <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">{stat.label || stat.statLabel || stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
