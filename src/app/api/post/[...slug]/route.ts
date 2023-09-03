import { getBoard, getHotBoard, getUserBoard } from '@/service/board';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: string[] };
}

export const GET = async (request: NextRequest, context: Context) => {
  const slugLength = context.params.slug.length;
  const token = cookies().get('accessToken');
  if (slugLength === 1) {
    if (token) {
      const postId = context.params.slug[0];
      const data = await getUserBoard(postId).then((data) => data?.result);
      const response = {
        hasLiked: data?.hasLiked,
        hasScrapped: data?.hasScrapped,
        likeSize: data?.post.likeSize,
        scrapSize: data?.post.scrapSize,
      };
      return NextResponse.json(response);
    }
    const postId = context.params.slug[0];
    const data = await getBoard(postId).then((data) => data?.result);
    const response = {
      hasLiked: data?.hasLiked,
      hasScrapped: data?.hasScrapped,
      likeSize: data?.post.likeSize,
      scrapSize: data?.post.scrapSize,
    };
    return NextResponse.json(response);
  }
  if (slugLength === 2) {
    const {
      slug: [category, hashtag],
    } = context.params;
    const data = await getHotBoard(category, hashtag);
    return NextResponse.json(data);
  }
};
