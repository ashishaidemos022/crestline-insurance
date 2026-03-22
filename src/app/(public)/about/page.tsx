import { Shield, MapPin, Users, Award } from 'lucide-react'

export const metadata = {
  title: 'About Us | Crestline Insurance',
}

const states = [
  { code: 'TX', name: 'Texas', city: 'Dallas' },
  { code: 'CO', name: 'Colorado', city: 'Denver' },
  { code: 'FL', name: 'Florida', city: 'Miami' },
  { code: 'WA', name: 'Washington', city: 'Seattle' },
  { code: 'AZ', name: 'Arizona', city: 'Phoenix' },
]

const leadership = [
  {
    name: 'Sarah Kellerman',
    role: 'Chief Executive Officer',
    bio: '20+ years in P&C insurance. Formerly VP at Travelers Insurance.',
  },
  {
    name: 'Marcus Chen',
    role: 'Chief Technology Officer',
    bio: 'Built AI-powered claims systems at Lemonade and Hippo Insurance.',
  },
  {
    name: 'Priya Nair',
    role: 'Chief Underwriting Officer',
    bio: '15 years of actuarial and underwriting experience across personal and commercial lines.',
  },
  {
    name: 'Derek Okafor',
    role: 'VP of Claims',
    bio: 'Led claims transformation at several regional carriers across the Sunbelt.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(135deg, #0c2340 0%, #1b5e93 100%)' }}
        className="py-20 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            style={{
              fontFamily: 'var(--font-dm-serif, serif)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}
          >
            About Crestline Insurance
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.2rem',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            We&apos;re reimagining insurance for the modern era — combining technology and genuine
            customer care.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16" style={{ background: 'var(--crestline-cream)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: 'var(--font-dm-serif, serif)',
              fontSize: '2rem',
              color: 'var(--crestline-navy)',
              marginBottom: '1.5rem',
            }}
          >
            Our Story
          </h2>
          <div
            className="space-y-4 text-base leading-relaxed"
            style={{ color: 'var(--crestline-muted)' }}
          >
            <p>
              Crestline Insurance was founded with a simple belief: insurance should be
              straightforward, fair, and built around the customer — not the other way around. Too
              many people have experienced the frustration of confusing policies, slow claims, and
              hidden fees. We set out to change that.
            </p>
            <p>
              Operating across Texas, Colorado, Florida, Washington, and Arizona, we combine the
              personalized service of a regional carrier with the technology and speed of a modern
              insurtech company. Our AI-powered claims platform means faster resolutions, fewer
              surprises, and more transparency at every step.
            </p>
            <p>
              We believe great insurance isn&apos;t just a product — it&apos;s peace of mind.
              That&apos;s why we build every policy, process, and customer touchpoint with care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: 'var(--crestline-sky)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5', label: 'States Served', icon: MapPin },
              { value: '50K+', label: 'Policyholders', icon: Users },
              { value: '9', label: 'Products', icon: Shield },
              { value: 'A-', label: 'AM Best Rating', icon: Award },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="bg-white rounded-xl p-6" style={{ borderRadius: '12px' }}>
                <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: 'var(--crestline-blue)' }} />
                <div
                  style={{
                    fontFamily: 'var(--font-dm-serif, serif)',
                    fontSize: '2.5rem',
                    color: 'var(--crestline-navy)',
                  }}
                >
                  {value}
                </div>
                <div className="text-sm" style={{ color: 'var(--crestline-muted)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16" style={{ background: 'var(--crestline-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: 'var(--font-dm-serif, serif)',
              fontSize: '2rem',
              color: 'var(--crestline-navy)',
              marginBottom: '2rem',
            }}
          >
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map(({ name, role, bio }) => (
              <div
                key={name}
                className="bg-white rounded-xl p-6 border"
                style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white font-bold"
                  style={{ background: 'var(--crestline-navy)' }}
                >
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <h3 className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                  {name}
                </h3>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--crestline-blue)' }}>
                  {role}
                </p>
                <p className="text-sm" style={{ color: 'var(--crestline-muted)', lineHeight: 1.5 }}>
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            style={{
              fontFamily: 'var(--font-dm-serif, serif)',
              fontSize: '2rem',
              color: 'var(--crestline-navy)',
              marginBottom: '2rem',
            }}
          >
            Where We Operate
          </h2>
          <div className="flex flex-wrap gap-4">
            {states.map(({ code, name, city }) => (
              <div
                key={code}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border"
                style={{ borderColor: '#e5e7eb', borderRadius: '12px', minWidth: '200px' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    background: 'var(--crestline-sky)',
                    color: 'var(--crestline-navy)',
                  }}
                >
                  {code}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                    {name}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--crestline-muted)' }}>
                    Based in {city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
