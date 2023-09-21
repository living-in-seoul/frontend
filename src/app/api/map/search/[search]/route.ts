import { getPlacesAutoComplete } from '@/service/map';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { search: string };
}

/** 구글맵 자동완성 검색어 데이터 가져오기 */
export const GET = async (
  _: NextRequest,
  context: Context,
): Promise<Response | NextResponse> => {
  const { search } = context.params;
  return getPlacesAutoComplete(search).then((data) => NextResponse.json(data));
};
