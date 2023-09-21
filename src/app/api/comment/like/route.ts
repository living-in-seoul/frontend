import { setCommentLike } from '@/service/comment';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  request: NextRequest,
): Promise<Response | NextResponse> => {
  const body = await request.json();
  const data = await setCommentLike(body);
  return NextResponse.json(data);
};
