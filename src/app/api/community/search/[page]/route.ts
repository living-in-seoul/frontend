import { categoryKO } from '@/utils/utilFunc';
import { NextRequest, NextResponse } from 'next/server';
interface Context {
  params: { page: number };
}
export const GET = async (
  req: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const { searchParams } = req.nextUrl;
  const { page } = context.params;

  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? '';

  const Keyword = encodeURIComponent(search);

  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_SERVER}/search?page=1&size=10&keword=${search}`,
      `${
        process.env.NEXT_PUBLIC_SERVER
      }/search?page=${page}&size=10&keyword=${Keyword}&category=${categoryKO(
        category,
      )}`,
      { next: { revalidate: 0 } },
    )
      .then<ResponseRegister>((res) => res.json())
      .then((res) => res.result);
    if (res.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(res);
  } catch (error) {
    console.log('error', error);
  }
  return NextResponse.json('error');
};
