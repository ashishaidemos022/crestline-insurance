import { Heart } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Life Insurance | Crestline Insurance' }

export default function LifePage() {
  return (
    <ProductPageTemplate
      productName="Life Insurance"
      tagline="Term Life Coverage to protect what matters most"
      description="Crestline offers term life insurance with coverage amounts from $500,000 to $750,000. Our straightforward policies provide financial security for your loved ones with no complicated riders or hidden exclusions. Premiums range from $850 to $950 per year depending on your age, health, and coverage amount."
      premiumRange="$850"
      coverageTypes={[
        'Term Life Coverage ($500K)',
        'Term Life Coverage ($750K)',
        '10, 20, and 30-year terms available',
      ]}
      features={[
        'No medical exam for healthy applicants',
        'Guaranteed renewable',
        'Level premiums for term length',
        'Accelerated death benefit rider',
        'Waiver of premium if disabled',
        'Conversion option available',
        'Online application in minutes',
        'Instant coverage decisions',
      ]}
      faqs={[
        {
          q: 'How much life insurance do I need?',
          a: "A common rule is 10-12x your annual income. Our agents can help you calculate the right amount based on your debts, income, and family situation.",
        },
        {
          q: 'What is the difference between term and whole life?',
          a: "Term life covers you for a specific period (10-30 years) at a fixed premium. It's simpler and more affordable than whole life for most families.",
        },
        {
          q: 'Do I need a medical exam?',
          a: 'For many applicants under 60 in good health, we can issue coverage without a physical exam based on your health questionnaire.',
        },
        {
          q: 'Can I change my coverage amount later?',
          a: 'You may be able to convert to a permanent policy or purchase additional coverage, subject to underwriting.',
        },
      ]}
      icon={<Heart className="w-8 h-8 text-white" />}
    />
  )
}
