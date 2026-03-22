import { Home } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Homeowners Insurance | Crestline Insurance' }

export default function HomeownersPage() {
  return (
    <ProductPageTemplate
      productName="Homeowners Insurance"
      tagline="HO-3 Comprehensive Coverage for your most important asset"
      description="Your home is your most valuable asset — protect it with Crestline's HO-3 homeowners policy. We cover the structure, your personal belongings, and your liability if someone is injured on your property. Premium rates range from $2,400 to $3,200 per year depending on your home's value and location."
      premiumRange="$2,400"
      coverageTypes={[
        'HO-3 Comprehensive Coverage',
        'HO-3 Policy — Dwelling & Personal Property',
        'Additional Living Expenses (ALE)',
        'Personal Liability Coverage',
        'Medical Payments to Others',
      ]}
      features={[
        'Dwelling structure coverage',
        'Personal property replacement cost',
        'Liability up to $500K',
        'Loss of use coverage',
        'Water backup add-on',
        'Home systems protection',
        'Jewelry & valuables rider',
        'Smart home discounts',
      ]}
      faqs={[
        {
          q: 'What does HO-3 cover?',
          a: "HO-3 is the most common homeowners policy. It covers your dwelling against all perils except those explicitly excluded (like flooding and earthquakes).",
        },
        {
          q: 'Is flood insurance included?',
          a: 'Standard homeowners policies do not cover flooding. We can connect you with NFIP flood insurance options through our partners.',
        },
        {
          q: 'How is my premium calculated?',
          a: "Your rate is based on your home's replacement cost, location, age, construction type, and claims history.",
        },
        {
          q: 'What if my home is in a high-risk area?',
          a: 'We serve TX, CO, FL, WA, and AZ — all areas with unique risks. Our underwriters specialize in each region.',
        },
      ]}
      icon={<Home className="w-8 h-8 text-white" />}
    />
  )
}
