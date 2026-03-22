'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import StatusBadge from '@/components/shared/StatusBadge'
import { Plus } from 'lucide-react'

type Claim = {
  id: string
  claim_number: string
  type: string
  status: string
  priority: string
  incident_date: string
  claim_amount: number
  reserve_amount: number
  description: string
  location: string
}

export default function ClaimsPage() {
  const router = useRouter()
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('crestline_customer')
    if (!stored) { router.push('/portal'); return }
    const cust = JSON.parse(stored)

    supabase
      .from('insurance_claims')
      .select('*')
      .eq('customer_id', cust.customer_id)
      .order('incident_date', { ascending: false })
      .then(({ data }) => {
        setClaims(data ?? [])
        setLoading(false)
      })
  }, [router])

  if (loading) return <div style={{ color: 'var(--crestline-muted)' }}>Loading claims...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2rem', color: 'var(--crestline-navy)' }}>My Claims</h1>
          <p style={{ color: 'var(--crestline-muted)' }}>All claims filed under your policies.</p>
        </div>
        <Link href="/claims/new" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white text-sm" style={{ background: 'var(--crestline-blue)' }}>
          <Plus className="w-4 h-4" /> File a Claim
        </Link>
      </div>

      {claims.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border" style={{ borderColor: '#e5e7eb' }}>
          <p style={{ color: 'var(--crestline-muted)' }}>No claims on file. That&apos;s great!</p>
          <Link href="/claims/new" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--crestline-blue)' }}>
            <Plus className="w-4 h-4" /> File a Claim
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map(claim => (
            <div key={claim.id} className="bg-white rounded-xl border p-6" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>{claim.type}</span>
                    <StatusBadge status={claim.status} />
                    <StatusBadge status={claim.priority} />
                  </div>
                  <div className="font-mono text-sm" style={{ color: 'var(--crestline-muted)' }}>{claim.claim_number}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                    ${Number(claim.claim_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--crestline-muted)' }}>Claim Amount</div>
                </div>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--crestline-muted)', lineHeight: 1.5 }}>{claim.description}</p>
              <div className="flex flex-wrap gap-4 text-sm pt-3 border-t" style={{ borderColor: '#e5e7eb' }}>
                <div>
                  <span style={{ color: 'var(--crestline-muted)' }}>Incident: </span>
                  <span style={{ color: 'var(--crestline-slate)' }}>{new Date(claim.incident_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                {claim.location && (
                  <div>
                    <span style={{ color: 'var(--crestline-muted)' }}>Location: </span>
                    <span style={{ color: 'var(--crestline-slate)' }}>{claim.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
