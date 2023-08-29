import { NextRequest, NextResponse } from 'next/server';
// import { point } from '@turf/helpers';
// import * as turf from '@turf/turf';

/** 구글맵 자동완성 검색어 데이터 가져오기 */
export const GET = async (req: NextRequest) => {
  // const rawData = require('/public/seoul.json');
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get('lat') ?? '36';
  const lng = searchParams.get('lng') ?? '127';

  // const center = turf.point([parseFloat(lat), parseFloat(lng)]);

  // for (const feature of rawData.features) {
  //   if (turf.booleanPointInPolygon(center, feature)) {
  //     console.log('이 좌표는', feature.properties.name, '에 위치해 있습니다.');
  //     break;
  //   }
  // }

  return NextResponse.json({ lat, lng });
};
