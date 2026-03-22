import Link from 'next/link'
import {
  Car,
  Home,
  Building,
  Heart,
  Zap,
  Umbrella,
  Briefcase,
  Star,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

const products = [
  {
    icon: Car,
    name: 'Auto Insurance',
    desc: 'Full Coverage with Comprehensive & Collision',
    range: '$1,150 – $1,450/yr',
    href: '/auto',
    color: '#1b5e93',
  },
  {
    icon: Home,
    name: 'Homeowners',
    desc: 'HO-3 Comprehensive Coverage',
    range: '$2,400 – $3,200/yr',
    href: '/homeowners',
    color: '#0f6e56',
  },
  {
    icon: Building,
    name: 'Renters Insurance',
    desc: 'Personal Property & Liability Coverage',
    range: '$350 – $420/yr',
    href: '/renters',
    color: '#854f0b',
  },
  {
    icon: Heart,
    name: 'Life Insurance',
    desc: 'Term Life Coverage ($500K – $750K)',
    range: '$850 – $950/yr',
    href: '/life',
    color: '#993c1d',
  },
  {
    icon: Zap,
    name: 'Motorcycle',
    desc: 'Liability and Comprehensive Coverage',
    range: '~$680/yr',
    href: '/motorcycle',
    color: '#0c2340',
  },
  {
    icon: Star,
    name: 'Pet Insurance',
    desc: 'Comprehensive Pet Health Coverage',
    range: '~$485/yr',
    href: '/pet',
    color: '#0f6e56',
  },
  {
    icon: Umbrella,
    name: 'Umbrella',
    desc: '$2M Additional Liability Protection',
    range: '~$650/yr',
    href: '/umbrella',
    color: '#1b5e93',
  },
  {
    icon: Briefcase,
    name: 'Commercial',
    desc: 'General Liability and Property Coverage',
    range: '~$2,750/yr',
    href: '/commercial',
    color: '#0c2340',
  },
]

const valueProps = [
  {
    icon: Shield,
    title: 'AI-Powered Claims',
    desc: 'Smart claims processing with real-time updates and faster settlements.',
  },
  {
    icon: Clock,
    title: '24/7 Customer Service',
    desc: 'Round-the-clock support via chat, phone, and our customer portal.',
  },
  {
    icon: Zap,
    title: 'Fast Quotes',
    desc: 'Get a personalized quote in minutes. No lengthy applications.',
  },
]

const states = ['TX', 'CO', 'FL', 'WA', 'AZ']

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(135deg, #0c2340 0%, #1b5e93 100%)' }}
        className="text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {states.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
                >
                  {s}
                </span>
              ))}
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}
            >
              Coverage that keeps pace
              <br />
              with your life.
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '2rem',
                lineHeight: 1.6,
              }}
            >
              Modern, AI-powered insurance for individuals, families, and businesses across Texas,
              Colorado, Florida, Washington, and Arizona.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
                style={{ background: 'white', color: 'var(--crestline-navy)' }}
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
                style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white' }}
              >
                Manage My Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ background: 'var(--crestline-cream)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: '2.25rem',
                color: 'var(--crestline-navy)',
                marginBottom: '0.75rem',
              }}
            >
              Find Your Coverage
            </h2>
            <p style={{ color: 'var(--crestline-muted)', fontSize: '1.1rem' }}>
              From auto to umbrella, we&apos;ve got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(({ icon: Icon, name, desc, range, href, color }) => (
              <Link
                key={href}
                href={href}
                className="group block p-6 bg-white rounded-xl border hover:shadow-lg transition-all"
                style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: color + '15', color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: 'var(--crestline-slate)', fontSize: '1rem' }}
                >
                  {name}
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: 'var(--crestline-muted)', lineHeight: 1.5 }}
                >
                  {desc}
                </p>
                <p className="text-sm font-semibold" style={{ color }}>
                  {range}
                </p>
                <div
                  className="mt-3 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color }}
                >
                  Get a Quote <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Crestline */}
      <section style={{ background: 'var(--crestline-sky)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: 'var(--font-dm-serif, serif)',
                fontSize: '2.25rem',
                color: 'var(--crestline-navy)',
                marginBottom: '0.75rem',
              }}
            >
              Why Choose Crestline?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-8 bg-white rounded-xl"
                style={{ borderRadius: '12px' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--crestline-navy)', color: 'white' }}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ color: 'var(--crestline-navy)' }}
                >
                  {title}
                </h3>
                <p style={{ color: 'var(--crestline-muted)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section
        className="py-12"
        style={{
          background: 'white',
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" style={{ color: 'var(--crestline-teal)' }} />
              <span className="font-medium" style={{ color: 'var(--crestline-slate)' }}>
                Licensed &amp; Regulated in 5 States
              </span>
            </div>
            <div className="flex items-center gap-2">
              {states.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    background: 'var(--crestline-sky)',
                    color: 'var(--crestline-navy)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Claims CTA */}
      <section style={{ background: 'var(--crestline-navy)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            style={{
              fontFamily: 'var(--font-dm-serif, serif)',
              fontSize: '2rem',
              color: 'white',
              marginBottom: '0.75rem',
            }}
          >
            Had an incident?
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '2rem',
              fontSize: '1.1rem',
            }}
          >
            File a claim in minutes. We&apos;ll handle the rest.
          </p>
          <Link
            href="/claims/new"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold"
            style={{ background: 'white', color: 'var(--crestline-navy)' }}
          >
            File a Claim <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
