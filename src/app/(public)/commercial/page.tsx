import { Briefcase } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Commercial Insurance | Crestline Insurance' }

export default function CommercialPage() {
  return (
    <ProductPageTemplate
      productName="Commercial Insurance"
      tagline="Protecting businesses of all sizes across the Southwest"
      description="Crestline offers commercial general liability and commercial auto coverage designed for small and mid-sized businesses. Whether you run a shop, manage a fleet, or provide professional services, our commercial lines team can build a policy that fits your risk profile and budget."
      premiumRange="$2,750"
      coverageTypes={[
        'General Liability and Property Coverage',
        'Commercial Auto — Fleet Coverage',
        'Business Owners Policy (BOP)',
        'Commercial Umbrella',
      ]}
      features={[
        'Per-occurrence limits up to $2M',
        'Aggregate limits up to $4M',
        'Fleet coverage for 2+ vehicles',
        'Business property coverage',
        'Business interruption',
        'Employee dishonesty rider',
        'Certificates of insurance on demand',
        'Dedicated commercial agent',
      ]}
      faqs={[
        {
          q: 'Do I need commercial auto if I use my personal car for work?',
          a: 'Yes. Personal auto policies typically exclude business use. Commercial auto covers vehicles used primarily for business purposes.',
        },
        {
          q: 'What does general liability cover?',
          a: "GL covers bodily injury and property damage caused to third parties, plus personal and advertising injury. It's essential for any customer-facing business.",
        },
        {
          q: 'Can I get coverage mid-year?',
          a: 'Yes, commercial policies can be bound at any time. Your premium is prorated to your policy term start date.',
        },
        {
          q: 'Do you cover contractors?',
          a: 'Yes, we cover many contractor types including general contractors, electricians, plumbers, and landscapers.',
        },
      ]}
      icon={<Briefcase className="w-8 h-8 text-white" />}
    />
  )
}
