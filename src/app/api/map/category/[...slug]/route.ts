import { getCommunityList } from '@/service/comunity';
import { getBoardListAll, getBoardListByCat } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  //동도 타입 있으면 바꾸기
  params: { slug: [string, guchung, string] };
}

export const GET = async (req: NextRequest, context: Context) => {
  const {
    slug: [category, gu, dong],
  } = context.params;

  if (category !== '전체') {
    console.log('ss');
    return getBoardListByCat(category, gu, dong).then((data) =>
      NextResponse.json(data),
    );
  } else {
    console.log('ㅎㅇ');
    return getCommunityList('All', null, null).then((data) =>
      NextResponse.json(data),
    );
  }
};
