import { NextRequest, NextResponse } from 'next/server';
import {
  deleteComment,
  getComment,
  postComment,
  putComment,
} from '@/service/comment';

interface Context {
  params: { slug: string[] };
}

export const POST = async (
  request: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const postId = context.params.slug[0];
  const body = await request.json();
  const data = await postComment(body, postId);
  return NextResponse.json(data);
};

export const GET = async (
  request: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get('page') ?? '1';
  const postId = context.params.slug[0];
  const data = await getComment(postId, page);
  return NextResponse.json(data);
};

export const DELETE = async (
  _: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const postId = context.params.slug[0];
  const data = await deleteComment(postId);
  return NextResponse.json(data);
};

export const PUT = async (
  request: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const commentId = context.params.slug[0];
  const body = await request.json();
  const data = await putComment(body, commentId);
  return NextResponse.json(data);
};
