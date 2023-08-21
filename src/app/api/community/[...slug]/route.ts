import { getCommunityList } from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, CategoryType] };
}

export const GET = async (req: NextRequest, context: Context) => {
  const {
    slug: [category, hashtag],
  } = context.params;

  const { searchParams } = req.nextUrl;
  const postType = searchParams.get('category');
  return await getCommunityList(category).then((data) =>
    NextResponse.json(data),
  );
};
