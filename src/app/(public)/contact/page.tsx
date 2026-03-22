import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | Crestline Insurance',
}

const offices = [
  {
    city: 'Dallas, TX',
    address: '100 Main Street, Suite 1200, Dallas, TX 75201',
    phone: '1-800-273-7854 ext. 1',
  },
  {
    city: 'Denver, CO',
    address: '1700 Lincoln Street, Suite 800, Denver, CO 80203',
    phone: '1-800-273-7854 ext. 2',
  },
  {
    city: 'Miami, FL',
    address: '1200 Brickell Avenue, Suite 500, Miami, FL 33131',
    phone: '1-800-273-7854 ext. 3',
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{ background: 'linear-gradient(135deg, #0c2340 0%, #1b5e93 100%)' }}
        className="py-16 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            style={{
              fontFamily: 'var(--font-dm-serif, serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '0.75rem',
              lineHeight: 1.1,
            }}
          >
            Contact Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            We&apos;re here to help, 24/7.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ background: 'var(--crestline-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.75rem',
                  color: 'var(--crestline-navy)',
                  marginBottom: '1.5rem',
                }}
              >
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--crestline-sky)' }}
                  >
                    <Phone className="w-5 h-5" style={{ color: 'var(--crestline-blue)' }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                      Phone
                    </div>
                    <div style={{ color: 'var(--crestline-muted)' }}>
                      1-800-CRESTLINE (1-800-273-7854)
                    </div>
                    <div className="text-sm" style={{ color: 'var(--crestline-muted)' }}>
                      Available 24/7 for claims
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--crestline-sky)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: 'var(--crestline-blue)' }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                      Email
                    </div>
                    <div style={{ color: 'var(--crestline-muted)' }}>
                      hello@crestlineinsurance.com
                    </div>
                    <div className="text-sm" style={{ color: 'var(--crestline-muted)' }}>
                      Response within 24 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--crestline-sky)' }}
                  >
                    <Clock className="w-5 h-5" style={{ color: 'var(--crestline-blue)' }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                      Office Hours
                    </div>
                    <div style={{ color: 'var(--crestline-muted)' }}>Mon–Fri: 8am–8pm CT</div>
                    <div style={{ color: 'var(--crestline-muted)' }}>Sat: 9am–5pm CT</div>
                    <div style={{ color: 'var(--crestline-muted)' }}>
                      Sun: Closed (Claims line always open)
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <h3
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.5rem',
                  color: 'var(--crestline-navy)',
                  marginTop: '2rem',
                  marginBottom: '1rem',
                }}
              >
                Our Offices
              </h3>
              <div className="space-y-4">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="bg-white rounded-xl p-4 border"
                    style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="w-4 h-4 mt-1 flex-shrink-0"
                        style={{ color: 'var(--crestline-blue)' }}
                      />
                      <div>
                        <div className="font-semibold" style={{ color: 'var(--crestline-slate)' }}>
                          {office.city}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--crestline-muted)' }}>
                          {office.address}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--crestline-blue)' }}>
                          {office.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Chat */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.75rem',
                  color: 'var(--crestline-navy)',
                  marginBottom: '1rem',
                }}
              >
                AI Assistant
              </h2>
              <div
                className="bg-white rounded-xl border p-8 text-center"
                style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--crestline-navy)' }}
                >
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ color: 'var(--crestline-slate)' }}
                >
                  Chat with Us
                </h3>
                <p className="mb-6" style={{ color: 'var(--crestline-muted)' }}>
                  Our AI-powered assistant is available 24/7 to answer questions, help with claims,
                  and connect you with the right team.
                </p>
                <div
                  className="rounded-xl p-4 text-sm"
                  style={{
                    background: 'var(--crestline-sky)',
                    color: 'var(--crestline-muted)',
                  }}
                >
                  Chat widget powered by Talkdesk CXA — available on the bottom right of your
                  screen.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
