'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import StatusBadge from '@/components/shared/StatusBadge'
import { CreditCard } from 'lucide-react'

type Invoice = {
  id: string
  invoice_number: string
  amount: number
  status: string
  due_date: string
}

export default function BillingPage() {
  const router = useRouter()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('crestline_customer')
    if (!stored) { router.push('/portal'); return }
    const cust = JSON.parse(stored)

    supabase
      .from('insurance_invoices')
      .select('id, invoice_number, amount, status, due_date')
      .eq('customer_id', cust.customer_id)
      .order('due_date', { ascending: false })
      .then(({ data }) => {
        setInvoices(data ?? [])
        setLoading(false)
      })
  }, [router])

  if (loading) return <div style={{ color: 'var(--crestline-muted)' }}>Loading billing...</div>

  const outstanding = invoices.filter(i => i.status !== 'Paid')
  const totalDue = outstanding.reduce((sum, i) => sum + Number(i.amount), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2rem', color: 'var(--crestline-navy)' }}>Billing</h1>
          <p style={{ color: 'var(--crestline-muted)' }}>Your invoice history and outstanding balances.</p>
        </div>
        {outstanding.length > 0 && (
          <Link href="/pay" className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white text-sm" style={{ background: 'var(--crestline-blue)' }}>
            <CreditCard className="w-4 h-4" /> Pay ${totalDue.toFixed(2)}
          </Link>
        )}
      </div>

      {outstanding.length > 0 && (
        <div className="p-4 rounded-xl mb-6 text-sm" style={{ background: '#fef9c3', color: '#854d0e', border: '1px solid #fde68a' }}>
          You have {outstanding.length} outstanding invoice{outstanding.length > 1 ? 's' : ''} totaling <strong>${totalDue.toFixed(2)}</strong>.
        </div>
      )}

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#e5e7eb' }}>
        <div className="px-6 py-4 border-b text-sm font-medium grid grid-cols-4 gap-4" style={{ borderColor: '#e5e7eb', color: 'var(--crestline-muted)' }}>
          <span>Invoice #</span>
          <span>Due Date</span>
          <span>Status</span>
          <span className="text-right">Amount</span>
        </div>
        {invoices.length === 0 ? (
          <div className="px-6 py-10 text-center" style={{ color: 'var(--crestline-muted)' }}>No invoices found.</div>
        ) : (
          invoices.map(inv => (
            <div key={inv.id} className="px-6 py-4 border-b grid grid-cols-4 gap-4 items-center text-sm last:border-b-0" style={{ borderColor: '#e5e7eb' }}>
              <span className="font-mono" style={{ color: 'var(--crestline-slate)' }}>{inv.invoice_number}</span>
              <span style={{ color: 'var(--crestline-muted)' }}>
                {new Date(inv.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <StatusBadge status={inv.status} />
              <span className="text-right font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                ${Number(inv.amount).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
