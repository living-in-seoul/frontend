import { NextRequest, NextResponse } from 'next/server';
import { setDetailScrap } from '@/service/comment';

export const POST = async (request: NextRequest) => {
  const postId = await request.json();
  const data = await setDetailScrap(postId);
  return NextResponse.json(data);
};
