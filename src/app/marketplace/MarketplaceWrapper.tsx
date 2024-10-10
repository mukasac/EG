// app/marketplace/MarketplaceWrapper.tsx
'use client'

import { useSession } from 'next-auth/react'
import Marketplace from './Marketplace'

export default function MarketplaceWrapper() {
  const { data: session } = useSession()

  return <Marketplace session={session} />
}