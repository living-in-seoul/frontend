import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAndRefreshToken } from '@/service/token';
interface Context {
  params: { category: 'activity' | 'hashtag' };
}

export const GET = async (request: NextRequest, res: any) => {
  const Token = cookies().get('accessToken');
  const verify = await verifyAndRefreshToken();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  for (let i = 0; i < 5; i++) {
    res.write(`data: Hello seq ${i}\n\n`);
  }
  res.end('done\n');
};
