import { getBoardListByGu } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: [string, guchung] };
}
export const GET = async (req: NextRequest, context: Context) => {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category') ?? 'All';
  const gu = searchParams.get('gu');

  const list = await getBoardListByGu(category, gu);
  return NextResponse.json(list);
};
