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
  console.log(category, gu);

  const fetchCommunityList = Token
    ? () => getCommunityListWithToken(category, 'newer', '', Token)
    : () => getCommunityList(category, 'newer', '');
  const list = await fetchCommunityList();

  if (gu !== 'null') {
    const filteredData = list.result.filter(
      (data: any) => data.location.gu === gu,
    );
    const newData = {
      ...list,
      result: filteredData,
    };
    return NextResponse.json(newData);
  } else {
    return NextResponse.json(list);
  }
};
