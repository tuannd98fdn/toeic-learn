import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const testId = searchParams.get('testId');
  const questionId = searchParams.get('questionId');

  if (!testId || !questionId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const discussions = await prisma.questionDiscussion.findMany({
      where: { testId, questionId },
      orderBy: { createdAt: 'asc' }, // Sắp xếp theo thời gian hỏi
      include: { user: { select: { name: true, image: true } } },
      take: 20,
    });

    return NextResponse.json(discussions);
  } catch (err) {
    console.error('Error fetching community discussions:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
