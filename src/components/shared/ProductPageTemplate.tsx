import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

type ProductPageTemplateProps = {
  productName: string
  tagline: string
  description: string
  coverageTypes: string[]
  premiumRange: string
  features: string[]
  faqs: { q: string; a: string }[]
  icon: React.ReactNode
}

export default function ProductPageTemplate({
  productName,
  tagline,
  description,
  coverageTypes,
  premiumRange,
  features,
  faqs,
  icon,
}: ProductPageTemplateProps) {
  return (
    <div>
      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(135deg, #0c2340 0%, #1b5e93 100%)' }}
        className="py-20 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              {icon}
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.1,
                }}
              >
                {productName}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>{tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.75rem',
                  color: 'var(--crestline-navy)',
                  marginBottom: '1rem',
                }}
              >
                About This Coverage
              </h2>
              <p style={{ color: 'var(--crestline-muted)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                {description}
              </p>
            </div>

            {/* Coverage Types */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.75rem',
                  color: 'var(--crestline-navy)',
                  marginBottom: '1rem',
                }}
              >
                Coverage Options
              </h2>
              <div className="space-y-3">
                {coverageTypes.map((type) => (
                  <div
                    key={type}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg border"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: 'var(--crestline-teal)' }}
                    />
                    <span style={{ color: 'var(--crestline-slate)' }}>{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.75rem',
                  color: 'var(--crestline-navy)',
                  marginBottom: '1rem',
                }}
              >
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <CheckCircle
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      style={{ color: 'var(--crestline-teal)' }}
                    />
                    <span style={{ color: 'var(--crestline-muted)', fontSize: '0.95rem' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.75rem',
                  color: 'var(--crestline-navy)',
                  marginBottom: '1rem',
                }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map(({ q, a }) => (
                  <div
                    key={q}
                    className="bg-white rounded-xl p-6 border"
                    style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
                  >
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: 'var(--crestline-slate)' }}
                    >
                      {q}
                    </h3>
                    <p style={{ color: 'var(--crestline-muted)', lineHeight: 1.6 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24">
              {/* Quote Card */}
              <div
                className="rounded-2xl p-6 text-white mb-6"
                style={{ background: 'var(--crestline-navy)' }}
              >
                <div
                  className="text-sm font-medium mb-1"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Starting from
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-dm-serif, serif)',
                    fontSize: '2.5rem',
                    lineHeight: 1,
                  }}
                >
                  {premiumRange}
                </div>
                <div className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  per year
                </div>
                <Link
                  href="/portal"
                  className="block text-center px-6 py-3 rounded-lg font-semibold w-full"
                  style={{ background: 'white', color: 'var(--crestline-navy)' }}
                >
                  Get My Quote <ArrowRight className="inline w-4 h-4 ml-1" />
                </Link>
                <p
                  className="text-xs text-center mt-3"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  No obligation. Takes 2 minutes.
                </p>
              </div>

              {/* Already have a policy? */}
              <div
                className="rounded-xl p-5 border"
                style={{
                  borderColor: '#e5e7eb',
                  background: 'var(--crestline-sky)',
                  borderRadius: '12px',
                }}
              >
                <div
                  className="font-semibold mb-2"
                  style={{ color: 'var(--crestline-navy)' }}
                >
                  Already a customer?
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--crestline-muted)' }}>
                  Access your policy, file claims, and make payments in your portal.
                </p>
                <Link
                  href="/portal"
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: 'var(--crestline-blue)' }}
                >
                  Go to My Portal <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
