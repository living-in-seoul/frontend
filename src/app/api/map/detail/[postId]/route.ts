import { getPostByPostId } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { postId: string };
}

/** PlaceId로 place detail 가져오기*/
export const GET = async (
  _: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const { postId } = context.params;
  const result = await getPostByPostId(postId);
  return NextResponse.json(result);
};
