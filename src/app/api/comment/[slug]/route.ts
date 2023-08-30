import { NextRequest, NextResponse } from 'next/server';
import {
  deleteComment,
  getComment,
  postComment,
  putComment,
} from '@/service/comment';

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
  const data = await getComment(postId);
  const newData = data?.comments;
  return NextResponse.json(newData);
};

export const DELETE = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug;
  const data = await deleteComment(postId);
  const newData = data?.comments;
  return NextResponse.json(newData);
};

export const PUT = async (request: NextRequest, context: Context) => {
  const commentId = context.params.slug;
  const body = await request.json();
  const data = await putComment(body, commentId);
  return NextResponse.json(data);
};
