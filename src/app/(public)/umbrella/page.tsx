import { Umbrella } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Umbrella Insurance | Crestline Insurance' }

export default function UmbrellaPage() {
  return (
    <ProductPageTemplate
      productName="Umbrella Insurance"
      tagline="$2M Additional Liability Protection above your existing policies"
      description="An umbrella policy extends the liability limits of your existing auto and homeowners policies. If you're sued for more than your primary policy covers, umbrella insurance picks up the tab — up to $2 million. At around $650/year, it's one of the best values in personal insurance."
      premiumRange="$650"
      coverageTypes={[
        '$2M Additional Liability Protection',
        'Excess Liability over Auto & Home',
        'Personal Injury Coverage',
        'Worldwide Coverage',
      ]}
      features={[
        'Covers gaps in underlying policies',
        'Legal defense costs included',
        'Coverage for libel & slander',
        'Rental property liability',
        'Volunteer activities coverage',
        'Worldwide liability coverage',
        'No deductible after underlying limits',
        'Requires auto + home with Crestline',
      ]}
      faqs={[
        {
          q: 'Who needs umbrella insurance?',
          a: 'Anyone with significant assets or income to protect. If you own a home, have savings, or have teenage drivers, umbrella insurance is worth serious consideration.',
        },
        {
          q: "What's the minimum underlying coverage required?",
          a: 'Most umbrella policies require $300K+ in auto liability and $300K+ in homeowners liability as underlying coverage.',
        },
        {
          q: 'Does umbrella cover business liability?',
          a: 'Personal umbrella policies generally do not cover business activities. You would need a commercial umbrella for business-related claims.',
        },
        {
          q: 'How does umbrella actually pay out?',
          a: 'Your primary policy (auto or home) pays first up to its limit. Then umbrella pays the excess up to your umbrella limit.',
        },
      ]}
      icon={<Umbrella className="w-8 h-8 text-white" />}
    />
  )
}
