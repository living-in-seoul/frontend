/** 자동완성 검색어들 가져오기 */
// 캐싱 필요
export const getPlacesAutoComplete = async (text: string) => {
  const SEOUL_LAT = 37.5665;
  const SEOUL_LNG = 126.978;
  const RADIUS = 17000;

  return fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_PLACES_AUTOCOMPLELTE_URL}input=${text}&radius=${RADIUS}&location=${SEOUL_LAT},${SEOUL_LNG}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  ).then((res) => res.json());
};

/** placeId로 장소 세부 정보 가져오기 */
export const getPlaceByPlaceId = async (placeId: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_PLACES_DETAILS_URL}&language=ko&place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  ).then((res) => res.json());
};
