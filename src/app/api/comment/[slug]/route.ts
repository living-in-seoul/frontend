import { NextRequest, NextResponse } from 'next/server';
import { postComment } from '@/service/comment';
import { revalidatePath } from 'next/cache';
import { getBoard } from '@/service/board';
interface Context {
  params: { slug: string };
}

export const POST = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug;
  const body = await request.json();
  const data = await postComment(body, postId);
  return NextResponse.json(data);
};

export const GET = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug;
  const data = await getBoard(postId);
  const newData = data?.result.comments;
  return NextResponse.json(newData);
};
