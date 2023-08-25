import {
  getCommunityList,
  getCommunityListWithToken,
} from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, string] };
}

export const GET = async (req: NextRequest, context: Context) => {
  const {
    slug: [category, hashtag],
  } = context.params;

  const hashtagName = hashtag ?? '';
  const { searchParams } = req.nextUrl;
  const postType = searchParams.get('category');
  const Token = req.cookies.get('accessToken')?.value;

  if (Token) {
    return await getCommunityListWithToken(
      category,
      postType,
      hashtagName,
      Token,
    ).then((data) => NextResponse.json(data));
  }
  return await getCommunityList(category, postType, hashtagName).then((data) =>
    NextResponse.json(data),
  );
};
