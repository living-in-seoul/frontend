import { getPostByPostId } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { postId: string };
}

/** PlaceId로 place detail 가져오기*/
export const GET = async (_: NextRequest, context: Context) => {
  const { postId } = context.params;
  return getPostByPostId(postId).then((data) => {
    console.log(data.result.post);
    NextResponse.json(data);
  });
};
