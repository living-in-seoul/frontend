import { getHomeList, getHomeListWithToken } from '@/service/home';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { category: string };
}

export const GET = async (req: NextRequest, context: Context) => {
  const { category } = context.params;
  const { searchParams } = req.nextUrl;
  const hashtagName = searchParams.get('hashtag') ?? '';
  const Token = req.cookies.get('accessToken')?.value;
  const postType = searchParams.get('postType') ?? 'newer';
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
