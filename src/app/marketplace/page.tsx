// app/marketplace/page.tsx
import dynamic from 'next/dynamic'

const MarketplaceWrapper = dynamic(() => import('./MarketplaceWrapper'), {
  ssr: false,
})

export const metadata = {
  title: 'Marketplace | EG Business',
  description: 'Browse and purchase high-quality agricultural products from African farmers.',
}

export default function MarketplacePage() {
  return <MarketplaceWrapper />
}