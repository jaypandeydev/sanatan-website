import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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