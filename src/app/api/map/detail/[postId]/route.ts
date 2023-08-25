import { getPlaceByPostId } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { postId: string };
}

/** PlaceId로 place detail 가져오기*/
export const GET = async (_: NextRequest, context: Context) => {
  const { postId } = context.params;
  const result = getPlaceByPostId(postId).then((data) =>
    NextResponse.json(data),
  );
  return result;
};
