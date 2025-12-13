import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(()=>({}));
    const title = typeof body?.title === 'string' ? body.title.trim() : 'New Chat';

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const newChat = await prisma.chatSession.create({
      data: { title: title || 'New Chat', userId: session.user.id },
    });

    return NextResponse.json({ sessionId: newChat.id }, { status: 201 });
  } catch (err) {
    console.error('[/api/new-chat] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
