import { fetchCommunity } from '@/actions/fetchCommunity';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category') || 'All';
  const tags = searchParams.get('tags');
  const ordertype = (searchParams.get('ordertype') || 'newer') as SelectPopType;
  const page = searchParams.get('page') || 1;

  const res = await fetchCommunity({
    category,
    tags,
    ordertype,
    page,
    limit: 10,
  }).then((data) => data);
  return NextResponse.json(res);
};
