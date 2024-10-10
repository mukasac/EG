// src/app/api/auth/dev-login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { signIn } from 'next-auth/react'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse(null, { status: 404 })
  }

  const { email } = await req.json()

  try {
    await signIn('credentials', { 
      redirect: false, 
      email: email,
      password: 'dev-password' // Use a placeholder password
    })
    return NextResponse.json({ message: 'Signed in successfully' })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to sign in' }, { status: 400 })
  }
}