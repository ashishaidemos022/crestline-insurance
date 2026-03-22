'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, ArrowRight, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function PortalLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Step 1: find the policy by policy number
      const { data: policy, error: policyErr } = await supabase
        .from('insurance_policies')
        .select('customer_id')
        .eq('policy_number', policyNumber.trim().toUpperCase())
        .single()

      if (policyErr || !policy) {
        setError('No account found with that email and policy number. Please check your details.')
        setLoading(false)
        return
      }

      // Step 2: verify the email matches that customer
      const { data, error: custErr } = await supabase
        .from('insurance_customers')
        .select('customer_id, first_name, last_name, email')
        .eq('customer_id', policy.customer_id)
        .eq('email', email.trim().toLowerCase())
        .single()

      if (custErr || !data) {
        setError('No account found with that email and policy number. Please check your details.')
        setLoading(false)
        return
      }

      // Store customer in sessionStorage
      sessionStorage.setItem('crestline_customer', JSON.stringify({
        customer_id: data.customer_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      }))

      router.push('/portal/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0c2340 0%, #1b5e93 100%)' }}>
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10" style={{ color: '#4da6ff' }} />
          <span style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2rem', color: 'white' }}>Crestline</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '3rem', color: 'white', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Your policy,<br />always within reach.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          View your policies, file claims, make payments, and manage your coverage — all in one place.
        </p>

        {/* Demo accounts hint */}
        <div className="mt-10 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <p className="text-sm font-semibold text-white mb-2">Demo accounts:</p>
          <div className="space-y-1 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <p>ashishaidemos022@gmail.com · P-2024-003001</p>
            <p>emily.chen.design@outlook.com · P-2024-005001</p>
            <p>jess.williams.fitness@gmail.com · P-2024-002001</p>
            <p>m.rodriguez.dev@gmail.com · P-2024-004001</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <Shield className="w-6 h-6" style={{ color: 'var(--crestline-blue)' }} />
              <span style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '1.3rem', color: 'var(--crestline-navy)' }}>Crestline</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '1.75rem', color: 'var(--crestline-navy)', marginBottom: '0.5rem' }}>
              Sign in to your portal
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--crestline-muted)' }}>
              Enter your email and policy number to access your account.
            </p>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg mb-4 text-sm" style={{ background: '#fef2f2', color: '#991b1b' }}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--crestline-slate)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
                  style={{ borderColor: '#d1d5db', color: 'var(--crestline-slate)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--crestline-slate)' }}>
                  Policy Number
                </label>
                <input
                  type="text"
                  value={policyNumber}
                  onChange={e => setPolicyNumber(e.target.value)}
                  placeholder="P-2024-000000"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors font-mono"
                  style={{ borderColor: '#d1d5db', color: 'var(--crestline-slate)', fontFamily: 'monospace' }}
                />
                <p className="text-xs mt-1" style={{ color: 'var(--crestline-muted)' }}>Format: P-YYYY-NNNNNN</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-opacity"
                style={{ background: 'var(--crestline-navy)', color: 'white', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Signing in...' : (<>Sign In <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t text-center text-sm" style={{ borderColor: '#e5e7eb', color: 'var(--crestline-muted)' }}>
              Need help?{' '}
              <Link href="/contact" className="font-medium" style={{ color: 'var(--crestline-blue)' }}>
                Contact Support
              </Link>
            </div>
          </div>

          {/* Back to main site */}
          <div className="text-center mt-4">
            <Link href="/" className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              ← Back to Crestline Insurance
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
