import { Star } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Pet Insurance | Crestline Insurance' }

export default function PetPage() {
  return (
    <ProductPageTemplate
      productName="Pet Insurance"
      tagline="Comprehensive Pet Health Coverage for your furry family members"
      description="Your pets are family. Crestline pet insurance covers unexpected vet bills from accidents, illnesses, and wellness care. At around $485/year, you can protect your dog or cat from the financial shock of an unexpected health emergency."
      premiumRange="$485"
      coverageTypes={[
        'Comprehensive Pet Health Coverage',
        'Accident & Illness Coverage',
        'Wellness & Preventive Care Add-on',
      ]}
      features={[
        'Up to $10K annual coverage',
        'Reimbursement-based model',
        'Any licensed vet in the US',
        'No lifetime limits on illness',
        'Hereditary condition coverage',
        'Dental illness coverage',
        'Behavioral treatment coverage',
        'Multi-pet discounts',
      ]}
      faqs={[
        {
          q: 'What breeds are covered?',
          a: 'We cover all dog and cat breeds, including breeds commonly excluded by other providers. Some restrictions may apply for pre-existing conditions.',
        },
        {
          q: 'Is there a waiting period?',
          a: 'Yes, there is typically a 14-day waiting period for illnesses and a 48-hour waiting period for accidents after policy start.',
        },
        {
          q: 'How does reimbursement work?',
          a: 'You pay the vet bill at the time of service, then submit a claim through your portal. We reimburse you at 70-90% of the covered cost after your deductible.',
        },
        {
          q: 'Are pre-existing conditions covered?',
          a: 'Pre-existing conditions that were present before your policy start date are generally not covered. Curable conditions may be covered after a symptom-free period.',
        },
      ]}
      icon={<Star className="w-8 h-8 text-white" />}
    />
  )
}
