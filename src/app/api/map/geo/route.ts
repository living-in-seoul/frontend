import { NextRequest, NextResponse } from 'next/server';
import seoulData from '@/../public/seoul.json';
import dongData from '@/../public/dong.json';
const turf = require('@turf/turf');
/** 구글맵 자동완성 검색어 데이터 가져오기 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get('lat') ?? '36';
  const lng = searchParams.get('lng') ?? '127';
  let selectedPoint = turf.point([parseFloat(lng), parseFloat(lat)]);
  let gu = '';
  let dong = '';

  for (let district of seoulData.features) {
    let polygon = turf.polygon(district.geometry.coordinates);

    let selectedPoint = turf.point([parseFloat(lng), parseFloat(lat)]);

    for (let district of seoulData.features) {
      let polygon = turf.polygon(district.geometry.coordinates);

      if (turf.booleanPointInPolygon(selectedPoint, polygon)) {
        console.log(
          '선택된 좌표는 ' + district.properties.SGG_NM + '에 위치해 있습니다.',
        );
      }
    }

    for (let district of dongData.features) {
      // let polygon = turf.polygon(district.geometry.coordinates);

      if (turf.booleanPointInPolygon(selectedPoint, district.geometry)) {
        console.log(
          '선택된 좌표는 ' + district.properties.EMD_NM + '에 위치해 있습니다.',
        );
      }
    }

    return NextResponse.json({ gu, dong });
  }
};
