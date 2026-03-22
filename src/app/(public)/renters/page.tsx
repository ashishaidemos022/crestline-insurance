import { Building } from 'lucide-react'
import ProductPageTemplate from '@/components/shared/ProductPageTemplate'

export const metadata = { title: 'Renters Insurance | Crestline Insurance' }

export default function RentersPage() {
  return (
    <ProductPageTemplate
      productName="Renters Insurance"
      tagline="Affordable protection for your personal belongings"
      description="You may not own the walls, but your belongings are yours. Crestline renters insurance protects your personal property from theft, fire, water damage, and more — starting at just $350/year. It also includes personal liability coverage in case someone is injured in your rental."
      premiumRange="$350"
      coverageTypes={[
        'Personal Property & Liability Coverage',
        'Additional Living Expenses',
        'Medical Payments to Others',
      ]}
      features={[
        'Personal property up to $30K',
        'Liability up to $100K',
        'Loss of use coverage',
        'Electronics & jewelry coverage',
        'Theft coverage off-premises',
        'No-deductible options available',
        'Bundle discounts with auto',
        'Digital policy management',
      ]}
      faqs={[
        {
          q: "Does my landlord's insurance cover my stuff?",
          a: "No. Your landlord's policy only covers the building structure, not your personal belongings. Renters insurance fills this gap.",
        },
        {
          q: 'Is renters insurance required?',
          a: "Many landlords now require tenants to carry renters insurance. Even if not required, it's one of the best values in insurance.",
        },
        {
          q: 'What does it cover if my apartment floods?',
          a: 'If the water damage is from a covered event (like a burst pipe), your policy covers repairs to your belongings and additional living expenses.',
        },
        {
          q: 'Can I bundle with auto insurance?',
          a: 'Yes — bundling renters and auto saves you up to 10% on both policies.',
        },
      ]}
      icon={<Building className="w-8 h-8 text-white" />}
    />
  )
}
