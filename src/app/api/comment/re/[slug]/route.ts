import { NextRequest, NextResponse } from 'next/server';
import {
  deleteReComment,
  putReComment,
  rePostComment,
} from '@/service/comment';

interface Context {
  params: { slug: string };
}

export const POST = async (request: NextRequest, context: Context) => {
  const commentId = context.params.slug;
  const body = await request.json();
  const data = await rePostComment(body, commentId);
  return NextResponse.json(data);
};

export const PUT = async (request: NextRequest, context: Context) => {
  const reCommentId = context.params.slug;
  const body = await request.json();
  const data = await putReComment(body, reCommentId);
  return NextResponse.json(data);
};

export const DELETE = async (_: NextRequest, context: Context) => {
  const reCommentId = context.params.slug;
  const data = await deleteReComment(reCommentId);
  return NextResponse.json(data);
};
