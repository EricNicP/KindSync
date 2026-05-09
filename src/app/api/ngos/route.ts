import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const ngos = await prisma.user.findMany({
      where: {
        role: 'NGO'
      },
      select: {
        id: true,
        name: true,
        ngoDescription: true,
        ngoWebsite: true,
        address: true,
        ngoIsVerified: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(ngos);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
