import { NextRequest, NextResponse } from 'next/server';
import { postComment } from '@/service/comment';
import { revalidatePath } from 'next/cache';

interface Context {
  params: { slug: string };
}

export const POST = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug;
  const body = await request.json();
  const data = await postComment(body, postId);

  if (data.status === 200) {
    console.log('간다잇!');
    revalidatePath(`https://seoulvival.com:8080/posts/get/${postId}`);
  }
  const response = NextResponse.json(data);
  return response;
};
