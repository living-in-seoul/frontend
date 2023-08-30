import { getBoard } from '@/service/board';
import { getRefreshToken } from '@/service/token';
import { getProfile } from '@/service/user';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: string };
}

export const GET = async (request: NextRequest, context: Context) => {
  const postId = context.params.slug;
  const data = await getBoard(postId);
  const likeSize = data?.result.post.likeSize;
  const hasLiked = data?.result.hasLiked;
  const scrapSize = data?.result.post.scrapSize;

  const response = { likeSize, hasLiked, scrapSize };
  return NextResponse.json(response);
};
