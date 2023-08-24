import {
  getCommunityList,
  getCommunityListWithToken,
} from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  //동도 타입 있으면 바꾸기
  params: { slug: [string, guchung, string] };
}

export const GET = async (req: NextRequest, context: Context) => {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category') ?? 'All';
  const gu = searchParams.get('gu');
  const dong = searchParams.get('dong');
  const Token = req.cookies.get('accessToken')?.value;

  if (Token) {
    return await getCommunityListWithToken(category, 'newer', '', Token).then(
      (data) => NextResponse.json(data),
    );
  }

  return await getCommunityList(category, 'newer', '').then((data) =>
    NextResponse.json(data),
  );
};
