// app/api/recent-purchases/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const recentPurchases = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { items: { include: { product: true } } },
  })

  return NextResponse.json(recentPurchases.map(order => ({
    id: order.id,
    date: order.createdAt.toISOString(),
    total: order.total,
    items: order.items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
    })),
  })))
}