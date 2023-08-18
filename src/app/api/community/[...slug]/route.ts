import { getCommunityList } from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, CategoryType] };
}

export const GET = async (_: NextRequest, context: Context) => {
  const {
    slug: [category, type],
  } = context.params;

  return await getCommunityList(category).then((data) =>
    NextResponse.json(data),
  );
};
