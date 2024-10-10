// app/api/payment-methods/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const paymentMethods = await prisma.paymentMethod.findMany({
    where: { userId: session.user.id },
  })

  return NextResponse.json(paymentMethods.map(pm => ({
    id: pm.id,
    type: pm.type,
    last4: pm.last4,
  })))
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { type, last4 } = await request.json()

  const newPaymentMethod = await prisma.paymentMethod.create({
    data: {
      userId: session.user.id,
      type,
      last4,
    },
  })

  return NextResponse.json(newPaymentMethod)
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await request.json()

  await prisma.paymentMethod.delete({
    where: { id, userId: session.user.id },
  })

  return NextResponse.json({ success: true })
}