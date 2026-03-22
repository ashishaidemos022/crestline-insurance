'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Shield } from 'lucide-react'

const navLinks = [
  { href: '/auto', label: 'Auto' },
  { href: '/homeowners', label: 'Homeowners' },
  { href: '/renters', label: 'Renters' },
  { href: '/life', label: 'Life' },
  { href: '/commercial', label: 'Commercial' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav style={{ background: 'var(--crestline-navy)' }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-7 h-7" style={{ color: '#4da6ff' }} />
            <span
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: '1.4rem',
                color: 'white',
                letterSpacing: '-0.01em',
              }}
            >
              Crestline
            </span>
            <span style={{ color: '#4da6ff', fontWeight: 500, fontSize: '0.85rem', marginTop: '2px' }}>
              Insurance
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={{
                  color: pathname === link.href ? '#4da6ff' : '#cbd5e1',
                  background: pathname === link.href ? 'rgba(77,166,255,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/portal"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ color: '#cbd5e1', border: '1px solid rgba(203,213,225,0.3)' }}
            >
              My Policy
            </Link>
            <Link
              href="/portal"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ background: 'var(--crestline-blue)', color: 'white' }}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: 'var(--crestline-navy)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
          className="md:hidden px-4 py-3 space-y-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-sm font-medium"
              style={{ color: '#cbd5e1' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/portal"
              className="block text-center px-4 py-2 rounded-lg text-sm font-medium"
              style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              My Policy
            </Link>
            <Link
              href="/portal"
              className="block text-center px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ background: 'var(--crestline-blue)', color: 'white' }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
