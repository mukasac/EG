// app/api/cart/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  })

  return NextResponse.json(cart?.items || [])
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productId, quantity } = await request.json()

  const updatedCart = await prisma.cart.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      items: {
        create: { productId, quantity }
      }
    },
    update: {
      items: {
        upsert: {
          where: {
            cartId_productId: {
              cartId: session.user.id,
              productId
            }
          },
          create: { productId, quantity },
          update: { quantity: { increment: quantity } }
        }
      }
    },
    include: { items: { include: { product: true } } },
  })

  return NextResponse.json(updatedCart.items)
}