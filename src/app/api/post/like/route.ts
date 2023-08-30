import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { setDetailLike } from '@/service/comment';

export const POST = async (request: NextRequest) => {
  const postId = await request.json();
  const data = await setDetailLike(postId);
  return NextResponse.json(data);
};
