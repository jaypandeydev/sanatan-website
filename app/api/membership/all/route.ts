import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken, unauthorizedResponse } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = verifyAdminToken(req);
  if (!token) return unauthorizedResponse();

  try {
    const members = await prisma.members.findMany({
      orderBy: { id: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        membershipType: true,
        mobileNumber: true,
        residentialAddress: true,
      },
    });
    return NextResponse.json({ members });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch members." }, { status: 500 });
  }
} 