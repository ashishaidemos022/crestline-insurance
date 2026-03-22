'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { CreditCard, CheckCircle, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react'
import StatusBadge from '@/components/shared/StatusBadge'

type Customer = {
  customer_id: string
  first_name: string
  last_name: string
}

type Invoice = {
  id: string
  invoice_number: string
  amount: number
  status: string
  due_date: string
}

const paymentMethods = ['Credit Card', 'Debit Card', 'Bank Transfer', 'Check']

export default function PaymentPage() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')
  const [cardNumber, setCardNumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentNumber, setPaymentNumber] = useState('')

  const findAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Step 1: find policy by policy number
    const { data: policy, error: policyErr } = await supabase
      .from('insurance_policies')
      .select('customer_id')
      .eq('policy_number', policyNumber.trim().toUpperCase())
      .single()

    if (policyErr || !policy) {
      setError('No account found. Please check your email and policy number.')
      setLoading(false)
      return
    }

    // Step 2: verify email matches that customer
    const { data, error: custErr } = await supabase
      .from('insurance_customers')
      .select('customer_id, first_name, last_name')
      .eq('customer_id', policy.customer_id)
      .eq('email', email.trim().toLowerCase())
      .single()

    setLoading(false)

    if (custErr || !data) {
      setError('No account found. Please check your email and policy number.')
      return
    }

    setCustomer({
      customer_id: data.customer_id,
      first_name: data.first_name,
      last_name: data.last_name,
    })

    const { data: invData } = await supabase
      .from('insurance_invoices')
      .select('id, invoice_number, amount, status, due_date')
      .eq('customer_id', data.customer_id)
      .in('status', ['Pending', 'Overdue'])
      .order('due_date')

    setInvoices(invData ?? [])
    setStep(1)
  }

  const submitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer || !selectedInvoice) return
    setLoading(true)
    setError('')

    const year = new Date().getFullYear()
    const num = String(Math.floor(Math.random() * 99999)).padStart(5, '0')
    const generatedPaymentNumber = `PAY-${year}-${num}`

    const { error: payErr } = await supabase.from('insurance_payments').insert({
      payment_number: generatedPaymentNumber,
      customer_id: customer.customer_id,
      invoice_id: selectedInvoice.id,
      amount: selectedInvoice.amount,
      payment_method: paymentMethod,
      status: 'Completed',
      payment_date: new Date().toISOString().split('T')[0],
    })

    if (payErr) {
      setError('Payment failed. Please try again.')
      setLoading(false)
      return
    }

    await supabase
      .from('insurance_invoices')
      .update({ status: 'Paid' })
      .eq('id', selectedInvoice.id)

    setPaymentNumber(generatedPaymentNumber)
    setLoading(false)
    setStep(3)
  }

  return (
    <div style={{ background: 'var(--crestline-cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--crestline-navy)' }} className="py-10 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-6 h-6" style={{ color: '#4da6ff' }} />
            <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2.25rem' }}>
              Make a Payment
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
            Pay your outstanding invoices securely.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error && (
          <div
            className="flex items-center gap-2 p-3 rounded-lg mb-4 text-sm"
            style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {/* Step 0 — Find account */}
        {step === 0 && (
          <div
            className="bg-white rounded-xl border p-8"
            style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: '1.5rem',
                color: 'var(--crestline-navy)',
                marginBottom: '0.5rem',
              }}
            >
              Find Your Account
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--crestline-muted)' }}>
              Enter your email and any policy number to look up your outstanding invoices.
            </p>
            <form onSubmit={findAccount} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Policy Number
                </label>
                <input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  required
                  placeholder="P-2024-000000"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none font-mono"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-opacity"
                style={{
                  background: 'var(--crestline-navy)',
                  color: 'white',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Looking up...' : (
                  <>
                    Find Invoices <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 1 — Select invoice */}
        {step === 1 && customer && (
          <div
            className="bg-white rounded-xl border p-8"
            style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: '1.5rem',
                color: 'var(--crestline-navy)',
                marginBottom: '1rem',
              }}
            >
              Hi {customer.first_name}, select an invoice to pay:
            </h2>
            {invoices.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: 'var(--crestline-teal)' }}
                />
                <p style={{ color: 'var(--crestline-muted)' }}>
                  You have no outstanding invoices. You&apos;re all caught up!
                </p>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium"
                  style={{ color: 'var(--crestline-blue)' }}
                >
                  Go to Portal <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                {invoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => {
                      setSelectedInvoice(inv)
                      setStep(2)
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-lg border text-left hover:shadow-md transition-all"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <div>
                      <div
                        className="font-mono font-medium"
                        style={{ color: 'var(--crestline-slate)' }}
                      >
                        {inv.invoice_number}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={inv.status} />
                        <span className="text-sm" style={{ color: 'var(--crestline-muted)' }}>
                          Due{' '}
                          {new Date(inv.due_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="font-semibold text-lg" style={{ color: 'var(--crestline-slate)' }}>
                      ${Number(inv.amount).toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setStep(0)}
              className="mt-4 flex items-center gap-1 text-sm"
              style={{ color: 'var(--crestline-muted)' }}
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          </div>
        )}

        {/* Step 2 — Payment info */}
        {step === 2 && selectedInvoice && (
          <div
            className="bg-white rounded-xl border p-8"
            style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: '1.5rem',
                color: 'var(--crestline-navy)',
                marginBottom: '1.5rem',
              }}
            >
              Payment Details
            </h2>

            {/* Invoice summary */}
            <div
              className="p-4 rounded-xl mb-6 flex items-center justify-between"
              style={{ background: 'var(--crestline-sky)' }}
            >
              <div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--crestline-muted)' }}>
                  Invoice
                </div>
                <div
                  className="font-mono font-semibold"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  {selectedInvoice.invoice_number}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '2rem',
                  color: 'var(--crestline-navy)',
                }}
              >
                ${Number(selectedInvoice.amount).toFixed(2)}
              </div>
            </div>

            <form onSubmit={submitPayment} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className="p-3 rounded-lg border text-sm font-medium transition-colors"
                      style={{
                        borderColor:
                          paymentMethod === method ? 'var(--crestline-blue)' : '#e5e7eb',
                        background: paymentMethod === method ? '#eff6ff' : 'white',
                        color:
                          paymentMethod === method
                            ? 'var(--crestline-blue)'
                            : 'var(--crestline-muted)',
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
                <>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: 'var(--crestline-slate)' }}
                    >
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        maxLength={19}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none font-mono"
                        style={{ borderColor: '#d1d5db' }}
                      />
                      <CreditCard
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                        style={{ color: 'var(--crestline-muted)' }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: 'var(--crestline-slate)' }}
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                        style={{ borderColor: '#d1d5db' }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: 'var(--crestline-slate)' }}
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="•••"
                        maxLength={4}
                        className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none font-mono"
                        style={{ borderColor: '#d1d5db' }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div
                className="text-xs p-3 rounded-lg"
                style={{ background: 'var(--crestline-sky)', color: 'var(--crestline-muted)' }}
              >
                This is a demo. No real payment will be processed.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm border transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#d1d5db', color: 'var(--crestline-muted)' }}
                >
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-white transition-opacity"
                  style={{
                    background: 'var(--crestline-blue)',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading
                    ? 'Processing...'
                    : `Pay $${Number(selectedInvoice.amount).toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div
            className="bg-white rounded-xl border p-8 text-center"
            style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: '#dcfce7' }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: 'var(--crestline-teal)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: '1.75rem',
                color: 'var(--crestline-navy)',
                marginBottom: '0.5rem',
              }}
            >
              Payment Successful
            </h2>
            <p className="mb-4" style={{ color: 'var(--crestline-muted)' }}>
              Your payment of{' '}
              <strong>${selectedInvoice && Number(selectedInvoice.amount).toFixed(2)}</strong> has
              been processed.
            </p>
            <div
              className="inline-block px-6 py-4 rounded-xl mb-6"
              style={{ background: 'var(--crestline-sky)' }}
            >
              <div className="text-xs mb-1" style={{ color: 'var(--crestline-muted)' }}>
                Payment Confirmation Number
              </div>
              <div
                className="font-mono text-2xl font-bold"
                style={{ color: 'var(--crestline-navy)' }}
              >
                {paymentNumber}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/portal"
                className="px-6 py-2.5 rounded-lg font-medium text-white"
                style={{ background: 'var(--crestline-navy)' }}
              >
                Go to My Portal
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-lg font-medium border"
                style={{ borderColor: '#d1d5db', color: 'var(--crestline-muted)' }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
