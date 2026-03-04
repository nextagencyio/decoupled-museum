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
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-purple-600 to-purple-800">
        {(item as any).image?.url ? (
          <ResponsiveImage
            src={(item as any).image.url}
            alt={(item as any).image.alt || item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            variations={(item as any).image.variations}
            targetWidth={400}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 text-white/30 text-4xl font-bold">{item.title?.charAt(0)}</div>
          </div>
        )}
      </div>

      <div className="p-6">
          {(item as any).locationName && (
            <p className="text-sm text-purple-700 font-medium mb-2">{(item as any).locationName}</p>
          )}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
          {item.title}
        </h3>

        {(item as any).body?.processed && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {(item as any).body.processed.replace(/<[^>]*>/g, '').substring(0, 150)}
          </p>
        )}

        <div className="flex items-center text-purple-700 font-medium group-hover:gap-2 transition-all">
          Learn more
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
