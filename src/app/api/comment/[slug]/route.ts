import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { postComment } from '@/service/comment';

interface Context {
  params: { slug: string };
}

export const POST = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug;
  const body = await request.json();
  const data = await postComment(body, postId);
  const response = NextResponse.json(data);
  return response;
};
