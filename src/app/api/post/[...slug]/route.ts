import { getHotBoard, getUserBoard } from '@/service/board';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: string[] };
}

export const GET = async (
  _: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const slugLength = context.params.slug.length;
  if (slugLength === 1) {
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
  if (slugLength === 2) {
    const {
      slug: [category, hashtag],
    } = context.params;
    const data = await getHotBoard(category, hashtag);
    return NextResponse.json(data);
  }
  return NextResponse.json('error');
};
