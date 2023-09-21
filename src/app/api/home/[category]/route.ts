import {
  getHomeHomeTownPostList,
  getHomeList,
  getHomeListWithToken,
  getHomeReviewPostList,
} from '@/service/home';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { category: string };
}

export const GET = async (
  req: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const { category } = context.params;
  const { searchParams } = req.nextUrl;
  const hashtagName = searchParams.get('hashtag') ?? '';
  const Token = req.cookies.get('accessToken')?.value;
  const postType = searchParams.get('postType') ?? 'newer';

  if (category === 'reviews') {
    return await getHomeReviewPostList(hashtagName).then((res) =>
      NextResponse.json(res),
    );
  }
  if (category === 'hometown') {
    return await getHomeHomeTownPostList(hashtagName).then((res) =>
      NextResponse.json(res),
    );
  }

  if (Token) {
    return await getHomeListWithToken(
      category,
      postType,
      hashtagName,
      Token,
    ).then((data) => NextResponse.json(data));
  }
  return await getHomeList(category, postType, hashtagName).then((data) =>
    NextResponse.json(data),
  );
};
