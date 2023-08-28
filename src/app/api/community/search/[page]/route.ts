import { NextRequest, NextResponse } from 'next/server';
interface Context {
  params: { page: number };
}
export const GET = async (req: NextRequest, context: Context) => {
  const { searchParams } = req.nextUrl;
  const { page } = context.params;
  console.log(page);
  const search = searchParams.get('search') ?? '';
  const Keyword = encodeURIComponent(search);
  try {
    const res = await fetch(
      // `${process.env.NEXT_PUBLIC_SERVER}/search?page=1&size=10&keword=${search}`,
      `${process.env.NEXT_PUBLIC_SERVER}/search?page=${page}&size=10&keyword=${Keyword}`,
      { next: { revalidate: 0 } },
    )
      .then<ResponseRegister>((res) => res.json())
      .then((res) => res.result);
    console.log(res);
    if (res.length === 0) {
      return NextResponse.json([]);
    }

    return NextResponse.json(res);
  } catch (error) {
    console.log('error', error);
  }
};
