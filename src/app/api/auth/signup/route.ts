import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, farmName, farmLocation, profileImage, bio } = await req.json();

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate role
    if (role !== 'user' && role !== 'farmer') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Additional validation for farmers
    if (role === 'farmer' && !farmName) {
      return NextResponse.json({ error: 'Farm name is required for farmers' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        farmName: role === 'farmer' ? farmName : null,
        farmLocation: role === 'farmer' ? farmLocation : null,
        profileImage,
        bio,
      },
    });

    // Remove the password from the response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`, user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}