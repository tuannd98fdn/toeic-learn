import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Database initializing' }, { status: 503 });
    }

    const email = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        mistakes: true,
        progress: true,
        studyPlan: true,
        streak: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        mistakes: {},
        progress: {},
        studyPlan: null,
        streak: null,
        profile: null,
      });
    }

    // Map mistakes to key-value format matching client storage
    const mistakesMap: Record<string, any> = {};
    user.mistakes.forEach((m) => {
      let meta = {};
      if (m.rawMeta) {
        try {
          meta = JSON.parse(m.rawMeta);
        } catch {}
      }
      mistakesMap[m.itemKey] = {
        type: m.type,
        testId: m.testId || undefined,
        part: m.part || undefined,
        questionId: m.questionId || undefined,
        timestamp: m.createdAt.getTime(),
        ...meta,
      };
    });

    // Map progress
    const progressMap: Record<string, boolean> = {};
    user.progress.forEach((p) => {
      progressMap[p.progressKey] = p.completed;
    });

    // Map study plan
    let studyPlanData = null;
    if (user.studyPlan?.planData) {
      try {
        studyPlanData = JSON.parse(user.studyPlan.planData);
      } catch {}
    }

    // Map streak
    let streakData = null;
    if (user.streak) {
      let historyDays: string[] = [];
      if (user.streak.historyDays) {
        try {
          historyDays = JSON.parse(user.streak.historyDays);
        } catch {}
      }
      streakData = {
        currentStreak: user.streak.currentStreak,
        bestStreak: user.streak.bestStreak,
        lastStudyDate: user.streak.lastStudyDate,
        historyDays,
      };
    }

    return NextResponse.json({
      mistakes: mistakesMap,
      progress: progressMap,
      studyPlan: studyPlanData,
      streak: streakData,
      profile: {
        targetScore: user.targetScore,
        examDate: user.examDate,
      },
    });
  } catch (error: any) {
    console.error('Error in GET /api/sync:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Database initializing' }, { status: 503 });
    }

    const email = session.user.email;
    const name = session.user.name || null;
    const image = session.user.image || null;

    const body = await req.json();
    const { mistakes, progress, studyPlan, streak, profile } = body;

    // 1. Upsert User
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        name,
        image,
        targetScore: profile?.targetScore || '750+',
        examDate: profile?.examDate || null,
      },
      update: {
        name: name || undefined,
        image: image || undefined,
        targetScore: profile?.targetScore || undefined,
        examDate: profile?.examDate || undefined,
      },
    });

    // 2. Sync Mistakes
    if (mistakes && typeof mistakes === 'object') {
      const entries = Object.entries(mistakes);
      for (const [itemKey, itemVal] of entries) {
        const val = itemVal as any;
        const metaStr = val ? JSON.stringify(val) : null;

        await prisma.mistake.upsert({
          where: {
            userId_itemKey: {
              userId: user.id,
              itemKey,
            },
          },
          create: {
            userId: user.id,
            itemKey,
            type: val?.type || 'vocabulary',
            testId: val?.testId || null,
            part: val?.part || null,
            questionId: val?.questionId || null,
            rawMeta: metaStr,
          },
          update: {
            type: val?.type || 'vocabulary',
            testId: val?.testId || null,
            part: val?.part || null,
            questionId: val?.questionId || null,
            rawMeta: metaStr,
          },
        });
      }
    }

    // 3. Sync Progress
    if (progress && typeof progress === 'object') {
      const entries = Object.entries(progress);
      for (const [progressKey, completed] of entries) {
        await prisma.userProgress.upsert({
          where: {
            userId_progressKey: {
              userId: user.id,
              progressKey,
            },
          },
          create: {
            userId: user.id,
            progressKey,
            completed: Boolean(completed),
          },
          update: {
            completed: Boolean(completed),
          },
        });
      }
    }

    // 4. Sync Study Plan
    if (studyPlan) {
      await prisma.studyPlan.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          planData: JSON.stringify(studyPlan),
        },
        update: {
          planData: JSON.stringify(studyPlan),
        },
      });
    }

    // 5. Sync Streak
    if (streak) {
      await prisma.userStreak.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          currentStreak: streak.currentStreak || 0,
          bestStreak: streak.bestStreak || 0,
          lastStudyDate: streak.lastStudyDate || null,
          historyDays: streak.historyDays ? JSON.stringify(streak.historyDays) : null,
        },
        update: {
          currentStreak: streak.currentStreak || undefined,
          bestStreak: streak.bestStreak || undefined,
          lastStudyDate: streak.lastStudyDate || undefined,
          historyDays: streak.historyDays ? JSON.stringify(streak.historyDays) : undefined,
        },
      });
    }

    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in POST /api/sync:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
