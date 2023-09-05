const fetchCityImage = async (
  region: string,
): Promise<ResponseImageGoogle | null> => {
  try {
    const refinedRegion = region.replace(' 관광특구', '');

    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${refinedRegion}&radius=300&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&language=ko`,
      { method: 'GET' },
    );
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch image for region: ${region}`, error);
    return null;
  }
};

/** 도시 데이터 가져오기 검색어로 */
const fetchCityData = async (
  region: string,
): Promise<ResponseCityData | null> => {
  try {
    const res = await fetch(
      `http://openapi.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUL_KEY}/json/citydata_ppltn/1/5/${region}`,
      { next: { revalidate: 3000 } },
    );
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch data for region: ${region}`, error);
    return null;
  }
};

export const PlaceData: {
  [key: string]: { adress: string; simpleName: string };
} = {
  '강남 MICE 관광특구': { adress: '강남구 테헤란로', simpleName: '강남' },
  '동대문 관광특구': { adress: '종로구 종로 266', simpleName: '동대문' },
  '명동 관광특구': { adress: '중구 명동길', simpleName: '명동' },
  '잠실 관광특구': { adress: '송파구 올림픽로', simpleName: '잠실' },
  '종로·청계 관광특구': { adress: '종로구 종로', simpleName: '청계천' },
  '홍대 관광특구': { adress: '마포구 어울마당로', simpleName: '홍대' },
  압구정로데오거리: { adress: '강남구 압구정로', simpleName: '압구정 로데오' },
  여의도: { adress: '영등포구 여의대로', simpleName: '여의도' },
  연남동: { adress: '마포구 연남로', simpleName: '연남동' },
  '영등포 타임스퀘어': {
    adress: '영등포구 영중로 15',
    simpleName: '영등포 타임스퀘어',
  },
  서울역: { adress: '용산구 청파로 426', simpleName: '서울역' },
  여의도한강공원: {
    adress: '영등포구 여의동로 330',
    simpleName: '여의도 한강공원',
  },
  건대입구역: { adress: '광진구 능동로 120', simpleName: '건대입구' },
  '청담동 명품거리': { adress: '강남구 도산대로 407', simpleName: '청담동' },
  가로수길: { adress: '강남구 신사동 강남대로162길', simpleName: '가로수길' },
  이태원역: { adress: '용산구 이태원로 179', simpleName: '이태원' },
};

const DATA_AREA = [
  '강남 MICE 관광특구',
  '동대문 관광특구',
  '명동 관광특구',
  '잠실 관광특구',
  '종로·청계 관광특구',
  '홍대 관광특구',
  '압구정로데오거리',
  '여의도',
  '연남동',
  '영등포 타임스퀘어',
  '서울역',
  '여의도한강공원',
  '건대입구역',
  '청담동 명품거리',
  '가로수길',
  '이태원역',
];
/** 도시데이터 && 도시 이미지 함치는 함수 */
export const getHomeDatas = async () => {
  const cityDataPromises = DATA_AREA.map((region) => fetchCityData(region));

  const cityDataResults = await Promise.allSettled(cityDataPromises);

  function isFulfilled<T>(
    result: PromiseSettledResult<T>,
  ): result is PromiseFulfilledResult<T> {
    return result.status === 'fulfilled';
  }

  return DATA_AREA.map((region, index) => {
    const cityDataResult = cityDataResults[index];
    const cityData = isFulfilled(cityDataResult) ? cityDataResult.value : null;

    return {
      ...cityData?.['SeoulRtd.citydata_ppltn']?.[0],
    };
  });
};
