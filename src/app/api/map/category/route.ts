import {
  getCommunityList,
  getCommunityListWithToken,
} from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, guchung] };
}

//서울시 전체일 경우 추가하기 (gu null)

export const GET = async (req: NextRequest, context: Context) => {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category') ?? 'All';
  const gu = searchParams.get('gu');
  const Token = req.cookies.get('accessToken')?.value;

  if (Token) {
    const list = await getCommunityListWithToken(category, 'newer', '', Token);
    if (gu) {
      const data = list.result.filter((data: any) => data.location.gu === gu);
      return NextResponse.json(data);
    } else {
      return NextResponse.json(list.result);
    }
  }

  return await getCommunityList(category, 'newer', '').then((data) =>
    NextResponse.json(data),
  );
};
