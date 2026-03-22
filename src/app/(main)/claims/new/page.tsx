'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Shield, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'

type Customer = {
  customer_id: string
  first_name: string
  last_name: string
  email: string
}

type Policy = {
  id: string
  policy_number: string
  type: string
  status: string
  product: string
}

const claimTypes = [
  'Property Damage',
  'Water Damage',
  'Auto Collision',
  'Theft',
  'Auto Glass',
  'Motorcycle Accident',
  'Pet Medical',
  'Life Insurance',
]

const stepLabels = ['Verify Identity', 'Select Policy', 'Describe Incident', 'Confirmation']

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
            style={{
              background:
                i < step
                  ? 'var(--crestline-teal)'
                  : i === step
                    ? 'var(--crestline-navy)'
                    : '#e5e7eb',
              color: i <= step ? 'white' : 'var(--crestline-muted)',
            }}
          >
            {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className="w-12 h-0.5"
              style={{ background: i < step ? 'var(--crestline-teal)' : '#e5e7eb' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function FileClaimPage() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [policies, setPolicies] = useState<Policy[]>([])
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)
  const [claimType, setClaimType] = useState('')
  const [incidentDate, setIncidentDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [claimNumber, setClaimNumber] = useState('')

  const findCustomer = async (e: React.FormEvent) => {
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
      .select('customer_id, first_name, last_name, email')
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
      email: data.email,
    })

    // Fetch all active policies for this customer
    const { data: allPolicies } = await supabase
      .from('insurance_policies')
      .select('id, policy_number, type, status, product')
      .eq('customer_id', data.customer_id)
      .in('status', ['Active', 'Renewal Pending'])

    setPolicies(allPolicies ?? [])
    setStep(1)
  }

  const submitClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer || !selectedPolicy) return
    setError('')
    setLoading(true)

    const year = new Date().getFullYear()
    const num = String(Math.floor(Math.random() * 99999)).padStart(5, '0')
    const generatedClaimNumber = `CLM-${year}-${num}`

    const { error: insertErr } = await supabase.from('insurance_claims').insert({
      claim_number: generatedClaimNumber,
      customer_id: customer.customer_id,
      policy_id: selectedPolicy.id,
      type: claimType,
      status: 'FNOL Received',
      priority: 'Medium',
      incident_date: incidentDate,
      claim_amount: parseFloat(amount) || 0,
      description: description,
      location: location,
    })

    setLoading(false)

    if (insertErr) {
      setError('Error submitting claim. Please try again.')
      return
    }

    setClaimNumber(generatedClaimNumber)
    setStep(3)
  }

  return (
    <div style={{ background: 'var(--crestline-cream)', minHeight: '100vh' }}>
      {/* Hero bar */}
      <div style={{ background: 'var(--crestline-navy)' }} className="py-10 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6" style={{ color: '#4da6ff' }} />
            <h1 style={{ fontFamily: 'var(--font-dm-serif, serif)', fontSize: '2.25rem' }}>
              File a Claim
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
            We&apos;ll guide you through the process step by step.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <StepIndicator step={step} total={4} />

        {/* Step label */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--crestline-muted)' }}>
            Step {step + 1} of 4
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-dm-serif, serif)',
              fontSize: '1.5rem',
              color: 'var(--crestline-navy)',
            }}
          >
            {stepLabels[step]}
          </h2>
        </div>

        {error && (
          <div
            className="p-3 rounded-lg mb-4 text-sm"
            style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}
          >
            {error}
          </div>
        )}

        {/* STEP 0 — Verify identity */}
        {step === 0 && (
          <div
            className="bg-white rounded-xl border p-8"
            style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
          >
            <p className="text-sm mb-6" style={{ color: 'var(--crestline-muted)' }}>
              Enter the email and policy number associated with your account to get started.
            </p>
            <form onSubmit={findCustomer} className="space-y-4">
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
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
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
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none font-mono focus:ring-2"
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
                    Continue <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 1 — Select policy */}
        {step === 1 && customer && (
          <div
            className="bg-white rounded-xl border p-8"
            style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
          >
            <p className="text-sm mb-6" style={{ color: 'var(--crestline-muted)' }}>
              Hi {customer.first_name}. Select the policy this claim applies to:
            </p>
            {policies.length === 0 ? (
              <div
                className="p-4 rounded-lg text-sm text-center"
                style={{ background: 'var(--crestline-sky)', color: 'var(--crestline-muted)' }}
              >
                No active policies found. Please contact support to file a claim.
              </div>
            ) : (
              <div className="space-y-3">
                {policies.map((policy) => (
                  <button
                    key={policy.id}
                    onClick={() => {
                      setSelectedPolicy(policy)
                      setStep(2)
                    }}
                    className="w-full flex items-center justify-between p-4 rounded-lg border text-left transition-all hover:shadow-md"
                    style={{
                      borderColor:
                        selectedPolicy?.id === policy.id ? 'var(--crestline-blue)' : '#e5e7eb',
                    }}
                  >
                    <div>
                      <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                        {policy.product || policy.type}
                      </div>
                      <div
                        className="font-mono text-sm mt-0.5"
                        style={{ color: 'var(--crestline-muted)' }}
                      >
                        {policy.policy_number}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4" style={{ color: 'var(--crestline-muted)' }} />
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

        {/* STEP 2 — Describe incident */}
        {step === 2 && selectedPolicy && (
          <div
            className="bg-white rounded-xl border p-8"
            style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
          >
            <div
              className="p-3 rounded-lg mb-6 text-sm"
              style={{ background: 'var(--crestline-sky)', color: 'var(--crestline-navy)' }}
            >
              Filing for:{' '}
              <strong>{selectedPolicy.product || selectedPolicy.type}</strong> —{' '}
              {selectedPolicy.policy_number}
            </div>
            <form onSubmit={submitClaim} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Claim Type
                </label>
                <select
                  value={claimType}
                  onChange={(e) => setClaimType(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: '#d1d5db', color: 'var(--crestline-slate)' }}
                >
                  <option value="">Select claim type...</option>
                  {claimTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Date of Incident
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Location of Incident
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="e.g., Dallas, TX — I-35 North"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe what happened in as much detail as possible..."
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none resize-none"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Estimated Loss Amount ($)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: '#d1d5db' }}
                />
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
                    background: 'var(--crestline-navy)',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Claim'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3 — Confirmation */}
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
              Claim Submitted
            </h2>
            <p className="mb-6" style={{ color: 'var(--crestline-muted)' }}>
              Your claim has been received. A claims adjuster will contact you within 24 hours.
            </p>
            <div
              className="inline-block px-6 py-4 rounded-xl mb-6"
              style={{ background: 'var(--crestline-sky)' }}
            >
              <div className="text-xs mb-1" style={{ color: 'var(--crestline-muted)' }}>
                Your Claim Number
              </div>
              <div
                className="font-mono text-2xl font-bold"
                style={{ color: 'var(--crestline-navy)' }}
              >
                {claimNumber}
              </div>
            </div>
            <p className="text-sm mb-6" style={{ color: 'var(--crestline-muted)' }}>
              Keep this number for your records. You can track your claim status in your customer
              portal.
            </p>
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
