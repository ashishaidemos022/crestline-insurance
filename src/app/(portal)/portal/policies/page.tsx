'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import StatusBadge from '@/components/shared/StatusBadge'
import { FileText } from 'lucide-react'

type Policy = {
  id: string
  policy_number: string
  type: string
  status: string
  effective_date: string
  expiration_date: string
  premium: number
  coverage: string
  product: string
}

export default function PoliciesPage() {
  const router = useRouter()
  const [policies, setPolicies] = useState<Policy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('crestline_customer')
    if (!stored) { router.push('/portal'); return }
    const cust = JSON.parse(stored)

    supabase
      .from('insurance_policies')
      .select('*')
      .eq('customer_id', cust.customer_id)
      .order('status')
      .then(({ data }) => {
        setPolicies(data ?? [])
        setLoading(false)
      })
  }, [router])

  if (loading) return <div style={{ color: 'var(--crestline-muted)' }}>Loading policies...</div>

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2rem', color: 'var(--crestline-navy)', marginBottom: '0.5rem' }}>My Policies</h1>
      <p style={{ color: 'var(--crestline-muted)', marginBottom: '2rem' }}>All your active and inactive Crestline policies.</p>

      {policies.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--crestline-muted)' }} />
          <p style={{ color: 'var(--crestline-muted)' }}>No policies found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {policies.map(policy => (
            <div key={policy.id} className="bg-white rounded-xl border p-6" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--crestline-slate)' }}>{policy.product || policy.type}</h3>
                    <StatusBadge status={policy.status} />
                  </div>
                  <div className="font-mono text-sm mb-2" style={{ color: 'var(--crestline-muted)' }}>{policy.policy_number}</div>
                  <div className="text-sm" style={{ color: 'var(--crestline-muted)' }}>{policy.coverage}</div>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '1.75rem', color: 'var(--crestline-navy)' }}>
                    ${Number(policy.premium).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--crestline-muted)' }}>per year</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex flex-wrap gap-6 text-sm" style={{ borderColor: '#e5e7eb' }}>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'var(--crestline-muted)' }}>Effective Date</div>
                  <div style={{ color: 'var(--crestline-slate)', fontWeight: 500 }}>
                    {new Date(policy.effective_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'var(--crestline-muted)' }}>Expiration Date</div>
                  <div style={{ color: 'var(--crestline-slate)', fontWeight: 500 }}>
                    {new Date(policy.expiration_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'var(--crestline-muted)' }}>Policy Type</div>
                  <div style={{ color: 'var(--crestline-slate)', fontWeight: 500 }}>{policy.type}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
