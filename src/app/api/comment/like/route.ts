import { setCommentLike } from '@/service/comment';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log('zzzzzzzzzz', body);
  const data = await setCommentLike(body);
  console.log('aaaaaaaaaaa', data);
  return NextResponse.json(data);
};
