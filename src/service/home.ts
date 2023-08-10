const DATA_AREA = [
  '강남역',
  '건대입구역',
  '고덕역',
  '고속터미널역',
  '교대역',
  '구로디지털단지역',
  '구로역',
  '군자역',
  '남구로역',
  '대림역',
  '동대문역',
  '뚝섬역',
  '미아사거리역',
  '발산역',
  '북한산우이역',
  '사당역',
  '삼각지역',
  '서울대입구역',
  '서울식물원·마곡나루역',
  '서울역',
  '선릉역',
  '성신여대입구역',
  '수유역',
  '신논현역·논현역',
  '신도림역',
  '신림역',
  '신촌·이대역',
  '양재역',
  '역삼역',
  '연신내역',
  '오목교역·목동운동장',
  '왕십리역',
  '용산역',
  '이태원역',
  '장지역',
  '장한평역',
  '천호역',
  '총신대입구(이수)역',
  '충정로역',
  '합정역',
  '혜화역',
  '홍대입구역 9번 출구',
  '회기역',
];

export const getHomeDatas = async () => {
  const promises = DATA_AREA.map((region) => {
    return fetch(
      `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUL_KEY}/json/citydata_ppltn/1/5/${region}`,
      {
        next: { revalidate: 3000 },
      },
    ).then<ResponseCityData>((res) => res.json());
  });

  const results = await Promise.allSettled(promises);

  const successfulResults = results
    .filter(
      (result): result is PromiseFulfilledResult<ResponseCityData> =>
        result.status === 'fulfilled',
    )
    .flatMap((item) => {
      const data = item.value['SeoulRtd.citydata_ppltn'];
      return data && data.length > 0 ? data[0] : [];
    });

  return successfulResults;
};
