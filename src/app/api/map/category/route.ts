import { getCommunityList } from '@/service/comunity';
import { getBoardListByGu } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, guchung] };
}
export const GET = async (req: NextRequest, context: Context) => {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category') ?? 'All';
  const gu = searchParams.get('gu');
  console.log(category, gu);

  if (gu === 'null') {
    const list = await getCommunityList(category, 'newer', '');
    return NextResponse.json(list);
  } else {
    const list = await getBoardListByGu(category, gu);
    return NextResponse.json(list);
  }
};
