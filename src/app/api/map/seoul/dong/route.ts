import dong from '@/../public/dong.json';
import { guMapping } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url, 'http://localhost'); // 기본 URL이 필요하므로 임의로 추가
  const guName = searchParams.get('guName');

  if (!guName) {
    return NextResponse.json({ error: '구 이름이 필요합니다.' });
  }

  const filteredDong = dong.features.filter((feature) => {
    const guCode = feature.properties.COL_ADM_SE;
    return guMapping[guCode] === guName;
  });

  if (filteredDong.length === 0) {
    return NextResponse.json({
      error: `해당하는 행정동 정보가 없습니다: ${guName}`,
    });
  }

  return NextResponse.json({ features: filteredDong });
};
