import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { userId, isVerified } = await req.json();

    const user = await User.findByIdAndUpdate(userId, {
      'ngoDetails.isVerified': isVerified,
    }, { new: true });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `NGO ${isVerified ? 'verified' : 'unverified'} successfully` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const decoded: any = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ngos = await User.find({ role: 'NGO' });
    return NextResponse.json(ngos);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
