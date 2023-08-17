import { getCommunityList } from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, CategoryType] };
}

/** 구글맵 자동완성 검색어 데이터 가져오기 */
export const GET = async (_: NextRequest, context: Context) => {
  const {
    slug: [tag, type],
  } = context.params;
  console.log(tag, type);
  return await getCommunityList(tag, type).then((data) =>
    NextResponse.json(data),
  );
};
