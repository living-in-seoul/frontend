import { NextRequest, NextResponse } from 'next/server';
import seoulData from '@/../public/seoul.json';
import dongData from '@/../public/dong.json';
const turf = require('@turf/turf');

/** 맵 센터 구/동 계산해서 가져오기*/
export const GET = async (req: NextRequest) => {
  let selectedPolygon;
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get('lat') ?? '36';
  const lng = searchParams.get('lng') ?? '127';
  let selectedPoint = turf.point([parseFloat(lng), parseFloat(lat)]);
  let gu = '';
  let dong = '';

  for (let district of seoulData.features) {
    let polygon = turf.polygon(district.geometry.coordinates);

    if (turf.booleanPointInPolygon(selectedPoint, polygon)) {
      gu = district.properties.SGG_NM;
      selectedPolygon = district.geometry.coordinates[0];
      break;
    }
  }
  for (let district of dongData.features) {
    if (turf.booleanPointInPolygon(selectedPoint, district.geometry)) {
      dong = district.properties.EMD_NM;
      break;
    }
  }

  return NextResponse.json({ gu, dong, geometry: selectedPolygon });
};
