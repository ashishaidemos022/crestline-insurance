import { Car } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Auto Insurance | Crestline Insurance' }

export default function AutoPage() {
  return (
    <ProductPageTemplate
      productName="Auto Insurance"
      tagline="Full Coverage with Comprehensive & Collision"
      description="Crestline auto insurance gives you the protection you need on the road. Whether you're commuting daily or driving across state lines, our policies offer comprehensive coverage from liability to collision, with premium rates from $1,150 to $1,450 per year. Our AI-powered claims system means faster settlements and real-time updates."
      premiumRange="$1,150"
      coverageTypes={[
        'Full Coverage with Comprehensive & Collision',
        'Liability Protection (Bodily Injury & Property Damage)',
        'Uninsured/Underinsured Motorist Coverage',
        'Medical Payments Coverage (MedPay)',
        'Personal Injury Protection (PIP)',
        'Rental Reimbursement',
        'Roadside Assistance',
      ]}
      features={[
        'AI-powered claims processing',
        'Accident forgiveness (after 3 claim-free years)',
        'Multi-vehicle discounts up to 15%',
        'Safe driver discounts',
        'Digital ID cards',
        '24/7 claims hotline',
        'New car replacement coverage',
        'Gap insurance available',
      ]}
      faqs={[
        {
          q: 'How do I file an auto claim?',
          a: 'Log into your portal or call 1-800-CRESTLINE. Our AI assistant can guide you through the FNOL process in minutes.',
        },
        {
          q: 'Does my policy cover rental cars?',
          a: 'Yes, our rental reimbursement add-on covers up to $40/day for a rental while your car is being repaired.',
        },
        {
          q: 'What is the minimum coverage required in Texas?',
          a: 'Texas requires 30/60/25 liability coverage. We can help you understand what level of protection is right for your situation.',
        },
        {
          q: 'Can I add a teenage driver to my policy?',
          a: 'Yes. Teen drivers can be added as a dependent. We offer good student discounts to help offset the additional premium.',
        },
      ]}
      icon={<Car className="w-8 h-8 text-white" />}
    />
  )
}
