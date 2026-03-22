'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, CreditCard, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StatusBadge from '@/components/shared/StatusBadge'

type Customer = { customer_id: string; first_name: string; last_name: string; email: string }
type Policy = { policy_number: string; type: string; status: string; effective_date: string; expiration_date: string; premium: number; product: string }
type Claim = { claim_number: string; type: string; status: string; priority: string; incident_date: string; claim_amount: number }
type Invoice = { invoice_number: string; amount: number; status: string; due_date: string }

export default function DashboardPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [policies, setPolicies] = useState<Policy[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('crestline_customer')
    if (!stored) { router.push('/portal'); return }
    const cust = JSON.parse(stored) as Customer
    setCustomer(cust)

    const fetchData = async () => {
      const [{ data: policiesData }, { data: claimsData }, { data: invoicesData }] = await Promise.all([
        supabase.from('insurance_policies').select('policy_number, type, status, effective_date, expiration_date, premium, product').eq('customer_id', cust.customer_id).order('status'),
        supabase.from('insurance_claims').select('claim_number, type, status, priority, incident_date, claim_amount').eq('customer_id', cust.customer_id).order('incident_date', { ascending: false }).limit(5),
        supabase.from('insurance_invoices').select('invoice_number, amount, status, due_date').eq('customer_id', cust.customer_id).neq('status', 'Paid').order('due_date'),
      ])
      setPolicies(policiesData ?? [])
      setClaims(claimsData ?? [])
      setInvoices(invoicesData ?? [])
      setLoading(false)
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3" style={{ borderColor: 'var(--crestline-blue)', borderTopColor: 'transparent' }} />
          <p style={{ color: 'var(--crestline-muted)' }}>Loading your account...</p>
        </div>
      </div>
    )
  }

  const activePolicies = policies.filter(p => p.status === 'Active')
  const overdueInvoices = invoices.filter(i => i.status === 'Overdue')
  const pendingClaims = claims.filter(c => !['Closed - Paid', 'Closed - Denied'].includes(c.status))

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2rem', color: 'var(--crestline-navy)' }}>
          Welcome back, {customer?.first_name}.
        </h1>
        <p style={{ color: 'var(--crestline-muted)' }}>Here&apos;s an overview of your Crestline coverage.</p>
      </div>

      {/* Alert banners */}
      {overdueInvoices.length > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-4 text-sm font-medium" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          You have {overdueInvoices.length} overdue invoice{overdueInvoices.length > 1 ? 's' : ''}.{' '}
          <Link href="/portal/billing" style={{ textDecoration: 'underline' }}>Pay now</Link>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Policies', value: activePolicies.length, icon: CheckCircle, color: 'var(--crestline-teal)', href: '/portal/policies' },
          { label: 'Open Claims', value: pendingClaims.length, icon: FileText, color: 'var(--crestline-blue)', href: '/portal/claims' },
          { label: 'Outstanding Bills', value: invoices.length, icon: CreditCard, color: overdueInvoices.length > 0 ? 'var(--crestline-coral)' : 'var(--crestline-blue)', href: '/portal/billing' },
          { label: 'Total Policies', value: policies.length, icon: Clock, color: 'var(--crestline-navy)', href: '/portal/policies' },
        ].map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="bg-white rounded-xl p-5 border hover:shadow-md transition-all block" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
            <Icon className="w-5 h-5 mb-3" style={{ color }} />
            <div style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2rem', color: 'var(--crestline-navy)' }}>{value}</div>
            <div className="text-sm" style={{ color: 'var(--crestline-muted)' }}>{label}</div>
          </Link>
        ))}
      </div>

      {/* Policies & Claims */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Active Policies */}
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>Active Policies</h2>
            <Link href="/portal/policies" className="text-sm flex items-center gap-1" style={{ color: 'var(--crestline-blue)' }}>
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {activePolicies.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--crestline-muted)' }}>No active policies found.</p>
          ) : (
            <div className="space-y-3">
              {activePolicies.slice(0, 4).map(policy => (
                <div key={policy.policy_number} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--crestline-sky)' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--crestline-slate)' }}>{policy.product || policy.type}</div>
                    <div className="text-xs font-mono" style={{ color: 'var(--crestline-muted)' }}>{policy.policy_number}</div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={policy.status} />
                    <div className="text-xs mt-1" style={{ color: 'var(--crestline-muted)' }}>
                      Expires {new Date(policy.expiration_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Claims */}
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>Recent Claims</h2>
            <Link href="/portal/claims" className="text-sm flex items-center gap-1" style={{ color: 'var(--crestline-blue)' }}>
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {claims.length === 0 ? (
            <div className="text-center py-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--crestline-teal)' }} />
              <p className="text-sm" style={{ color: 'var(--crestline-muted)' }}>No claims on file. Great!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {claims.slice(0, 4).map(claim => (
                <div key={claim.claim_number} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: '#e5e7eb' }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--crestline-slate)' }}>{claim.type}</div>
                    <div className="text-xs font-mono" style={{ color: 'var(--crestline-muted)' }}>{claim.claim_number}</div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={claim.status} />
                    <div className="text-xs mt-1" style={{ color: 'var(--crestline-muted)' }}>
                      ${Number(claim.claim_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Outstanding Invoices */}
      {invoices.length > 0 && (
        <div className="bg-white rounded-xl border p-6" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>Outstanding Invoices</h2>
            <Link href="/pay" className="text-sm flex items-center gap-1 px-4 py-1.5 rounded-lg" style={{ background: 'var(--crestline-blue)', color: 'white' }}>
              Pay Now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {invoices.map(inv => (
              <div key={inv.invoice_number} className="flex items-center justify-between p-3 rounded-lg" style={{ background: inv.status === 'Overdue' ? '#fef2f2' : 'var(--crestline-sky)' }}>
                <div>
                  <div className="text-sm font-medium font-mono" style={{ color: 'var(--crestline-slate)' }}>{inv.invoice_number}</div>
                  <div className="text-xs" style={{ color: 'var(--crestline-muted)' }}>Due {new Date(inv.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={inv.status} />
                  <span className="font-semibold text-sm" style={{ color: 'var(--crestline-slate)' }}>
                    ${Number(inv.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link href="/claims/new" className="flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white" style={{ background: 'var(--crestline-coral)', borderRadius: '12px' }}>
          <FileText className="w-5 h-5" /> File a Claim
        </Link>
        <Link href="/pay" className="flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white" style={{ background: 'var(--crestline-blue)', borderRadius: '12px' }}>
          <CreditCard className="w-5 h-5" /> Make a Payment
        </Link>
      </div>
    </div>
  )
}
