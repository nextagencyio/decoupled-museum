'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, Sparkles } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Events', href: '/events' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    for (const item of navigationItems) {
      if (item.href !== '/' && pathname.startsWith(item.href)) return item.name
    }
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header className={clsx('fixed left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-slate-950/90 backdrop-blur-md' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="flex-shrink-0 w-10 h-10 bg-accent-500/20 border border-accent-500/30 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent-400" />
            </div>
            <span className="text-lg font-display font-semibold text-white tracking-wide hidden sm:block">Nocturne Gallery</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link key={item.name} href={item.href} className={clsx('px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200', activeTab === item.name ? 'text-accent-400' : 'text-gray-300 hover:text-white')}>
                {item.name}
              </Link>
            ))}
          </nav>

          <button type="button" className="lg:hidden inline-flex items-center justify-center p-2 rounded text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 py-4 bg-slate-950/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className={clsx('px-4 py-3 text-sm font-medium transition-colors', activeTab === item.name ? 'text-accent-400' : 'text-gray-300 hover:text-white')}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
