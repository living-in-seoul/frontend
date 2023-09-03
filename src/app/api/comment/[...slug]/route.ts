import { NextRequest, NextResponse } from 'next/server';
import {
  deleteComment,
  getComment,
  getMoreComment,
  getUserMoreComment,
  postComment,
  putComment,
} from '@/service/comment';
import { cookies } from 'next/headers';

interface Context {
  params: { slug: string[] };
}

export const POST = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug[0];
  const body = await request.json();
  const data = await postComment(body, postId);
  return NextResponse.json(data);
};

export const GET = async (request: NextRequest, context: Context) => {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get('page');
  const token = cookies().get('accessToken');
  const postId = context.params.slug[0];
  if (page) {
    if (token) {
      const data = await getUserMoreComment(postId, page);
      const newData = data?.comments;
      return NextResponse.json(newData);
    }
    const data = await getMoreComment(postId, page);
    const newData = data?.comments;
    return NextResponse.json(newData);
  }

  const data = await getComment(postId);
  return NextResponse.json(data);
};

export const DELETE = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug[0];
  const data = await deleteComment(postId);
  return NextResponse.json(data);
};

export const PUT = async (request: NextRequest, context: Context) => {
  const commentId = context.params.slug[0];
  const body = await request.json();
  const data = await putComment(body, commentId);
  return NextResponse.json(data);
};
