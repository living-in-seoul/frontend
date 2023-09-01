const fetchCityImage = async (
  region: string,
): Promise<ResponseImageGoogle | null> => {
  try {
    const refinedRegion = region.replace('', '');

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

const DATA_AREA = [
  '경복궁',
  '광화문·덕수궁',
  '창덕궁·종묘',
  '홍대입구역 9번 출구',
  '가락시장',
  '가로수길',
  '광장(전통)시장',
  '김포공항',
  '노량진',
  '방배역 먹자골목',
  '북촌한옥마을',
  '성수카페거리',
  '압구정로데오거리',
  '여의도',
  '연남동',
  '영등포 타임스퀘어',
  '외대앞',
  '용리단길',
  '인사동·익선동',
  '청담동 명품거리',
  '해방촌·경리단길',
  'DDP(동대문디자인플라자)',
  'DMC(디지털미디어시티)',
  '강서한강공원',
  '고척돔',
  '광나루한강공원',
  '광화문광장',
  '국립중앙박물관·용산가족공원',
  '난지한강공원',
  '남산공원',
  '노들섬',
  '뚝섬한강공원',
  '망원한강공원',
  '반포한강공원',
  '서리풀공원·몽마르뜨공원',
  '서울대공원',
  '서울숲공원',
  '시청광장',
  '양화한강공원',
  '어린이대공원',
  '여의도한강공원',
  '월드컵공원',
  '이촌한강공원',
  '잠실종합운동장',
  '잠실한강공원',
  '잠원한강공원',
];
/** 도시데이터 && 도시 이미지 함치는 함수 */
export const getHomeDatas = async () => {
  const imageDataPromises = DATA_AREA.map((region) => fetchCityImage(region));
  const cityDataPromises = DATA_AREA.map((region) => fetchCityData(region));

  const imageResults = await Promise.allSettled(imageDataPromises);
  const cityDataResults = await Promise.allSettled(cityDataPromises);

  function isFulfilled<T>(
    result: PromiseSettledResult<T>,
  ): result is PromiseFulfilledResult<T> {
    return result.status === 'fulfilled';
  }

  return DATA_AREA.map((region, index) => {
    const cityDataResult = cityDataResults[index];
    const cityData = isFulfilled(cityDataResult) ? cityDataResult.value : null;

    const imageResult = imageResults[index];
    const imageInfo = isFulfilled(imageResult) ? imageResult.value : null;
    const ImageInformation = imageInfo?.results[0] ?? null;
    if (!cityData) {
    }
    return {
      ...cityData?.['SeoulRtd.citydata_ppltn']?.[0],
      image: ImageInformation?.photos
        ? ImageInformation?.photos[0].photo_reference
        : null,
      place_id: ImageInformation?.place_id,
      name: ImageInformation?.name,
    };
  });
};

/** 이미지 가져오기 */
export const getImageSrc = (code: string) => {
  const ImageSrc = `${process.env.NEXT_PUBLIC_GOOGLE_PHOTO_URL}?maxwidth=400&maxheigth=800&photo_reference=${code}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
  return ImageSrc;
};
