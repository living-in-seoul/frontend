import { getYouth } from '@/service/youth';
import { NextRequest, NextResponse } from 'next/server';

/** 구글맵 자동완성 검색어 데이터 가져오기 */
export const GET = async () => {
  console.log('--------------------------------------');
  const xmlData = await getYouth();
  console.log('in route에서의 data', xmlData);

  // xml2js.parse(xmlData, (err: any, result: any) => {
  //   if (err) {
  //     console.error('에러니껴?', err);
  //   } else {
  //     console.log('여기니껴?', result); // 변환된 JavaScript 객체 출력
  //   }
  // });
  // console.log('나오니껴', xmlData);
  return NextResponse.json('hi');
};
