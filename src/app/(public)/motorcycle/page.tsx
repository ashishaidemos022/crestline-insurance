import { Zap } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Motorcycle Insurance | Crestline Insurance' }

export default function MotorcyclePage() {
  return (
    <ProductPageTemplate
      productName="Motorcycle Insurance"
      tagline="Liability and Comprehensive Coverage for riders"
      description="Hit the road with confidence. Crestline motorcycle insurance covers your bike against collision, theft, weather damage, and liability — all for around $680/year. Whether you ride a cruiser, sport bike, or touring motorcycle, we have a policy for you."
      premiumRange="$680"
      coverageTypes={[
        'Liability and Comprehensive Coverage',
        'Collision Coverage',
        'Uninsured Motorist Coverage',
        'Medical Payments',
      ]}
      features={[
        'Custom parts & accessories coverage',
        'Roadside assistance',
        'Trip interruption coverage',
        'Agreed value or actual cash value',
        'Multi-bike discounts',
        'Safety course discounts',
        'Lay-up periods available',
        'Off-season storage discount',
      ]}
      faqs={[
        {
          q: 'Is motorcycle insurance required?',
          a: 'Yes, in all states we operate in, motorcycle riders must carry at minimum liability insurance.',
        },
        {
          q: 'Does my auto policy cover my motorcycle?',
          a: 'No. Motorcycles require a separate policy. Auto insurance does not extend to motorcycles.',
        },
        {
          q: 'Can I insure a custom or modified bike?',
          a: 'Yes, we offer coverage for custom parts and accessories up to a specified limit.',
        },
        {
          q: 'What discount do I get for taking a safety course?',
          a: 'Completing an MSF-approved safety course typically qualifies you for a 5-10% premium discount.',
        },
      ]}
      icon={<Zap className="w-8 h-8 text-white" />}
    />
  )
}
