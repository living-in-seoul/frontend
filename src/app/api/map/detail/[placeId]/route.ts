import { getPlaceByPlaceId } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { placeId: string };
}

/** 구글맵 자동완성 검색어 데이터 가져오기 */
export const GET = async (_: NextRequest, context: Context) => {
  const { placeId } = context.params;
  return await getPlaceByPlaceId(placeId).then((data) =>
    NextResponse.json(data.result),
  );
};
