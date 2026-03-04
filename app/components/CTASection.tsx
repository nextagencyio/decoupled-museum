'use client'

import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Get in Touch'
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Contact Us'
  const secondaryLabel = (homepageContent as any)?.ctaSecondary || 'Learn More'

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-8 tracking-wide">{title}</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-accent-500 text-slate-950 font-semibold tracking-wide hover:bg-accent-400 transition-colors">{primaryLabel}</Link>
          <Link href="/about" className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors tracking-wide">{secondaryLabel}</Link>
        </div>
      </div>
    </section>
  )
}
