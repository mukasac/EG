// app/api/courses/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const courses = await prisma.userCourse.findMany({
    where: { userId: session.user.id },
    include: { course: true },
  })

  return NextResponse.json(courses.map(uc => ({
    id: uc.course.id,
    title: uc.course.title,
    progress: uc.progress,
  })))
}