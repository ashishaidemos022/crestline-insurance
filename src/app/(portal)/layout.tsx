'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Shield, LayoutDashboard, FileText, CreditCard, Users, LogOut, Home } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '/portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/portal/policies', icon: FileText, label: 'My Policies' },
  { href: '/portal/claims', icon: Home, label: 'My Claims' },
  { href: '/portal/billing', icon: CreditCard, label: 'Billing' },
  { href: '/portal/dependents', icon: Users, label: 'Dependents' },
]

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [customerName, setCustomerName] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in (skip for the login page itself)
    if (pathname === '/portal' || pathname === '/portal/') return

    const stored = sessionStorage.getItem('crestline_customer')
    if (!stored) {
      router.push('/portal')
      return
    }
    const customer = JSON.parse(stored)
    setCustomerName(`${customer.first_name} ${customer.last_name}`)
  }, [pathname, router])

  const handleLogout = () => {
    sessionStorage.removeItem('crestline_customer')
    router.push('/portal')
  }

  // If on login page, render without sidebar
  if (pathname === '/portal' || pathname === '/portal/') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ background: 'var(--crestline-navy)', minHeight: '100vh' }}>
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6" style={{ color: '#4da6ff' }} />
            <span style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '1.2rem', color: 'white' }}>Crestline</span>
          </Link>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Customer Portal</div>
        </div>

        {/* Customer info */}
        {customerName && (
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--crestline-blue)', color: 'white' }}>
                {customerName.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{customerName}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Policyholder</div>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? 'rgba(77,166,255,0.15)' : 'transparent',
                  color: active ? '#4da6ff' : 'rgba(255,255,255,0.7)',
                  borderLeft: active ? '3px solid #4da6ff' : '3px solid transparent',
                }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <Link href="/claims/new" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors" style={{ background: 'var(--crestline-blue)', color: 'white' }}>
            <FileText className="w-4 h-4" />
            File a Claim
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
