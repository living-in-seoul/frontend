import { getCommunityList } from '@/service/comunity';
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
  return await getCommunityList(category, postType, hashtagName).then((data) =>
    NextResponse.json(data),
  );
};
