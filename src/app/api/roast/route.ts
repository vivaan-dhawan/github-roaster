import { NextResponse } from 'next/server';
import { fetchGitHubStats } from '@/lib/github';
import { generateRoast } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const stats = await fetchGitHubStats(username);
    const roast = await generateRoast(stats);

    return NextResponse.json({
      stats,
      roast
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}