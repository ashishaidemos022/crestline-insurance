import Link from 'next/link'
import { Shield } from 'lucide-react'

const personalLines: [string, string][] = [
  ['Auto', '/auto'],
  ['Homeowners', '/homeowners'],
  ['Renters', '/renters'],
  ['Life', '/life'],
  ['Motorcycle', '/motorcycle'],
  ['Pet', '/pet'],
  ['Umbrella', '/umbrella'],
]

const commercialLines: [string, string][] = [
  ['General Liability', '/commercial'],
  ['Commercial Auto', '/commercial'],
]

const companyLinks: [string, string][] = [
  ['About Us', '/about'],
  ['Contact', '/contact'],
  ['Claims', '/claims/new'],
  ['My Policy', '/portal'],
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--crestline-navy)', color: '#94a3b8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6" style={{ color: '#4da6ff' }} />
              <span
                style={{
                  fontFamily: 'var(--font-dm-serif, serif)',
                  fontSize: '1.2rem',
                  color: 'white',
                }}
              >
                Crestline
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
              Coverage that keeps pace with your life. Serving TX, CO, FL, WA, and AZ.
            </p>
          </div>

          {/* Personal Lines */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Personal Lines</h4>
            <ul className="space-y-2 text-sm">
              {personalLines.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial + Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Commercial Lines</h4>
            <ul className="space-y-2 text-sm">
              {commercialLines.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold text-white mt-6 mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>1-800-CRESTLINE</li>
              <li>hello@crestlineinsurance.com</li>
              <li className="pt-2">Mon–Fri 8am–8pm CT</li>
              <li>Sat 9am–5pm CT</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p>© 2024 Crestline Insurance Company. All rights reserved.</p>
          <p>Licensed in TX · CO · FL · WA · AZ</p>
        </div>
      </div>
    </footer>
  )
}
