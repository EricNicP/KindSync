import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'NGO') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = params;
    const donation = await Donation.findByIdAndUpdate(id, {
      status: 'ACCEPTED',
      assignedNGO: decoded.id,
      updatedAt: Date.now(),
    }, { new: true });

    if (!donation) {
      return NextResponse.json({ error: 'Donation not found' }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
