import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const officials = await prisma.official.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json({ officials });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const official = await prisma.official.create({ data });
  return NextResponse.json({ official });
} 