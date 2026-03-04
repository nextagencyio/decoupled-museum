'use client'

import Link from 'next/link'
import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <ErrorBoundary><HeroSection homepageContent={homepageContent} /></ErrorBoundary>
      <ErrorBoundary><StatsSection homepageContent={homepageContent} /></ErrorBoundary>
      <ErrorBoundary><CTASection homepageContent={homepageContent} /></ErrorBoundary>

      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-display font-semibold text-accent-400 mb-4">Nocturne Gallery</h3>
              <p className="text-slate-400">Curated exhibitions and timeless collections in an immersive setting.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/collections" className="hover:text-accent-400 transition-colors">Collections</Link></li>
                <li><Link href="/events" className="hover:text-accent-400 transition-colors">Events</Link></li>
                <li><Link href="/about" className="hover:text-accent-400 transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li>123 Main Street</li>
                <li>Anytown, USA 12345</li>
                <li>info@example.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Nocturne Gallery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
