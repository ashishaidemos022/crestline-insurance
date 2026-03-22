'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Users } from 'lucide-react'

type Dependent = {
  id: string
  first_name: string
  last_name: string
  relationship: string
  vehicle_attached: string | null
  coverage_type: string
  eligibility_status: string
}

export default function DependentsPage() {
  const router = useRouter()
  const [dependents, setDependents] = useState<Dependent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('crestline_customer')
    if (!stored) { router.push('/portal'); return }
    const cust = JSON.parse(stored)

    supabase
      .from('insurance_dependents')
      .select('*')
      .eq('customer_id', cust.customer_id)
      .then(({ data }) => {
        setDependents(data ?? [])
        setLoading(false)
      })
  }, [router])

  if (loading) return <div style={{ color: 'var(--crestline-muted)' }}>Loading dependents...</div>

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2rem', color: 'var(--crestline-navy)', marginBottom: '0.5rem' }}>My Dependents</h1>
      <p style={{ color: 'var(--crestline-muted)', marginBottom: '2rem' }}>Drivers and family members covered under your policies.</p>

      {dependents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border" style={{ borderColor: '#e5e7eb' }}>
          <Users className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--crestline-muted)' }} />
          <p style={{ color: 'var(--crestline-muted)' }}>No dependents on file. Contact us to add family members to your policy.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dependents.map(dep => (
            <div key={dep.id} className="bg-white rounded-xl border p-6" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'var(--crestline-navy)', flexShrink: 0 }}>
                  {dep.first_name[0]}{dep.last_name[0]}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>{dep.first_name} {dep.last_name}</div>
                  <div className="text-sm mb-3" style={{ color: 'var(--crestline-blue)' }}>{dep.relationship}</div>
                  <div className="space-y-1 text-sm" style={{ color: 'var(--crestline-muted)' }}>
                    <div><span className="font-medium">Coverage:</span> {dep.coverage_type}</div>
                    <div><span className="font-medium">Status:</span>{' '}
                      <span style={{ color: dep.eligibility_status === 'Active' ? 'var(--crestline-teal)' : 'var(--crestline-coral)' }}>
                        {dep.eligibility_status}
                      </span>
                    </div>
                    {dep.vehicle_attached && (
                      <div><span className="font-medium">Vehicle:</span> {dep.vehicle_attached}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
