import Link from 'next/link'
import { DrupalEvent } from '@/lib/types'
import ResponsiveImage from './ResponsiveImage'
import { ArrowRight } from 'lucide-react'

interface EventCardProps {
  item: DrupalEvent
}

export default function EventCard({ item }: EventCardProps) {
  return (
    <Link
      href={item.path || '#'}
      className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:bg-slate-900"
    >
      <div className="relative h-56 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        {(item as any).image?.url ? (
          <ResponsiveImage
            src={(item as any).image.url}
            alt={(item as any).image.alt || item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            variations={(item as any).image.variations}
            targetWidth={400}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl font-light text-accent-400/45">{item.title?.charAt(0)}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      </div>

      <div className="p-6">
        {(item as any).locationName && (
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.24em] text-accent-300">
            {(item as any).locationName}
          </p>
        )}
        <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-accent-300">
          {item.title}
        </h3>

        {(item as any).body?.processed && (
          <p className="mb-5 text-sm leading-6 text-slate-300 line-clamp-2">
            {(item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 150)}
          </p>
        )}

        <div className="flex items-center text-sm font-semibold uppercase tracking-[0.2em] text-accent-400 transition-all group-hover:gap-2">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
