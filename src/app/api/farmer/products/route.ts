import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'farmer') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  try {
    const products = await prisma.product.findMany({
      where: { farmerId: session.user.id },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'farmer') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  try {
    const { name, category, subcategory, price, image } = await req.json();
    const product = await prisma.product.create({
      data: {
        name,
        category,
        subcategory,
        price: parseFloat(price),
        image,
        farmerId: session.user.id,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'farmer') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  try {
    const { id, name, category, subcategory, price, image } = await req.json();
    const product = await prisma.product.update({
      where: { id, farmerId: session.user.id },
      data: { name, category, subcategory, price: parseFloat(price), image },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'farmer') {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    await prisma.product.delete({
      where: { id, farmerId: session.user.id },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}