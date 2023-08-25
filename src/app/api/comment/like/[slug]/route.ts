import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { setDetailLike } from '@/service/comment';
interface Context {
  params: { slug: string };
}

export const POST = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug;
  const data = await setDetailLike(postId);
  return NextResponse.json(data);
};
