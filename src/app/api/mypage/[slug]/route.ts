import { getMypostScrapPost } from '@/service/board';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { slug: string };
}

export const GET = async (req: NextRequest, context: Context) => {
  const category = context.params.slug;
  const { searchParams } = req.nextUrl;
  const page = searchParams.get('page');
  const data = await getMypostScrapPost(category, page);
  return NextResponse.json(data);
};
