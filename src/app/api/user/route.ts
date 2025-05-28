import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const user = await prisma.users.findFirst({
      select: {
        id: true,
        username: true,
        email: true,
        points_balance: true,
        firebase_uid: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const transformedUser = {
      id: user.id,
      name: user.username,
      email: user.email,
      balance: Number(user.points_balance),
      firebase_uid: user.firebase_uid,
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
