import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded: any = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const { items, pickupDetails } = await req.json();

    const donation = await prisma.donation.create({
      data: {
        donorId: decoded.id,
        items: JSON.stringify(items),
        pickupAddress: pickupDetails.address,
        pickupTime: pickupDetails.scheduledTime ? new Date(pickupDetails.scheduledTime) : null,
        pickupPhone: pickupDetails.contactPhone,
        status: 'PENDING',
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded: any = verifyToken(token);
    
    let donations;
    if (decoded.role === 'DONOR') {
      donations = await prisma.donation.findMany({
        where: { donorId: decoded.id },
        orderBy: { createdAt: 'desc' },
      });
    } else if (decoded.role === 'NGO') {
      donations = await prisma.donation.findMany({
        where: {
          OR: [
            { status: 'PENDING' },
            { ngoId: decoded.id }
          ]
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      donations = await prisma.donation.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    // Parse items back from JSON string
    const parsedDonations = donations.map(d => ({
      ...d,
      items: d.items ? JSON.parse(d.items) : [],
    }));

    return NextResponse.json(parsedDonations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
