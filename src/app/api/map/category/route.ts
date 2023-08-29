import {
  getCommunityList,
  getCommunityListWithToken,
} from '@/service/comunity';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, guchung] };
}

export const GET = async (req: NextRequest, context: Context) => {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category') ?? 'All';
  const gu = searchParams.get('gu');
  const Token = req.cookies.get('accessToken')?.value;

  if (Token) {
    const list = await getCommunityListWithToken(category, 'newer', '', Token);
    if (gu) {
      const data = list.result.filter((data: any) => data.location.gu === gu);
      const newData = {
        ...list,
        result: data,
      };
      return NextResponse.json(newData);
    } else {
      return NextResponse.json(list);
    }
  }

  return await getCommunityList(category, 'newer', '').then((data) =>
    NextResponse.json(data),
  );
};
